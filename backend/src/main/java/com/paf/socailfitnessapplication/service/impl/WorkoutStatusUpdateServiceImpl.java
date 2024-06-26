package com.paf.socailfitnessapplication.service.impl;

import com.paf.socailfitnessapplication.dto.WorkoutStatusUpdateDTO;
import com.paf.socailfitnessapplication.dto.WorkoutStatusUpdateResponseDTO;
import com.paf.socailfitnessapplication.entity.WorkoutStatusUpdate;
import com.paf.socailfitnessapplication.repo.WorkoutStatusUpdateRepository;
import com.paf.socailfitnessapplication.service.WorkoutStatusUpdateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkoutStatusUpdateServiceImpl implements WorkoutStatusUpdateService {

    private final WorkoutStatusUpdateRepository workoutStatusUpdateRepository;
    private final ModelMapper modelMapper;

    // Method to create a new workout status update
    @Override
    public WorkoutStatusUpdate createWorkoutStatusUpdate(WorkoutStatusUpdateDTO workoutStatusUpdateDTO) {
        // Generate a unique identifier (id) for the new workout status update entry
        String id = UUID.randomUUID().toString();

        // Map WorkoutStatusUpdateDTO to WorkoutStatusUpdate entity
        WorkoutStatusUpdate workoutStatusUpdate = modelMapper.map(workoutStatusUpdateDTO, WorkoutStatusUpdate.class);

        // Associate the generated id and the user ID with the workout status update
        workoutStatusUpdate.setId(id);
        workoutStatusUpdate.setUserId(workoutStatusUpdateDTO.getUserId());

        // Set the current timestamp
        workoutStatusUpdate.setTimestamp(LocalDateTime.now());

        // Save the workout status update entity to the database
        return workoutStatusUpdateRepository.save(workoutStatusUpdate);
    }

    // Method to retrieve a workout status update by its ID
    @Override
    public Optional<WorkoutStatusUpdateResponseDTO> getWorkoutStatusUpdate(String id) {
        Optional<WorkoutStatusUpdate> workoutStatusUpdate = workoutStatusUpdateRepository.findById(id);
        return workoutStatusUpdate.map(statusUpdate -> modelMapper.map(statusUpdate, WorkoutStatusUpdateResponseDTO.class));
    }

    // Method to retrieve all workout status updates for a specific user
    @Override
    public List<WorkoutStatusUpdateResponseDTO> getWorkoutStatusUpdatesForUser(String userId) {
        List<WorkoutStatusUpdate> workoutStatusUpdates = workoutStatusUpdateRepository.findByUserId(userId);
        return workoutStatusUpdates.stream()
                .map(statusUpdate -> modelMapper.map(statusUpdate, WorkoutStatusUpdateResponseDTO.class))
                .collect(Collectors.toList());
    }

    // Method to update an existing workout status update
    @Override
    public Optional<WorkoutStatusUpdateResponseDTO> updateWorkoutStatusUpdate(String id, WorkoutStatusUpdateDTO workoutStatusUpdateDTO) {
        Optional<WorkoutStatusUpdate> existingStatusUpdate = workoutStatusUpdateRepository.findById(id);
        if (existingStatusUpdate.isPresent()) {
            WorkoutStatusUpdate workoutStatusUpdate = modelMapper.map(workoutStatusUpdateDTO, WorkoutStatusUpdate.class);
            workoutStatusUpdate.setId(id);
            workoutStatusUpdate.setTimestamp(LocalDateTime.now());
            WorkoutStatusUpdate updatedStatusUpdate = workoutStatusUpdateRepository.save(workoutStatusUpdate);
            return Optional.of(modelMapper.map(updatedStatusUpdate, WorkoutStatusUpdateResponseDTO.class));
        }
        return Optional.empty();
    }

    // Method to delete an existing workout status update by its ID
    @Override
    public boolean deleteWorkoutStatusUpdate(String id) {
        if (workoutStatusUpdateRepository.existsById(id)) {
            workoutStatusUpdateRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
