package com.monsha.deca.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monsha.deca.entity.Chapter;

public interface ChapterRepository extends JpaRepository<Chapter, UUID> {

    List<Chapter> findByCourseIdOrderBySortOrder(UUID courseId);

    
}
