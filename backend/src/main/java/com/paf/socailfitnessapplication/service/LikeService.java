package com.paf.socailfitnessapplication.service;

import com.paf.socailfitnessapplication.entity.Like;
import java.util.List;
import java.util.Optional;

public interface LikeService {
    Like createLike(Like like);
    Optional<Like> getLikeById(String id);
    List<Like> getAllLikesByUserId(String userId);
    List<Like> getAllLikesByPostId(String postId);
    boolean deleteLike(String id);
}
