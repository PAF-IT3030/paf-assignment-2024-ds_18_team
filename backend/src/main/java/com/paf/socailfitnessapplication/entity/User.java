package com.paf.socailfitnessapplication.entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.domain.Auditable;

import java.io.Serializable;

@Entity
@Table(name = "users")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    // Constructors, getters, and setters
}
// Constructors, getters, and setters
}
