package com.backend.backend.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.backend.backend.Model.MyUser;
import com.backend.backend.Repository.MyUserRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private MyUserRepository myUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<MyUser> userOptional = myUserRepository.findByUsername(username);
        MyUser user = userOptional
                .orElseThrow(() -> new UsernameNotFoundException("User with username " + username + " not found"));

        return User.withUsername(user.getUsername())
                .password(user.getPassword())
                .roles(getRoles(user))
                .build();
    }

    private String[] getRoles(MyUser user) {
        String role = user.getRole();
        return (role == null || role.isEmpty()) ? new String[] { "USER" } : role.split(",");
    }
}
