package com.paf.socailfitnessapplication.repo;

import com.paf.socailfitnessapplication.entity.WorkoutStatusUpdate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkoutStatusUpdateRepository extends MongoRepository<WorkoutStatusUpdate, String> {
    List<WorkoutStatusUpdate> findByUserId(String userId);
}
