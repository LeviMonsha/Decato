package com.monsha.deca.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.monsha.deca.dto.CompletedCourseDTO;
import com.monsha.deca.dto.ProgressDTO;
import com.monsha.deca.entity.TraineeProgress;
import com.monsha.deca.repository.ProgressRepository;

import jakarta.transaction.Transactional;

@Service
public class ProgressService {

    private final ProgressRepository progressRepository;

    public ProgressService(ProgressRepository progressRepository) {
        this.progressRepository = progressRepository;
    }

    @Transactional
    public void updateProgress(UUID userId, UUID taskId, String status, UUID selectedOptionId) {
        Optional<TraineeProgress> optionalProgress = progressRepository.findByTraineeIdAndTaskId(userId, taskId);

        TraineeProgress progress;
        if (optionalProgress.isPresent()) {
            progress = optionalProgress.get();
        } else {
            progress = new TraineeProgress();
            progress.setTraineeId(userId);
            progress.setTaskId(taskId);
        }

        progress.setStatus(status);
        progress.setSelectedOptionId(selectedOptionId);
        if ("completed".equals(status)) {
            progress.setCompletedAt(LocalDateTime.now());
        } else {
            progress.setCompletedAt(null);
        }

        progressRepository.save(progress);
    }


    public List<ProgressDTO> getProgressByUserAndCourse(UUID userId, UUID courseId) {
    return progressRepository.findByTraineeIdAndCourseId(userId, courseId)
        .stream()
        .map(ProgressDTO::new)
        .collect(Collectors.toList());
    }

    public ProgressDTO getProgressByUserAndTask(UUID userId, UUID taskId) {
        return progressRepository.findByTraineeIdAndTaskId(userId, taskId)
            .map(ProgressDTO::new)
            .orElse(new ProgressDTO());
    }

    public List<CompletedCourseDTO> getCompletedCoursesByUser(UUID userId) {
        return progressRepository.findCompletedCoursesByUser(userId);
    }

}
