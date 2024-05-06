
package com.paf.socailfitnessapplication.service;

import com.paf.socailfitnessapplication.entity.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(String id);
    User createUser(User user);
    User updateUser(String id, User user);
    void deleteUser(String id);
    User getUserByUsername(String username);
    User authenticateUser(String username, String password); // New method for user authentication

}
