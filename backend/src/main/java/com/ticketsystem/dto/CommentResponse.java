package com.ticketsystem.dto;

import com.ticketsystem.model.Comment;
import com.ticketsystem.model.User;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * DTO de salida para HU-09 (lista y detalle de comentarios).
 */
@Data
public class CommentResponse {
    private Long id;
    private String content;
    private String authorName;
    private String createdAt;

    public static CommentResponse from(Comment c, String authorName) {
        return new CommentResponse(
                c.getId(),
                c.getContent(),
                authorName != null ? authorName : "Anónimo",
                c.getCreatedAt() != null ? c.getCreatedAt().toString() : null
        );
    }
}