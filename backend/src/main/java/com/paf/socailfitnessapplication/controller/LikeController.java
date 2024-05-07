package com.paf.socailfitnessapplication.controller;

import com.paf.socailfitnessapplication.entity.Like;
import com.paf.socailfitnessapplication.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/likes")
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;

    @PostMapping
    public ResponseEntity<Like> createLike(@RequestBody Like like) {
        Like createdLike = likeService.createLike(like);
        return new ResponseEntity<>(createdLike, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Like> getLikeById(@PathVariable String id) {
        Optional<Like> like = likeService.getLikeById(id);
        return like.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Like>> getAllLikesByUserId(@PathVariable String userId) {
        List<Like> likes = likeService.getAllLikesByUserId(userId);
        return new ResponseEntity<>(likes, HttpStatus.OK);
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Like>> getAllLikesByPostId(@PathVariable String postId) {
        List<Like> likes = likeService.getAllLikesByPostId(postId);
        return new ResponseEntity<>(likes, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLike(@PathVariable String id) {
        boolean deleted = likeService.deleteLike(id);
        return deleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
