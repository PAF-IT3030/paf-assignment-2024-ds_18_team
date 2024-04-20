package com.paf.socailfitnessapplication.dto;

import lombok.Data;

import java.util.Map;

@Data
public class WorkoutStatusUpdateDTO {
    private String userId;
    private String description;
    private Map<String, Double> metrics;
}

