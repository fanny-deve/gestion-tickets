package com.ticketsystem.dto;

import com.ticketsystem.model.TicketPriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * DTO de entrada para HU-03 (creacion de tickets).
 */
public record TicketRequest(
        @NotBlank(message = "El titulo es obligatorio") String title,
        @NotBlank(message = "La descripcion es obligatoria") String description,
        @NotNull(message = "La prioridad es obligatoria") TicketPriority priority
) {}
