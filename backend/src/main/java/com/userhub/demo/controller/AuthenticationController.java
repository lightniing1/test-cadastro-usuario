package com.userhub.demo.controller;

import com.userhub.demo.config.security.TokenService;
import com.userhub.demo.dto.AuthResponseDTO;
import com.userhub.demo.dto.LoginRequestDTO;
import com.userhub.demo.dto.UserRegistrationDTO;
import com.userhub.demo.dto.UserResponseDTO;
import com.userhub.demo.model.User;
import com.userhub.demo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private UserService userService;

    @PostMapping("/signin")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginRequestDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.getEmail(), data.getPassword());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new AuthResponseDTO(token));
    }

    @PostMapping("/signup")
    public ResponseEntity<UserResponseDTO> signup(@RequestBody @Valid UserRegistrationDTO data) {

        User savedUser = userService.registerUser(data);

        UserResponseDTO responseDTO = new UserResponseDTO(savedUser.getId(), savedUser.getName(), savedUser.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }
}
