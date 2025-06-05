package com.monsha.deca.repository;

import com.monsha.deca.dto.CompletedCourseDTO;
import com.monsha.deca.entity.TraineeProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProgressRepository extends JpaRepository<TraineeProgress, UUID> {

    Optional<TraineeProgress> findByTraineeIdAndTaskId(UUID traineeId, UUID taskId);

    @Query("""
        SELECT p FROM TraineeProgress p
        JOIN Task t ON p.taskId = t.id
        JOIN Chapter c ON t.chapter = c
        WHERE p.traineeId = :traineeId AND c.course.id = :courseId
    """)
    List<TraineeProgress> findByTraineeIdAndCourseId(
        @Param("traineeId") UUID traineeId,
        @Param("courseId") UUID courseId
    );

    @Query("""
        SELECT new com.monsha.deca.dto.CompletedCourseDTO(
            c.id,
            c.title,
            MAX(p.completedAt)
        )
        FROM TraineeProgress p
        JOIN Task t ON p.taskId = t.id
        JOIN Chapter ch ON t.chapter = ch
        JOIN Course c ON ch.course = c
        WHERE p.traineeId = :userId
        GROUP BY c.id, c.title
        HAVING COUNT(p) = (
            SELECT COUNT(t2)
            FROM Task t2
            JOIN Chapter ch2 ON t2.chapter = ch2
            WHERE ch2.course = c
        )
        AND COUNT(CASE WHEN p.status = 'completed' THEN 1 END) = COUNT(p)
    """)
    List<CompletedCourseDTO> findCompletedCoursesByUser(@Param("userId") UUID userId);

}
