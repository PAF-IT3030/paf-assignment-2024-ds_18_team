package com.paf.socailfitnessapplication.service;

import com.paf.socailfitnessapplication.dto.WorkoutStatusUpdateDTO;
import com.paf.socailfitnessapplication.dto.WorkoutStatusUpdateResponseDTO;
import com.paf.socailfitnessapplication.entity.WorkoutStatusUpdate;

import java.util.List;
import java.util.Optional;

// WorkoutStatusUpdateService.java
public interface WorkoutStatusUpdateService {

    // Method to create a new workout status update
    WorkoutStatusUpdate createWorkoutStatusUpdate(WorkoutStatusUpdateDTO workoutStatusUpdateDTO);

    // Method to retrieve a workout status update by its ID
    Optional<WorkoutStatusUpdateResponseDTO> getWorkoutStatusUpdate(String id);

    // Method to retrieve all workout status updates for a specific user
    List<WorkoutStatusUpdateResponseDTO> getWorkoutStatusUpdatesForUser(String userId);

    // Method to update an existing workout status update
    Optional<WorkoutStatusUpdateResponseDTO> updateWorkoutStatusUpdate(String id, WorkoutStatusUpdateDTO workoutStatusUpdateDTO);

    // Method to delete an existing workout status update by its ID
    boolean deleteWorkoutStatusUpdate(String id);
}
