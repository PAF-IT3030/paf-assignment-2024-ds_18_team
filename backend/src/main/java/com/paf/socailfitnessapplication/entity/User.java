package com.paf.socailfitnessapplication.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Entity
@Data
public class User {

    @Id
    private String id;

    private String username;
    private String email;

}
