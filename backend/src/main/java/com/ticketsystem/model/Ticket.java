package com.ticketsystem.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ticket")
    private Long id;

    @Column(name = "titulo", nullable = false, length = 150)
    private String title;

    @Column(name = "descripcion", nullable = false)
    private String description;

    @Convert(converter = TicketPriorityConverter.class)
    @Column(name = "prioridad", nullable = false, length = 20)
    @Builder.Default
    private TicketPriority priority = TicketPriority.MEDIA;

    @Convert(converter = TicketStatusConverter.class)
    @Column(name = "estado", nullable = false, length = 20)
    @Builder.Default
    private TicketStatus status = TicketStatus.ABIERTO;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_usuario_solicitante", nullable = false)
    private User createdBy;

    @Column(name = "fecha_creacion", nullable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}