package com.paf.socailfitnessapplication.service;

import com.paf.socailfitnessapplication.entity.Post;
import java.util.List;
import java.util.Optional;

public interface PostService {
    Post createPost(Post post);
    Optional<Post> getPostById(String id);
    List<Post> getAllPostsByUserId(String userId);
    Optional<Post> updatePost(String id, Post post);
    boolean deletePost(String id);
}
