package com.monsha.deca.dto;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.EqualsAndHashCode;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class CourseDetailDTO extends CourseDTO {

    private List<ChapterDTO> chapters;

    private Map<UUID, List<TaskSummaryDTO>> tasksByChapter;

    public CourseDetailDTO(UUID id, String title, String description, Short difficultyLevel, UUID categoryId,
                           List<ChapterDTO> chapters,
                           Map<UUID, List<TaskSummaryDTO>> tasksByChapter) {
        super(id, title, description, difficultyLevel, categoryId);
        this.chapters = chapters;
        this.tasksByChapter = tasksByChapter;
    }
    
}
