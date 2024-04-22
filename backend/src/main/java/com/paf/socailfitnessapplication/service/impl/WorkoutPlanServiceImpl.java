package com.paf.socailfitnessapplication.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paf.socailfitnessapplication.entity.WorkoutPlan;
import com.paf.socailfitnessapplication.repo.WorkoutPlanRepository;
import com.paf.socailfitnessapplication.service.WorkoutPlanService;

@Service
public class WorkoutPlanServiceImpl implements WorkoutPlanService{

    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;

    @Override
    public List<WorkoutPlan> getAllWorkoutPlans() {
        return workoutPlanRepository.findAll();
    }

    @Override
    public Optional<WorkoutPlan> getWorkoutPlanById(String workoutPlanId) {
        return workoutPlanRepository.findById(workoutPlanId);
    }

    @Override
    public WorkoutPlan createWorkoutPlan(WorkoutPlan workoutPlan) {
        return workoutPlanRepository.save(workoutPlan);
    }

    @Override
    public WorkoutPlan updateWorkoutPlan(String workoutPlanId, WorkoutPlan workoutPlan) {
        if (workoutPlanRepository.existsById(workoutPlanId)) {
            workoutPlan.setWorkoutPlanId(workoutPlanId);
            return workoutPlanRepository.save(workoutPlan);
        } else {
            return null;
        }
    }

    @Override
    public void deleteWorkoutPlan(String workoutPlanId) {
        workoutPlanRepository.deleteById(workoutPlanId);
    }

    
}
