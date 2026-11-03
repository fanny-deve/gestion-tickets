package com.ticketsystem.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "usuarios")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long id;

    @Column(name = "nombre", nullable = false, length = 100)
    private String fullName;

    @Column(name = "correo", nullable = false, unique = true, length = 150)
    private String email;

    @Column(name = "password_hash", nullable = false, length = 255)
    private String password;

    @Convert(converter = RoleConverter.class)
    @Column(name = "id_rol", nullable = false)
    private Role role;

    // La tabla usuarios no tiene esta columna: no se guarda, siempre habilitado.
    @Transient
    @Builder.Default
    private boolean enabled = true;
}