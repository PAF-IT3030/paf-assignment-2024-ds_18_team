package com.paf.socailfitnessapplication.service.impl;

import com.paf.socailfitnessapplication.entity.WorkoutStatusUpdate;
import com.paf.socailfitnessapplication.repo.WorkoutStatusUpdateRepository;
import com.paf.socailfitnessapplication.service.WorkoutStatusUpdateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WorkoutStatusUpdateServiceImpl implements WorkoutStatusUpdateService {

    private final WorkoutStatusUpdateRepository workoutStatusUpdateRepository;

    @Override
    public WorkoutStatusUpdate createWorkoutStatusUpdate(WorkoutStatusUpdate workoutStatusUpdate) {
        workoutStatusUpdate.setTimestamp(LocalDateTime.now());
        return workoutStatusUpdateRepository.save(workoutStatusUpdate);
    }

    @Override
    public Optional<WorkoutStatusUpdate> getWorkoutStatusUpdate(String id) {
        return workoutStatusUpdateRepository.findById(id);
    }

    @Override
    public Optional<WorkoutStatusUpdate> updateWorkoutStatusUpdate(String id, WorkoutStatusUpdate workoutStatusUpdate) {
        if (workoutStatusUpdateRepository.existsById(id)) {
            workoutStatusUpdate.setId(id);
            workoutStatusUpdate.setTimestamp(LocalDateTime.now());
            return Optional.of(workoutStatusUpdateRepository.save(workoutStatusUpdate));
        }
        return Optional.empty();
    }

    @Override
    public boolean deleteWorkoutStatusUpdate(String id) {
        if (workoutStatusUpdateRepository.existsById(id)) {
            workoutStatusUpdateRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
