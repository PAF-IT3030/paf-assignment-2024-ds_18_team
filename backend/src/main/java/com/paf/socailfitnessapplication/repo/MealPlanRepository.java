package com.paf.socailfitnessapplication.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.paf.socailfitnessapplication.entity.MealPlan;

@Repository
public interface MealPlanRepository extends MongoRepository<MealPlan, String> {

}