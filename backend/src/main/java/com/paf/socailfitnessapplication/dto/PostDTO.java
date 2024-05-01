package com.paf.socailfitnessapplication.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class PostDTO {
    private String id;
    private String userId;
    private List<String> imgLink;
    private String caption;
    private List<String> likedby;
    private Date createdAt;
    private Date updatedAt;
}

