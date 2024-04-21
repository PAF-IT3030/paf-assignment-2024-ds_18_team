package com.paf.socailfitnessapplication.service;

import com.paf.socailfitnessapplication.dto.WorkoutStatusUpdateDTO;
import com.paf.socailfitnessapplication.dto.WorkoutStatusUpdateResponseDTO;
import com.paf.socailfitnessapplication.entity.WorkoutStatusUpdate;

import java.util.List;
import java.util.Optional;

// WorkoutStatusUpdateService.java
public interface WorkoutStatusUpdateService {
    WorkoutStatusUpdate createWorkoutStatusUpdate(WorkoutStatusUpdateDTO workoutStatusUpdateDTO);
    Optional<WorkoutStatusUpdateResponseDTO> getWorkoutStatusUpdate(String id);

    List<WorkoutStatusUpdateResponseDTO> getWorkoutStatusUpdatesForUser(String userId);

    Optional<WorkoutStatusUpdateResponseDTO> updateWorkoutStatusUpdate(String id, WorkoutStatusUpdateDTO workoutStatusUpdateDTO);
    boolean deleteWorkoutStatusUpdate(String id);
}
