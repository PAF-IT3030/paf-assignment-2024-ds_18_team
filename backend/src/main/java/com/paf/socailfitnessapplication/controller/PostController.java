package com.paf.socailfitnessapplication.controller;

import com.paf.socailfitnessapplication.entity.Post;
import com.paf.socailfitnessapplication.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        Post createdPost = postService.createPost(post);
        return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable String id) {
        Optional<Post> post = postService.getPostById(id);
        return post.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Post>> getAllPostsByUserId(@PathVariable String userId) {
        List<Post> posts = postService.getAllPostsByUserId(userId);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Post>> searchPostsByKeyword(@RequestParam String keyword) {
        List<Post> posts = postService.searchPostsByKeyword(keyword);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/likedby/{userId}")
    public ResponseEntity<List<Post>> getPostsLikedByUser(@PathVariable String userId) {
        List<Post> posts = postService.getPostsLikedByUser(userId);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/commentedby/{userId}")
    public ResponseEntity<List<Post>> getPostsCommentedByUser(@PathVariable String userId) {
        List<Post> posts = postService.getPostsCommentedByUser(userId);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable String id, @RequestBody Post post) {
        Optional<Post> updatedPost = postService.updatePost(id, post);
        return updatedPost.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable String id) {
        boolean deleted = postService.deletePost(id);
        return deleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
