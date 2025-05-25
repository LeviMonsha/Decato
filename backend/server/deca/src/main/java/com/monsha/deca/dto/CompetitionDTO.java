package com.monsha.deca.dto;

import java.time.OffsetDateTime;
import java.util.UUID;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompetitionDTO {

    @NotNull(message = "Id cannot be null")
    private UUID id;

    @NotBlank(message = "Title cannot be blank")
    private String title;

    @NotBlank(message = "Description cannot be blank")
    private String description;

    @NotBlank(message = "Image URL cannot be blank")
    private String imageUrl;

    @NotNull(message = "Start date cannot be null")
    private OffsetDateTime startDate;

    @NotNull(message = "End date cannot be null")
    private OffsetDateTime endDate;

    @NotNull(message = "Difficulty level cannot be null")
    @Min(value = 1, message = "Difficulty level must be at least 1")
    @Max(value = 10, message = "Difficulty level must be at most 10")
    private Short difficultyLevel;

    @NotNull(message = "Active status cannot be null")
    private Boolean isActive;
}
