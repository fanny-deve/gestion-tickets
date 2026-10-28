package com.ticketsystem.controller;

import com.ticketsystem.dto.RegisterUserRequest;
import com.ticketsystem.dto.UserResponse;
import com.ticketsystem.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * HU-02 - Gestion de usuarios y roles.
 * Todos los endpoints requieren rol ADMINISTRADOR (ver SecurityConfig).
 */
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public UserResponse createUser(@Valid @RequestBody RegisterUserRequest request) {
        return userService.createUser(request);
    }

    @GetMapping
    public List<UserResponse> listUsers() {
        return userService.listUsers();
    }
}
