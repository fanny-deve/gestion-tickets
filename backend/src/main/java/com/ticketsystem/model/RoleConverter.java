package com.ticketsystem.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class RoleConverter implements AttributeConverter<Role, Integer> {

    @Override
    public Integer convertToDatabaseColumn(Role role) {
        if (role == null) return null;
        return switch (role) {
            case ADMINISTRADOR -> 1;
            case USUARIO -> 2;
            case TECNICO -> 3;
        };
    }

    @Override
    public Role convertToEntityAttribute(Integer id) {
        if (id == null) return null;
        return switch (id) {
            case 1 -> Role.ADMINISTRADOR;
            case 2 -> Role.USUARIO;
            case 3 -> Role.TECNICO;
            default -> throw new IllegalArgumentException("Rol desconocido: " + id);
        };
    }
}