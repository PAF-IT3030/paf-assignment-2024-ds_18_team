package com.paf.socailfitnessapplication.service.impl;

import com.paf.socailfitnessapplication.entity.Post;
import com.paf.socailfitnessapplication.repo.PostRepository;
import com.paf.socailfitnessapplication.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    @Override
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    @Override
    public Optional<Post> getPostById(String id) {
        return postRepository.findById(id);
    }

    @Override
    public List<Post> getAllPostsByUserId(String userId) {
        return postRepository.findByUserId(userId);
    }

    @Override
    public Optional<Post> updatePost(String id, Post post) {
        if (postRepository.existsById(id)) {
            post.setId(id);
            return Optional.of(postRepository.save(post));
        }
        return Optional.empty();
    }

    @Override
    public boolean deletePost(String id) {
        if (postRepository.existsById(id)) {
            postRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
