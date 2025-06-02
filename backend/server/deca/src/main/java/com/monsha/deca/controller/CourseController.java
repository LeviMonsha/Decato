package com.monsha.deca.controller;

import java.nio.file.attribute.UserPrincipal;
import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.monsha.deca.dto.CourseDTO;
import com.monsha.deca.dto.CourseDetailDTO;
import com.monsha.deca.dto.TaskSummaryDTO;
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

    @GetMapping("/{courseId}")
public ResponseEntity<CourseDetailDTO> getCourseDetail(@PathVariable UUID courseId,
    @AuthenticationPrincipal org.springframework.security.core.userdetails.User currentUser) {
    CourseDetailDTO courseDetail = courseService.getCourseDetail(courseId);
    if (courseDetail == null) {
        return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(courseDetail);
}


    @GetMapping("/{courseId}/tasks")
    public ResponseEntity<List<TaskSummaryDTO>> getCourseTasks(@PathVariable UUID courseId) {
        List<TaskSummaryDTO> tasks = courseService.getTasksByCourseId(courseId);
        if (tasks == null || tasks.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(tasks);
    }

}

