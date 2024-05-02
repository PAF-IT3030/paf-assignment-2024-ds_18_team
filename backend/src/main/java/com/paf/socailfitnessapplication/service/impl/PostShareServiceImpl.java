package com.paf.socailfitnessapplication.service.impl;

import com.paf.socailfitnessapplication.entity.PostShare;
import com.paf.socailfitnessapplication.repo.PostShareRepository;
import com.paf.socailfitnessapplication.service.PostShareService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostShareServiceImpl implements PostShareService {

    private final PostShareRepository postShareRepository;

    @Override
    public PostShare createPostShare(PostShare postShare) {
        return postShareRepository.save(postShare);
    }

    @Override
    public Optional<PostShare> getPostShareById(String id) {
        return postShareRepository.findById(id);
    }

    @Override
    public List<PostShare> getAllPostShares() {
        return postShareRepository.findAll();
    }

    @Override
    public void deletePostShare(String id) {
        postShareRepository.deleteById(id);
    }
}

