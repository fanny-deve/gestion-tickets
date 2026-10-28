package com.ticketsystem.controller;

import com.ticketsystem.dto.LoginRequest;
import com.ticketsystem.dto.UserResponse;
import com.ticketsystem.model.User;
import com.ticketsystem.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;

/**
 * HU-01 - Inicio de sesion.
 * Usa sesion de servidor (cookie JSESSIONID) en lugar de JWT: mas simple de
 * configurar y suficiente para el alcance de este proyecto.
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final SecurityContextRepository securityContextRepository;

    @PostMapping("/login")
    public UserResponse login(@Valid @RequestBody LoginRequest request,
                               HttpServletRequest httpRequest,
                               HttpServletResponse httpResponse) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);
        securityContextRepository.saveContext(context, httpRequest, httpResponse);

        User user = userService.getByEmail(request.email());
        return UserResponse.from(user);
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        SecurityContextHolder.clearContext();
    }

    /**
     * Permite al frontend saber, al cargar la pagina, si ya hay una sesion
     * activa (por ejemplo, tras refrescar el navegador).
     */
    @GetMapping("/me")
    public UserResponse me(Authentication authentication) {
        if (authentication == null) {
            throw new IllegalArgumentException("No hay una sesion activa.");
        }
        User user = userService.getByEmail(authentication.getName());
        return UserResponse.from(user);
    }
}
