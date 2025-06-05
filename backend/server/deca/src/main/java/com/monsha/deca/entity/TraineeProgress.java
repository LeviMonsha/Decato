package com.monsha.deca.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "trainee_progress", schema = "decatopg")
public class TraineeProgress {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column(name = "trainee_id", nullable = false)
    private UUID traineeId;

    @Column(name = "task_id", nullable = false)
    private UUID taskId;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "selected_option_id")
    private UUID selectedOptionId;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;
}

