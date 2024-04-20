package com.paf.socailfitnessapplication.controller;

import com.paf.socailfitnessapplication.entity.WorkoutStatusUpdate;
import com.paf.socailfitnessapplication.service.WorkoutStatusUpdateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/workout-status-updates")
@RequiredArgsConstructor
public class WorkoutStatusUpdateController {

    private final WorkoutStatusUpdateService workoutStatusUpdateService;

    @PostMapping
    public WorkoutStatusUpdate createWorkoutStatusUpdate(@RequestBody WorkoutStatusUpdate workoutStatusUpdate) {
        return workoutStatusUpdateService.createWorkoutStatusUpdate(workoutStatusUpdate);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkoutStatusUpdate> getWorkoutStatusUpdate(@PathVariable String id) {
        Optional<WorkoutStatusUpdate> workoutStatusUpdate = workoutStatusUpdateService.getWorkoutStatusUpdate(id);
        return workoutStatusUpdate.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkoutStatusUpdate> updateWorkoutStatusUpdate(@PathVariable String id, @RequestBody WorkoutStatusUpdate workoutStatusUpdate) {
        Optional<WorkoutStatusUpdate> updatedWorkoutStatusUpdate = workoutStatusUpdateService.updateWorkoutStatusUpdate(id, workoutStatusUpdate);
        return updatedWorkoutStatusUpdate.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkoutStatusUpdate(@PathVariable String id) {
        boolean deleted = workoutStatusUpdateService.deleteWorkoutStatusUpdate(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
