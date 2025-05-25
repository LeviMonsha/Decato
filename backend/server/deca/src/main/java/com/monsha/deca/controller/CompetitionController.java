package com.monsha.deca.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.monsha.deca.dto.CompetitionDTO;
import com.monsha.deca.entity.Competition;
import com.monsha.deca.service.CompetitionService;

@RestController
@RequestMapping("/api/competitions")
public class CompetitionController {
    private final CompetitionService competitionService;

    public CompetitionController(CompetitionService competitionService) {
        this.competitionService = competitionService;
    }

    @GetMapping
    public List<CompetitionDTO> getCompetitions() {
        return competitionService.getAllCompetitions();
    }
}
