package com.paf.socailfitnessapplication.service;

import com.paf.socailfitnessapplication.entity.WorkoutStatusUpdate;

import java.util.Optional;

public interface WorkoutStatusUpdateService {
    WorkoutStatusUpdate createWorkoutStatusUpdate(WorkoutStatusUpdate workoutStatusUpdate);
    Optional<WorkoutStatusUpdate> getWorkoutStatusUpdate(String id);
    Optional<WorkoutStatusUpdate> updateWorkoutStatusUpdate(String id, WorkoutStatusUpdate workoutStatusUpdate);
    boolean deleteWorkoutStatusUpdate(String id);
}
