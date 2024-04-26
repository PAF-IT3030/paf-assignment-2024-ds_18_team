package com.paf.socailfitnessapplication.service.impl;

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
        return mealPlanRepository.save(mealPlan);
    }

    @Override
    public MealPlan updatMealPlan(String mealPlanId, MealPlan mealPlan) {
        if (mealPlanRepository.existsById(mealPlanId)) {
            mealPlan.setMealPlanId(mealPlanId);
            return mealPlanRepository.save(mealPlan);
        } else {
            return null;
        }
    }

    @Override
    public void deleteMealPlan(String mealPlanId) {
        mealPlanRepository.deleteById(mealPlanId);
    }

}
