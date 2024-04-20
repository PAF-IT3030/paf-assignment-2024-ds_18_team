package com.paf.socailfitnessapplication.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Map;

@Document(collection = "workout_status_updates")
@Data
public class WorkoutStatusUpdate {

    @Id
    private String id;
    private String userId;
    private String description;
    private Map<String, Double> metrics;
    private LocalDateTime timestamp;
}
