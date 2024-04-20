package com.paf.socailfitnessapplication.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "workoutPlans")
@Data
@NoArgsConstructor
@AllArgsConstructor


public class WorkoutPlan {

    @Id
    private String workoutPlanId;
    private String userId;
    private String workoutPlanName;
    private String exercises;
    private String sets;
    private String repetitions;
    private String routing;
    private String description;
    private LocalDateTime dateTime;
    
}
