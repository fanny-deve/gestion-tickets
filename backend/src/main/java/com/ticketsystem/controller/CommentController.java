package com.ticketsystem.controller;

import com.ticketsystem.model.*;
import com.ticketsystem.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/tickets/{ticketId}/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentRepository commentRepository;
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    public record CommentRequest(String content) {}
    public record CommentResponse(Long id, Long ticketId, String authorName,
                                  String content, LocalDateTime createdAt) {}

    private CommentResponse toResponse(Comment c) {
        return new CommentResponse(c.getId(), c.getTicket().getId(),
                c.getAuthor().getFullName(), c.getContent(), c.getCreatedAt());
    }

    private User currentUser(Authentication auth) {
        return userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
    }

    private void checkAccess(Ticket ticket, User user) {
        if (user.getRole() == Role.USUARIO
                && !ticket.getCreatedBy().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "No tienes permiso para ver o agregar comentarios en este ticket");
        }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CommentResponse create(@PathVariable Long ticketId,
                                  @RequestBody CommentRequest request,
                                  Authentication auth) {
        if (request.content() == null || request.content().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El comentario no puede estar vacío");
        }
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket no encontrado"));
        User author = currentUser(auth);
        checkAccess(ticket, author);
        Comment saved = commentRepository.save(Comment.builder()
                .ticket(ticket).author(author).content(request.content().trim()).build());
        return toResponse(saved);
    }

    @GetMapping
    public List<CommentResponse> list(@PathVariable Long ticketId, Authentication auth) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket no encontrado"));
        checkAccess(ticket, currentUser(auth));
        return commentRepository.findByTicket_IdOrderByCreatedAtAsc(ticketId)
                .stream().map(this::toResponse).toList();
    }
}