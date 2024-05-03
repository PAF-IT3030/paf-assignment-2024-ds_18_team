package com.paf.socailfitnessapplication.entity;



import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "mealPlans")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MealPlan {

    @Id
    private String mealPlanId;
    private String userId;
    private String username;
    private String description;
    private String duration;
    private String intensity;
    private String meal;
    private String notes;
    private String portionSize;
    private String routine;
    private Date dateTime;

}