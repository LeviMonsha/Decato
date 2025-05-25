package com.monsha.deca.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.monsha.deca.dto.CourseDTO;
import com.monsha.deca.entity.Course;
import com.monsha.deca.repository.CourseRepository;

@Service
public class CourseService {
    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<CourseDTO> getAllCourses() {
        return courseRepository.findAll().stream()
        .map(course -> new CourseDTO(
            course.getId(),
            course.getTitle(),
            course.getDescription(),
            course.getDifficultyLevel()))
        .collect(Collectors.toList());
    }
}
