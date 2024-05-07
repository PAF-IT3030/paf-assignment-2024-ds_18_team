package com.paf.socailfitnessapplication.service.impl;

import com.paf.socailfitnessapplication.entity.Comment;
import com.paf.socailfitnessapplication.repo.CommentRepository;
import com.paf.socailfitnessapplication.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Override
    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public Optional<Comment> getCommentById(String id) {
        return commentRepository.findById(id);
    }

    @Override
    public List<Comment> getAllCommentsByUserId(String userId) {
        return commentRepository.findByUserId(userId);
    }

    @Override
    public List<Comment> getAllCommentsByPostId(String postId) {
        return commentRepository.findByPostId(postId);
    }

    @Override
    public boolean deleteComment(String id) {
        if (commentRepository.existsById(id)) {
            commentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
