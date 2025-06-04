package com.monsha.deca.payload.response;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponseDTO {

    private String firstname;

    private String lastname;

    private String username;

    private String email;

    private Boolean isAdult;

    private String gender;

    private LocalDate created;
    
}