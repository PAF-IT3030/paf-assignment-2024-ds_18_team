package com.paf.socailfitnessapplication.repo;

import com.paf.socailfitnessapplication.entity.PostShare;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostShareRepository extends MongoRepository<PostShare, String> {
}
