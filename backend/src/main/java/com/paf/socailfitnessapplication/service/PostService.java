package com.paf.socailfitnessapplication.service;

import com.paf.socailfitnessapplication.entity.Post;
import java.util.List;
import java.util.Optional;

public interface PostService {
    Post createPost(Post post);
    Optional<Post> getPostById(String id);
    List<Post> getAllPosts();
    List<Post> getAllPostsByUserId(String userId);
    List<Post> searchPostsByKeyword(String keyword);
    List<Post> getPostsLikedByUser(String userId);
    List<Post> getPostsCommentedByUser(String userId);
    Optional<Post> updatePost(String id, Post post);
    boolean deletePost(String id);
}
