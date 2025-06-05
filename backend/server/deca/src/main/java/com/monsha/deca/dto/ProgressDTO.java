package com.monsha.deca.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.monsha.deca.entity.TraineeProgress;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProgressDTO {
    private UUID taskId;
    private String status;
    private UUID selectedOptionId;
    private LocalDateTime completedAt;

    public ProgressDTO(TraineeProgress progress) {
        this.taskId = progress.getTaskId();
        this.status = progress.getStatus();
        this.selectedOptionId = progress.getSelectedOptionId();
        this.completedAt = progress.getCompletedAt();
    }

}
