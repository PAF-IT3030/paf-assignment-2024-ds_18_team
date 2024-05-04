package com.paf.socailfitnessapplication.service;

public interface AuthService {
    void registerUser(SignupRequest signUpRequest);
    String authenticateUser(LoginRequest loginRequest);
}

