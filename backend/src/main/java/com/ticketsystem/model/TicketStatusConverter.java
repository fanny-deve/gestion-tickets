package com.ticketsystem.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class TicketStatusConverter implements AttributeConverter<TicketStatus, String> {

    @Override
    public String convertToDatabaseColumn(TicketStatus s) {
        if (s == null) return null;
        return switch (s) {
            case ABIERTO -> "Abierto";
            case EN_PROCESO -> "En proceso";
            case RESUELTO -> "Resuelto";
            case CERRADO -> "Cerrado";
        };
    }

    @Override
    public TicketStatus convertToEntityAttribute(String s) {
        if (s == null) return null;
        return switch (s) {
            case "Abierto" -> TicketStatus.ABIERTO;
            case "En proceso" -> TicketStatus.EN_PROCESO;
            case "Resuelto" -> TicketStatus.RESUELTO;
            case "Cerrado" -> TicketStatus.CERRADO;
            default -> throw new IllegalArgumentException("Estado desconocido: " + s);
        };
    }
}