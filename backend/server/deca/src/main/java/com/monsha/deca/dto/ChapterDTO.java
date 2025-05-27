package com.monsha.deca.dto;

import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChapterDTO {

    private UUID id;

    private CourseDTO course;

    private String title;

    private Short sortOrder;
    
    private String description;
    
    private List<TaskSummaryDTO> tasks;
    
}
