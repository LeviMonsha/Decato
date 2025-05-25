package com.monsha.deca.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CourseDTO {

    @NotNull
    private UUID id;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotNull
    private Short difficultyLevel;
}
