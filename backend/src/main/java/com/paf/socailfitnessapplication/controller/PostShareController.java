package com.paf.socailfitnessapplication.controller;

import com.paf.socailfitnessapplication.entity.PostShare;
import com.paf.socailfitnessapplication.service.PostShareService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/postshares")
@RequiredArgsConstructor
public class PostShareController {

    private final PostShareService postShareService;

    @PostMapping
    public ResponseEntity<PostShare> createPostShare(@RequestBody PostShare postShare) {
        PostShare createdPostShare = postShareService.createPostShare(postShare);
        return new ResponseEntity<>(createdPostShare, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostShare> getPostShareById(@PathVariable String id) {
        Optional<PostShare> postShare = postShareService.getPostShareById(id);
        return postShare.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping
    public ResponseEntity<List<PostShare>> getAllPostShares() {
        List<PostShare> postShares = postShareService.getAllPostShares();
        return new ResponseEntity<>(postShares, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePostShare(@PathVariable String id) {
        postShareService.deletePostShare(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

