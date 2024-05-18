package com.backend.backend.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.Model.MyUser;
import com.backend.backend.Repository.MyUserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class UserController {
    @Autowired
    private MyUserRepository myUserRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register/user")
    public String addUser(@RequestBody MyUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        myUserRepository.save(user);
        return "User saved";
    }

}
