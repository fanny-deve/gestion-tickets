package com.ticketsystem.dto;

import com.ticketsystem.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * DTO usado por el Administrador para crear usuarios (HU-02).
 */
public record RegisterUserRequest(
        @NotBlank String fullName,
        @NotBlank @Email String email,
        @NotBlank @Size(min = 6, message = "La contrasena debe tener al menos 6 caracteres") String password,
        @NotNull Role role
) {}
