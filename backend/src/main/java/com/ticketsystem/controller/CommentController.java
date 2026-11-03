package com.ticketsystem.controller;

import com.ticketsystem.model.Comment;
import com.ticketsystem.model.Role;
import com.ticketsystem.model.Ticket;
import com.ticketsystem.model.User;
import com.ticketsystem.dto.CommentRequest;
import com.ticketsystem.dto.CommentResponse;
import com.ticketsystem.repository.CommentRepository;
import com.ticketsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tickets/{ticketId}/comments")
public class CommentController {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    private User currentUser(Authentication auth) {
        return userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Usuario no autenticado"));
    }

    private void checkAccess(Ticket ticket, User user) {
        if (user.getRole() == Role.USUARIO
                && !ticket.getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException("No tienes permiso para ver o agregar comentarios en este ticket");
        }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CommentResponse create(@PathVariable Long ticketId,
                                  @RequestBody CommentRequest request,
                                  Authentication auth) {
        User author = currentUser(auth);
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket no encontrado"));
        checkAccess(ticket, author);
        Comment saved = commentRepository.save(Comment.builder()
                .ticket(ticket).author(author).content(request.getContent().trim()).build());
        return CommentResponse.from(saved, author.getFullName());
    }

    @GetMapping
    public List<CommentResponse> list(@PathVariable Long ticketId, Authentication auth) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket no encontrado"));
        checkAccess(ticket, currentUser(auth));
        return commentRepository.findByTicket_IdOrderByCreatedAtAsc(ticketId).stream()
                .map(c -> CommentResponse.from(c, c.getAuthor().getFullName())).toList();
    }
}