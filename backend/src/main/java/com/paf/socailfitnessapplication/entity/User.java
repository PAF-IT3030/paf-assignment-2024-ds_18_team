package com.paf.socailfitnessapplication.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
public class User {

    @Id
    private String id;
    private String username;
    private String email;
    private String password; // Add password field

    // Add setter method for name
    public void setName(String name) {
        this.username = name;
    }

}
