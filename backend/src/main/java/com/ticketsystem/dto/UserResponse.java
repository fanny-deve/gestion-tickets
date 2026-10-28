package com.ticketsystem.dto;

import com.ticketsystem.model.Role;
import com.ticketsystem.model.User;

public record UserResponse(
        Long id,
        String fullName,
        String email,
        Role role,
        boolean enabled
) {
    public static UserResponse from(User u) {
        return new UserResponse(u.getId(), u.getFullName(), u.getEmail(), u.getRole(), u.isEnabled());
    }
}
