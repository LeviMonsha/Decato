import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../../hooks/apiClient";

type User = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdult: boolean;
  gender: string;
  avatar?: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
};

// запрос для получения текущего пользователя
export const fetchCurrentUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/fetchCurrentUser", async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get("/user/me");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// запрос для обновления email пользователя
export const updateUserEmail = createAsyncThunk<
  string,
  string,
  { rejectValue: string; state: { auth: AuthState } }
>("auth/updateUserEmail", async (newEmail, { rejectWithValue, getState }) => {
  const state = getState();
  const token = state.auth.token;
  if (!token) {
    return rejectWithValue("Нет авторизации");
  }

  try {
    await apiClient.put(
      "/user/email",
      { newEmail },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return newEmail;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(
        error.response.data.message || "Ошибка при обновлении email"
      );
    }
    return rejectWithValue(error.message);
  }
});

// запрос для логина
export const login = createAsyncThunk<
  { user: User; token: string },
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await apiClient.post("/auth/signin", { email, password });
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    return { user, token };
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(
        error.response.data.message || "Ошибка при логине"
      );
    }
    return rejectWithValue(error.message);
  }
});

// запрос для регистрации
export const register = createAsyncThunk<
  { user: User; token: string },
  { username: string; email: string; password: string },
  { rejectValue: string }
>(
  "auth/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/signup", {
        username,
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      return { user, token };
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.message || "Ошибка при регистрации"
        );
      }
      return rejectWithValue(error.message);
    }
  }
);

// запрос для выхода из системы
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
    );
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? "Ошибка при логине";
    });

    // Register
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      register.fulfilled,
      (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
    );
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? "Ошибка при регистрации";
    });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    });

    // Update user email
    builder.addCase(updateUserEmail.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      updateUserEmail.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        if (state.user) {
          state.user.email = action.payload;
        }
      }
    );
    builder.addCase(updateUserEmail.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? "Ошибка при обновлении email";
    });

    // Fetch current user
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? "Ошибка при загрузке пользователя";
    });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
