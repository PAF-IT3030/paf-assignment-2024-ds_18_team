package com.paf.socailfitnessapplication.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paf.socailfitnessapplication.entity.MealPlan;
import com.paf.socailfitnessapplication.repo.MealPlanRepository;
import com.paf.socailfitnessapplication.service.MealPlanService;

@Service
public class MealPlanServiceImpl implements MealPlanService {

    @Autowired
    private MealPlanRepository mealPlanRepository;

    @Override
    public List<MealPlan> getAllMealPlans() {
        return mealPlanRepository.findAll();
    }

    @Override
    public Optional<MealPlan> getMealPlanById(String mealPlanId) {
        return mealPlanRepository.findById(mealPlanId);
    }

    @Override
    public MealPlan createMealPlan(MealPlan mealPlan) {
        mealPlan.setDateTime(new Date());
        return mealPlanRepository.save(mealPlan);
    }

    @Override
    public MealPlan updatMealPlan(String mealPlanId, MealPlan mealPlan) {
        MealPlan m = mealPlanRepository.findById(mealPlanId)
                .orElseThrow(() -> new RuntimeException("Meal Plan not found"));

           try {
               m.setMealPlanId(mealPlanId);
               m.setDescription(mealPlan.getDescription());
               m.setDuration(mealPlan.getDuration());
               m.setIntensity(mealPlan.getIntensity());
               m.setMeal(mealPlan.getMeal());
               m.setNotes(mealPlan.getNotes());
               m.setPortionSize(mealPlan.getPortionSize());
               m.setRoutine(mealPlan.getRoutine());
               return mealPlanRepository.save(m);
           }catch (Exception e){
               return null;
           }

    }

    @Override
    public void deleteMealPlan(String mealPlanId) {
        mealPlanRepository.deleteById(mealPlanId);
    }

}
