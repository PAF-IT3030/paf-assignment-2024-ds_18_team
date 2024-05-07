package com.paf.socailfitnessapplication.repo;

import com.paf.socailfitnessapplication.entity.Like;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LikeRepository extends MongoRepository<Like, String> {
    List<Like> findByUserId(String userId); // Retrieve likes by user ID
    List<Like> findByPostId(String postId); // Retrieve likes by post ID
    // You can add more custom query methods as needed
}
