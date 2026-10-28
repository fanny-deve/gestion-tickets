package com.ticketsystem.service;

import com.ticketsystem.dto.TicketRequest;
import com.ticketsystem.dto.TicketResponse;
import com.ticketsystem.model.Ticket;
import com.ticketsystem.model.TicketStatus;
import com.ticketsystem.model.User;
import com.ticketsystem.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Cubre HU-03 (creacion de tickets) y HU-04 (consulta de tickets).
 * El estado inicial de todo ticket nuevo es ABIERTO, tal como se definio
 * en la planificacion del Sprint 1.
 */
@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketResponse createTicket(TicketRequest request, User creator) {
        Ticket ticket = Ticket.builder()
                .title(request.title())
                .description(request.description())
                .priority(request.priority())
                .status(TicketStatus.ABIERTO)
                .createdBy(creator)
                .build();
        return TicketResponse.from(ticketRepository.save(ticket));
    }

    public List<TicketResponse> listTickets() {
        return ticketRepository.findAll().stream().map(TicketResponse::from).toList();
    }

    public TicketResponse getTicket(Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Ticket no encontrado: " + id));
        return TicketResponse.from(ticket);
    }
}
