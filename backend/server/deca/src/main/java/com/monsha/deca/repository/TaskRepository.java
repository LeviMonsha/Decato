package com.monsha.deca.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monsha.deca.entity.Task;

public interface TaskRepository extends JpaRepository<Task, UUID> {

    List<Task> findSummaryByChapterId(UUID id);

    List<Task> findByChapterIdInOrderBySortOrder(List<UUID> chapterIds);

}
