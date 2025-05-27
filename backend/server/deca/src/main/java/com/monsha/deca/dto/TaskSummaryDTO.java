package com.monsha.deca.dto;

import java.util.UUID;

import com.monsha.deca.entity.enums.TaskType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskSummaryDTO {

    private UUID id;

    private CourseDTO course;

    private String type;

    private String content;

    private Short sortOrder;

    private UUID chapterId;
    
}
