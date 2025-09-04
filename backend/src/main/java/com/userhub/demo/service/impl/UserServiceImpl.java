package com.userhub.demo.service.impl;

import com.userhub.demo.dto.UserRegistrationDTO;
import com.userhub.demo.dto.UserUpdateDTO;
import com.userhub.demo.exceptions.EmailAlreadyExistsException;
import com.userhub.demo.exceptions.UserNotFoundException;
import com.userhub.demo.model.User;
import com.userhub.demo.repository.UserRepository;
import com.userhub.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserServiceImpl implements UserDetailsService, UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(UserRegistrationDTO data) {

        if (userRepository.findByEmail(data.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("This email is already in use.");
        }

        User newUser = new User();
        newUser.setName(data.getName());
        newUser.setEmail(data.getEmail());
        newUser.setPassword(data.getPassword());

        String encodedPassword = passwordEncoder.encode(newUser.getPassword());
        newUser.setPassword(encodedPassword);

        return userRepository.save(newUser);
    }

    public User findUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    public User updateUserProfile(UUID id, UserUpdateDTO userDetailsToUpdate) {
        User existingUser = findUserById(id);
        existingUser.setName(userDetailsToUpdate.getName());
        existingUser.setEmail(userDetailsToUpdate.getEmail());

        return userRepository.save(existingUser);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found."));
    }
}
