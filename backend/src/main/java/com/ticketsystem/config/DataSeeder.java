package com.ticketsystem.config;

import com.ticketsystem.model.Role;
import com.ticketsystem.model.User;
import com.ticketsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Crea un usuario Administrador inicial si no existe ninguno, unicamente
 * para poder probar el login (HU-01) y la gestion de usuarios (HU-02)
 * apenas se levanta el backend por primera vez.
 *
 * Credenciales por defecto: admin@ticketsystem.com / Admin123
 * IMPORTANTE: cambiar esta contrasena antes de cualquier uso real.
 */
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .fullName("Administrador Inicial")
                    .email("admin@ticketsystem.com")
                    .password(passwordEncoder.encode("Admin123"))
                    .role(Role.ADMINISTRADOR)
                    .enabled(true)
                    .build();
            userRepository.save(admin);
            System.out.println(">>> Usuario administrador inicial creado: admin@ticketsystem.com / Admin123");
        }
    }
}
