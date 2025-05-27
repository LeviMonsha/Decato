package com.monsha.deca.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChapterDTO {

    private UUID id;

    private String title;

    private String description;

    private int sortOrder;
    
}
