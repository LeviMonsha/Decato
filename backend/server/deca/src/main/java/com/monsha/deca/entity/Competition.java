package com.monsha.deca.entity;

import java.time.OffsetDateTime;
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
@Table(name = "competition", schema = "decatopg")
public class Competition {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url", nullable = false, columnDefinition = "TEXT")
    private String imageUrl;

    @Column(name = "start_date", nullable = false, columnDefinition = "TIMESTAMPTZ")
    private OffsetDateTime startDate;

    @Column(name = "end_date", nullable = false, columnDefinition = "TIMESTAMPTZ")
    private OffsetDateTime endDate;

    @Column(name = "difficulty_level", nullable = false)
    private Short difficultyLevel;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

}
