package com.paf.socailfitnessapplication.repo;

import com.paf.socailfitnessapplication.entity.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {
    List<Post> findByUserId(String userId); // Retrieve posts by user ID
    List<Post> findByCaptionContainingIgnoreCase(String keyword); // Search posts by keyword in the caption
    List<Post> findByLikesUserId(String userId); // Retrieve posts liked by a specific user
    List<Post> findByCommentsUserId(String userId); // Retrieve posts commented on by a specific user
    // You can add more custom query methods as needed
}
