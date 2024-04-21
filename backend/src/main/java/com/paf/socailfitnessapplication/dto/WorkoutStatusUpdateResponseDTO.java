package com.paf.socailfitnessapplication.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
public class WorkoutStatusUpdateResponseDTO {
    private String id;
    private String userId;
    private String description;

    // Metrics associated with the workout status update (e.g., distance, time)
    private Map<String, Double> metrics;

    // Timestamp indicating when the workout status update was created or last updated
    private LocalDateTime timestamp;
}
