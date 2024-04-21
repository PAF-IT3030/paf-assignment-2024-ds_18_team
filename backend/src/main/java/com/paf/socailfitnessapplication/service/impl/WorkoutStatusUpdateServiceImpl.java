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
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WorkoutStatusUpdateServiceImpl implements WorkoutStatusUpdateService {

    private final WorkoutStatusUpdateRepository workoutStatusUpdateRepository;
    private final ModelMapper modelMapper;

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


    @Override
    public Optional<WorkoutStatusUpdateResponseDTO> getWorkoutStatusUpdate(String id) {
        Optional<WorkoutStatusUpdate> workoutStatusUpdate = workoutStatusUpdateRepository.findById(id);
        return workoutStatusUpdate.map(statusUpdate -> modelMapper.map(statusUpdate, WorkoutStatusUpdateResponseDTO.class));
    }

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

    @Override
    public boolean deleteWorkoutStatusUpdate(String id) {
        if (workoutStatusUpdateRepository.existsById(id)) {
            workoutStatusUpdateRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

