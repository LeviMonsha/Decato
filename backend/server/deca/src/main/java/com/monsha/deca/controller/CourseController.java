package com.monsha.deca.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.monsha.deca.dto.CourseDTO;
import com.monsha.deca.entity.Course;
import com.monsha.deca.service.CourseService;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public List<CourseDTO> getCourses() {
        return courseService.getAllCourses();
    }
}
