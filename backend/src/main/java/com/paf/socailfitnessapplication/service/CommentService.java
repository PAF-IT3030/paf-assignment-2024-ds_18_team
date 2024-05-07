package com.paf.socailfitnessapplication.service;

import com.paf.socailfitnessapplication.entity.Comment;
import java.util.List;
import java.util.Optional;

public interface CommentService {
    Comment createComment(Comment comment);
    Optional<Comment> getCommentById(String id);
    List<Comment> getAllCommentsByUserId(String userId);
    List<Comment> getAllCommentsByPostId(String postId);
    boolean deleteComment(String id);
}
