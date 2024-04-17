package com.paf.socailfitnessapplication.service.impl;

import com.paf.socailfitnessapplication.entity.User;
import com.paf.socailfitnessapplication.repo.UserRepository;
import com.paf.socailfitnessapplication.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }
}
