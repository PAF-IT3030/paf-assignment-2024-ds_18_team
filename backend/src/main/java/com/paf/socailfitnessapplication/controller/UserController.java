package com.paf.socailfitnessapplication.controller;

import com.paf.socailfitnessapplication.entity.User;
import com.paf.socailfitnessapplication.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @GetMapping("/username/{username}") // New endpoint to get user by username
    public User getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable String id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }

    @PostMapping("/authenticate")
    public User authenticateUser(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        return userService.authenticateUser(username, password);
    }

    // Endpoint to handle OAuth2 callback from Google
    @GetMapping("/login/oauth2/code/google")
    public String handleGoogleCallback(OAuth2AuthenticationToken token) {
        // Handle OAuth2 callback from Google
        // Extract OAuth2 details from the token and process further
        return "OAuth2 callback handled successfully";
    }
}
