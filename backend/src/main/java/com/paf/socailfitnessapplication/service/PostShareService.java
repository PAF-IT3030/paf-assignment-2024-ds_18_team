package com.paf.socailfitnessapplication.service;

import com.paf.socailfitnessapplication.entity.PostShare;
import java.util.List;
import java.util.Optional;

public interface PostShareService {
    PostShare createPostShare(PostShare postShare);
    Optional<PostShare> getPostShareById(String id);
    List<PostShare> getAllPostShares();
    void deletePostShare(String id);
}
