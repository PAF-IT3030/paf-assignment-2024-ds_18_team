package com.paf.socailfitnessapplication.repo;

import com.paf.socailfitnessapplication.entity.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findByUserId(String userId); // Retrieve comments by user ID
    List<Comment> findByPostId(String postId); // Retrieve comments by post ID
    // You can add more custom query methods as needed
}
