package com.ticketsystem.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class TicketPriorityConverter implements AttributeConverter<TicketPriority, String> {

    @Override
    public String convertToDatabaseColumn(TicketPriority p) {
        if (p == null) return null;
        return switch (p) {
            case BAJA -> "Baja";
            case MEDIA -> "Media";
            case ALTA -> "Alta";
        };
    }

    @Override
    public TicketPriority convertToEntityAttribute(String s) {
        if (s == null) return null;
        return switch (s) {
            case "Baja" -> TicketPriority.BAJA;
            case "Media" -> TicketPriority.MEDIA;
            case "Alta" -> TicketPriority.ALTA;
            default -> throw new IllegalArgumentException("Prioridad desconocida: " + s);
        };
    }
}