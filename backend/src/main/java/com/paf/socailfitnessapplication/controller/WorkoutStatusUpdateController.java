package com.paf.socailfitnessapplication.controller;

import com.paf.socailfitnessapplication.dto.WorkoutStatusUpdateDTO;
import com.paf.socailfitnessapplication.dto.WorkoutStatusUpdateResponseDTO;
import com.paf.socailfitnessapplication.service.WorkoutStatusUpdateService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/workout-status-updates")
@RequiredArgsConstructor
public class WorkoutStatusUpdateController {

    private final WorkoutStatusUpdateService workoutStatusUpdateService;
    private final ModelMapper modelMapper;

    // Endpoint to create a new workout status update
    @PostMapping
    public WorkoutStatusUpdateResponseDTO createWorkoutStatusUpdate(@RequestBody WorkoutStatusUpdateDTO workoutStatusUpdateDTO) {
        // Delegate the creation of the workout status update to the service and map the result to a response DTO
        return modelMapper.map(workoutStatusUpdateService.createWorkoutStatusUpdate(workoutStatusUpdateDTO), WorkoutStatusUpdateResponseDTO.class);
    }

    // Endpoint to retrieve all workout status updates for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<WorkoutStatusUpdateResponseDTO>> getWorkoutStatusUpdatesForUser(@PathVariable String userId) {
        // Retrieve workout status updates for the specified user from the service
        List<WorkoutStatusUpdateResponseDTO> workoutStatusUpdates = workoutStatusUpdateService.getWorkoutStatusUpdatesForUser(userId);
        // Return the retrieved workout status updates as a response with status code 200 (OK)
        return ResponseEntity.ok(workoutStatusUpdates);
    }

    // Endpoint to retrieve a single workout status update by its ID
    @GetMapping("/{id}")
    public ResponseEntity<WorkoutStatusUpdateResponseDTO> getWorkoutStatusUpdate(@PathVariable String id) {
        // Retrieve the workout status update by its ID from the service
        Optional<WorkoutStatusUpdateResponseDTO> workoutStatusUpdate = workoutStatusUpdateService.getWorkoutStatusUpdate(id);
        // If the workout status update exists, return it as a response with status code 200 (OK), otherwise return 404 (Not Found)
        return workoutStatusUpdate.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint to update an existing workout status update
    @PutMapping("/{id}")
    public ResponseEntity<WorkoutStatusUpdateResponseDTO> updateWorkoutStatusUpdate(@PathVariable String id, @RequestBody WorkoutStatusUpdateDTO workoutStatusUpdateDTO) {
        // Update the workout status update with the specified ID using the provided data from the request body
        Optional<WorkoutStatusUpdateResponseDTO> updatedWorkoutStatusUpdate = workoutStatusUpdateService.updateWorkoutStatusUpdate(id, workoutStatusUpdateDTO);
        // If the workout status update was updated successfully, return it as a response with status code 200 (OK), otherwise return 404 (Not Found)
        return updatedWorkoutStatusUpdate.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }



    // Endpoint to delete an existing workout status update by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkoutStatusUpdate(@PathVariable String id) {
        // Delete the workout status update with the specified ID
        boolean deleted = workoutStatusUpdateService.deleteWorkoutStatusUpdate(id);
        // If the workout status update was deleted successfully, return a response with status code 204 (No Content), otherwise return 404 (Not Found)
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
