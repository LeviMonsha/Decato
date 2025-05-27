package com.monsha.deca.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskSummaryDTO {

    private UUID id;

    private String type;

    private Short sortOrder;
    
}
