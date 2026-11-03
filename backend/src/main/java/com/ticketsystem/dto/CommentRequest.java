package com.ticketsystem.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * DTO de entrada para HU-09 (crear comentario).
 * El contenido es obligatorio y se trima al guardar.
 */
@Data
public class CommentRequest {
    @NotBlank(message = "El contenido del comentario es obligatorio")
    private String content;
}