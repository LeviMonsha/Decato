package com.monsha.deca.service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.monsha.deca.dto.ChapterDTO;
import com.monsha.deca.dto.CourseDTO;
import com.monsha.deca.dto.CourseDetailDTO;
import com.monsha.deca.dto.TaskSummaryDTO;
import com.monsha.deca.entity.Chapter;
import com.monsha.deca.entity.Course;
import com.monsha.deca.repository.ChapterRepository;
import com.monsha.deca.repository.CourseRepository;
import com.monsha.deca.repository.TaskRepository;

@Service
public class CourseService {

    @Autowired
    private final CourseRepository courseRepository;

    @Autowired
    private ChapterRepository chapterRepository;

    @Autowired
    private TaskRepository taskRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<CourseDTO> getAllCourses() {
        return courseRepository.findAll().stream()
            .map(this::mapToCourseDTO)
            .collect(Collectors.toList());
    }

    public CourseDetailDTO getCourseDetail(UUID courseId) {
        Course course = courseRepository.findById(courseId)
            .orElse(null);

        if (course == null) {
            System.out.println("COURSE NULL!!!!!!!!!!!!!!!!!!!!!!");
            return null;
        }
        System.out.println("COURSE FOUND!!!!!!!!!!!!!!!!!!!!!!");

        List<ChapterDTO> chapters = Collections.emptyList();
        Map<UUID, List<TaskSummaryDTO>> tasksByChapter = Collections.emptyMap();

        return new CourseDetailDTO(
            course.getId(),
            course.getTitle(),
            course.getDescription(),
            course.getDifficultyLevel(),
            course.getCategory().getId(),
            chapters,
            tasksByChapter
        );
    }

    private CourseDTO mapToCourseDTO(Course course) {
        return new CourseDTO(
            course.getId(),
            course.getTitle(),
            course.getDescription(),
            course.getDifficultyLevel(),
            course.getCategory() != null ? course.getCategory().getId() : null
        );
    }

    private ChapterDTO mapToChapterDTO(Chapter chapter) {
        return new ChapterDTO(
            chapter.getId(),
            chapter.getTitle(),
            chapter.getDescription(),
            chapter.getSortOrder()
        );
    }
}
