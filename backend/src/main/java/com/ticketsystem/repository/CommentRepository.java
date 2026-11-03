package com.ticketsystem.repository;

import com.ticketsystem.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio para la entidad Comentario.
 * Proporciona métodos para buscar comentarios por ticket de forma ordenada.
 */
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByTicket_IdOrderByCreatedAtAsc(Long ticketId);
}