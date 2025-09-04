package com.userhub.demo.controller;

import com.userhub.demo.dto.UserResponseDTO;
import com.userhub.demo.dto.UserUpdateDTO;
import com.userhub.demo.model.User;
import com.userhub.demo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getUserProfile(@AuthenticationPrincipal User user) {
        // A anotação @AuthenticationPrincipal injeta o usuário que foi autenticado pelo SecurityFilter
        UserResponseDTO userResponse = new UserResponseDTO(user.getId(), user.getName(), user.getEmail());
        return ResponseEntity.ok(userResponse);
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponseDTO> updateUserProfile(@AuthenticationPrincipal User user, @Valid @RequestBody UserUpdateDTO data) {
        User updatedUser = userService.updateUserProfile(user.getId(), data);
        UserResponseDTO userResponse = new UserResponseDTO(updatedUser.getId(), updatedUser.getName(), updatedUser.getEmail());
        return ResponseEntity.ok(userResponse);
    }
}

