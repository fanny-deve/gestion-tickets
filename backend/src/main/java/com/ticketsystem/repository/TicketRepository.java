package com.ticketsystem.repository;

import com.ticketsystem.model.Ticket;
import com.ticketsystem.model.TicketPriority;
import com.ticketsystem.model.TicketStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * JpaSpecificationExecutor habilita las consultas con filtros dinamicos
 * usadas en HU-04 (consulta) y que luego soportaran HU-10 (busqueda y filtrado).
 */
public interface TicketRepository extends JpaRepository<Ticket, Long>, JpaSpecificationExecutor<Ticket> {
}
