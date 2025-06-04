package com.monsha.deca.service;

import java.util.Collections;
import java.util.Comparator;
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
import com.monsha.deca.entity.Task;
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

    public CourseService(CourseRepository courseRepository, ChapterRepository chapterRepository, TaskRepository taskRepository) {
        this.courseRepository = courseRepository;
        this.chapterRepository = chapterRepository;
        this.taskRepository = taskRepository;
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
            return null;
        }

        List<Chapter> chapters = chapterRepository.findByCourseIdOrderBySortOrder(courseId);
        List<UUID> chapterIds = chapters.stream().map(Chapter::getId).collect(Collectors.toList());
        List<Task> tasks = taskRepository.findByChapterIdInOrderBySortOrder(chapterIds);

        Map<Chapter, List<Task>> tasksByChapter = tasks.stream()
            .collect(Collectors.groupingBy(Task::getChapter));

        List<ChapterDTO> chapterDTOs = chapters.stream().map(ch -> {
            ChapterDTO chapterDTO = new ChapterDTO();
            chapterDTO.setId(ch.getId());
            chapterDTO.setTitle(ch.getTitle());
            chapterDTO.setSortOrder(ch.getSortOrder());
            chapterDTO.setDescription(ch.getDescription());

            List<TaskSummaryDTO> taskDTOs = tasksByChapter.getOrDefault(ch.getId(), Collections.emptyList()).stream()
                .map(t -> {
                    TaskSummaryDTO taskDTO = new TaskSummaryDTO();
                    taskDTO.setId(t.getId());
                    taskDTO.setType(t.getType().name());
                    taskDTO.setSortOrder(t.getSortOrder());
                    taskDTO.setContent(t.getContent().toString());
                    return taskDTO;
                }).sorted(Comparator.comparingInt(TaskSummaryDTO::getSortOrder))
                .collect(Collectors.toList());

            chapterDTO.setTasks(taskDTOs);
            return chapterDTO;
        }).sorted(Comparator.comparingInt(ChapterDTO::getSortOrder))
        .collect(Collectors.toList());

        CourseDetailDTO dto = new CourseDetailDTO();
        dto.setId(course.getId());
        dto.setTitle(course.getTitle());
        dto.setDescription(course.getDescription());
        dto.setDifficultyLevel(course.getDifficultyLevel());
        dto.setImgUrl(course.getImgUrl());
        dto.setChapters(chapterDTOs);

        return dto;
    }

    public List<TaskSummaryDTO> getTasksByCourseId(UUID courseId) {
        List<Chapter> chapters = chapterRepository.findByCourseIdOrderBySortOrder(courseId);
        List<UUID> chapterIds = chapters.stream().map(Chapter::getId).collect(Collectors.toList());
        List<Task> tasks = taskRepository.findByChapterIdInOrderBySortOrder(chapterIds);

        Map<UUID, Short> chapterSortOrderMap = chapters.stream()
            .collect(Collectors.toMap(Chapter::getId, Chapter::getSortOrder));

        return tasks.stream()
            .map(task -> {
                TaskSummaryDTO dto = new TaskSummaryDTO();
                dto.setId(task.getId());
                dto.setType(task.getType().name());
                dto.setSortOrder(task.getSortOrder());
                dto.setContent(task.getContent().toString());
                dto.setChapterId(task.getChapter().getId());
                return dto;
            })
            .sorted(Comparator
                .comparing((TaskSummaryDTO t) -> chapterSortOrderMap.get(t.getChapterId()))
                .thenComparing(TaskSummaryDTO::getSortOrder))
            .collect(Collectors.toList());
    }

    private CourseDTO mapToCourseDTO(Course course) {
        return new CourseDTO(
            course.getId(),
            course.getTitle(),
            course.getDescription(),
            course.getDifficultyLevel(),
            course.getCategory() != null ? course.getCategory().getId() : null,
            course.getImgUrl()
        );
    }

}
