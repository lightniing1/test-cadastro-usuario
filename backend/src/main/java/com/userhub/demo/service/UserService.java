package com.userhub.demo.service;

import com.userhub.demo.dto.UserRegistrationDTO;
import com.userhub.demo.dto.UserUpdateDTO;
import com.userhub.demo.model.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.UUID;

public interface UserService {
    User registerUser(UserRegistrationDTO data);
    User findUserById(UUID id);
    User updateUserProfile(UUID id, UserUpdateDTO userDetailsToUpdate);
    UserDetails loadUserByUsername(String username);
}
