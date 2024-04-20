package com.paf.socailfitnessapplication.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
public class WorkoutStatusUpdateResponseDTO {
    private String id;
    private String userId;
    private String description;
    private Map<String, Double> metrics;
    private LocalDateTime timestamp;
}
