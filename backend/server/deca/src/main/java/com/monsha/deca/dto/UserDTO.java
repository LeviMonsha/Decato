package com.monsha.deca.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDTO {

    @NotBlank
    private String firstname;

    @NotBlank
    private String lastname;

    @NotBlank
    private String username;

    @NotBlank
    private String email;

    @NotNull
    private Boolean isAdult;

    @NotBlank
    private String gender;

    @NotBlank
    private String password;

    private LocalDate created;

}
