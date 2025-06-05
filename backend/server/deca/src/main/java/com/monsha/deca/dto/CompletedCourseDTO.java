package com.monsha.deca.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompletedCourseDTO {
    
    private UUID courseId;
    private String courseTitle;
    private LocalDateTime completedAt;

}
