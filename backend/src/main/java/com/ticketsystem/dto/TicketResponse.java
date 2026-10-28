package com.ticketsystem.dto;

import com.ticketsystem.model.Ticket;
import com.ticketsystem.model.TicketPriority;
import com.ticketsystem.model.TicketStatus;

import java.time.LocalDateTime;

/**
 * DTO de salida para HU-04 (consulta de tickets).
 */
public record TicketResponse(
        Long id,
        String title,
        String description,
        TicketPriority priority,
        TicketStatus status,
        String createdByName,
        LocalDateTime createdAt
) {
    public static TicketResponse from(Ticket t) {
        return new TicketResponse(
                t.getId(), t.getTitle(), t.getDescription(), t.getPriority(),
                t.getStatus(), t.getCreatedBy().getFullName(), t.getCreatedAt()
        );
    }
}
