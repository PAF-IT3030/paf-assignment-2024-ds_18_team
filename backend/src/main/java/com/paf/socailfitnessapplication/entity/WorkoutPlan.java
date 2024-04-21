package com.paf.socailfitnessapplication.entity;

import java.time.LocalDateTime;
import java.util.List;

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
    private String description;
    private String intensity;
    private String routine;
    private List<Exercise> exercises;
    private String duration;
    private String notes;
    private LocalDateTime dateTime;
    
}
