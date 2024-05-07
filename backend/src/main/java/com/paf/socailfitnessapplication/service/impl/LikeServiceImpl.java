package com.paf.socailfitnessapplication.service.impl;

import com.paf.socailfitnessapplication.entity.Like;
import com.paf.socailfitnessapplication.repo.LikeRepository;
import com.paf.socailfitnessapplication.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    private final LikeRepository likeRepository;

    @Override
    public Like createLike(Like like) {
        return likeRepository.save(like);
    }

    @Override
    public Optional<Like> getLikeById(String id) {
        return likeRepository.findById(id);
    }

    @Override
    public List<Like> getAllLikesByUserId(String userId) {
        return likeRepository.findByUserId(userId);
    }

    @Override
    public List<Like> getAllLikesByPostId(String postId) {
        return likeRepository.findByPostId(postId);
    }

    @Override
    public boolean deleteLike(String id) {
        if (likeRepository.existsById(id)) {
            likeRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
