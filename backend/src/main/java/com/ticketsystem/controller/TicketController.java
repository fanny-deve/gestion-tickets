package com.ticketsystem.controller;

import com.ticketsystem.dto.TicketRequest;
import com.ticketsystem.dto.TicketResponse;
import com.ticketsystem.model.User;
import com.ticketsystem.service.TicketService;
import com.ticketsystem.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * HU-03 - Creacion de tickets.
 * HU-04 - Consulta de tickets.
 */
@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;
    private final UserService userService;

    @PostMapping
    public TicketResponse createTicket(@Valid @RequestBody TicketRequest request, Authentication authentication) {
        User creator = userService.getByEmail(authentication.getName());
        return ticketService.createTicket(request, creator);
    }

    @GetMapping
    public List<TicketResponse> listTickets() {
        return ticketService.listTickets();
    }

    @GetMapping("/{id}")
    public TicketResponse getTicket(@PathVariable Long id) {
        return ticketService.getTicket(id);
    }
}
