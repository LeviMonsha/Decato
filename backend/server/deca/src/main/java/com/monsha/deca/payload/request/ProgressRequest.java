package com.monsha.deca.payload.request;

import java.util.UUID;

public record ProgressRequest(

    UUID taskId,

    String status,

    UUID selectedOptionId
    
) {}
