package com.monsha.deca.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.monsha.deca.dto.CompletedCourseDTO;
import com.monsha.deca.dto.ProgressDTO;
import com.monsha.deca.entity.User;
import com.monsha.deca.payload.request.ProgressRequest;
import com.monsha.deca.service.ProgressService;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @PutMapping("/task/{taskId}")
    public ResponseEntity<?> updateProgress(
        @AuthenticationPrincipal User user,
        @RequestBody ProgressRequest request
    ) {
        progressService.updateProgress(
            user.getId(),
            request.taskId(),
            request.status(),
            request.selectedOptionId()
        );
        return ResponseEntity.ok().build();
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<ProgressDTO>> getProgressByCourse(
        @AuthenticationPrincipal User user,
        @PathVariable UUID courseId
    ) {
        List<ProgressDTO> progressList = progressService.getProgressByUserAndCourse(user.getId(), courseId);
        return ResponseEntity.ok(progressList);
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<ProgressDTO> getProgressByTask(
        @AuthenticationPrincipal User user,
        @PathVariable UUID taskId
    ) {
        ProgressDTO progress = progressService.getProgressByUserAndTask(user.getId(), taskId);
        if (progress == null) {
            progress = new ProgressDTO();
            progress.setStatus("not_started");
            progress.setSelectedOptionId(null);
            progress.setTaskId(taskId);
            progress.setCompletedAt(null);
        }
        return ResponseEntity.ok(progress);
    }

    @GetMapping("/completed-courses")
    public ResponseEntity<List<CompletedCourseDTO>> getCompletedCourses(@AuthenticationPrincipal User user) {
        List<CompletedCourseDTO> completedCourses = progressService.getCompletedCoursesByUser(user.getId());
        return ResponseEntity.ok(completedCourses);
    }

}