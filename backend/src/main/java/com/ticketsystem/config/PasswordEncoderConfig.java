package com.ticketsystem.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * El PasswordEncoder vive en su propia clase, separado de SecurityConfig,
 * para evitar una dependencia circular entre beans (SecurityConfig necesita
 * UserDetailsService, que necesita PasswordEncoder, que antes solo existia
 * dentro de SecurityConfig).
 */
@Configuration
public class PasswordEncoderConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
