package com.monsha.deca.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.monsha.deca.dto.CompetitionDTO;
import com.monsha.deca.entity.Competition;
import com.monsha.deca.repository.CompetitionRepository;

@Service
public class CompetitionService {
    private final CompetitionRepository competitionRepository;

    public CompetitionService(CompetitionRepository competitionRepository) {
        this.competitionRepository = competitionRepository;
    }

    public List<CompetitionDTO> getAllCompetitions() {
        return competitionRepository.findAll().stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }

    private CompetitionDTO mapToDTO(Competition competition) {
        return new CompetitionDTO(
            competition.getId(),
            competition.getTitle(),
            competition.getDescription(),
            competition.getImageUrl(),
            competition.getStartDate(),
            competition.getEndDate(),
            competition.getDifficultyLevel(),
            competition.getIsActive()
        );
    }
}
