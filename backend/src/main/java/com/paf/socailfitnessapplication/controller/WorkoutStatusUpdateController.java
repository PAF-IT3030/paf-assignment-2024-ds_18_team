package com.paf.socailfitnessapplication.controller;

import com.paf.socailfitnessapplication.dto.WorkoutStatusUpdateDTO;
import com.paf.socailfitnessapplication.dto.WorkoutStatusUpdateResponseDTO;
import com.paf.socailfitnessapplication.service.WorkoutStatusUpdateService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/workout-status-updates")
@RequiredArgsConstructor
public class WorkoutStatusUpdateController {

    private final WorkoutStatusUpdateService workoutStatusUpdateService;
    private final ModelMapper modelMapper;


    @PostMapping
    public WorkoutStatusUpdateResponseDTO createWorkoutStatusUpdate(@RequestBody WorkoutStatusUpdateDTO workoutStatusUpdateDTO) {
        return modelMapper.map(workoutStatusUpdateService.createWorkoutStatusUpdate(workoutStatusUpdateDTO), WorkoutStatusUpdateResponseDTO.class);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkoutStatusUpdateResponseDTO> getWorkoutStatusUpdate(@PathVariable String id) {
        Optional<WorkoutStatusUpdateResponseDTO> workoutStatusUpdate = workoutStatusUpdateService.getWorkoutStatusUpdate(id);
        return workoutStatusUpdate.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkoutStatusUpdateResponseDTO> updateWorkoutStatusUpdate(@PathVariable String id, @RequestBody WorkoutStatusUpdateDTO workoutStatusUpdateDTO) {
        Optional<WorkoutStatusUpdateResponseDTO> updatedWorkoutStatusUpdate = workoutStatusUpdateService.updateWorkoutStatusUpdate(id, workoutStatusUpdateDTO);
        return updatedWorkoutStatusUpdate.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkoutStatusUpdate(@PathVariable String id) {
        boolean deleted = workoutStatusUpdateService.deleteWorkoutStatusUpdate(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}

