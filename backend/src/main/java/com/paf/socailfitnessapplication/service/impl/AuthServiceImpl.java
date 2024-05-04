package com.paf.socailfitnessapplication.service.impl;

import com.paf.socailfitnessapplication.repo.UserRepository;
import com.paf.socailfitnessapplication.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void registerUser(SignupRequest signUpRequest) {
        // Implement user registration logic here
    }

    @Override
    public String authenticateUser(LoginRequest loginRequest) {
        // Implement user authentication logic here
    }
}