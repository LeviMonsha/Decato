package com.monsha.deca.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monsha.deca.dto.TaskSummaryDTO;
import com.monsha.deca.entity.Task;

public interface TaskRepository extends JpaRepository<Task, UUID> {

    List<TaskSummaryDTO> findSummaryByChapterId(UUID id);

}
