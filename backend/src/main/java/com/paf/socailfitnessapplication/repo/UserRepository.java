package com.paf.socailfitnessapplication.repo;

import com.paf.socailfitnessapplication.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
}
