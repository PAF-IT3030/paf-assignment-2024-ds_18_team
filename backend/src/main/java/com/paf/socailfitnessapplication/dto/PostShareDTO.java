package com.paf.socailfitnessapplication.dto;

import com.paf.socailfitnessapplication.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostShareDTO {
    private String id;
    private String caption;
    private String userId;
    private Post post;
    private Date createdAt;
    private Date updatedAt;

    // Optional: You can add static methods to convert between entities and DTOs if needed
    // For example:
    // public static PostShareDTO fromEntity(PostShare postShare) {
    //     return new PostShareDTO(postShare.getId(), postShare.getCaption(), postShare.getUserId(), postShare.getPost(), postShare.getCreatedAt(), postShare.getUpdatedAt());
    // }
    //
    // public PostShare toEntity() {
    //     PostShare postShare = new PostShare();
    //     postShare.setId(this.getId());
    //     postShare.setCaption(this.getCaption());
    //     postShare.setUserId(this.getUserId());
    //     postShare.setPost(this.getPost());
    //     postShare.setCreatedAt(this.getCreatedAt());
    //     postShare.setUpdatedAt(this.getUpdatedAt());
    //     return postShare;
    // }
}
