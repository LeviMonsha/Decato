// package com.monsha.deca.security;

// import com.monsha.deca.payload.response.InvalidLoginResponse;
// import com.google.gson.Gson;
// import org.springframework.http.HttpStatus;
// import org.springframework.security.core.AuthenticationException;
// import org.springframework.security.web.AuthenticationEntryPoint;
// import org.springframework.stereotype.Component;

// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import java.io.IOException;

// @Component
// public class JWTAuthenticationEntryPoint implements AuthenticationEntryPoint {

//     private static final Gson gson = new Gson();

//     @Override
//     public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
//         InvalidLoginResponse loginResponse = new InvalidLoginResponse();

//         String jsonLoginResponse = gson.toJson(loginResponse);

//         response.setContentType(SecurityConstants.CONTENT_TYPE);
//         response.setStatus(HttpStatus.UNAUTHORIZED.value());
//         response.getWriter().println(jsonLoginResponse);
//     }
// }
