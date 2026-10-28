import { useEffect, useState } from "react";
import { api } from "../api/client";
import { TicketResponse } from "../types";

// HU-04 - Consulta de tickets
// La búsqueda y el filtrado avanzado (HU-10) se incorporarán en un Sprint posterior.
export default function TicketsPage() {
  const [tickets, setTickets] = useState<TicketResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTickets() {
      const { data } = await api.get<TicketResponse[]>("/tickets");
      setTickets(data);
      setLoading(false);
    }
    loadTickets();
  }, []);

  return (
    <div className="page">
      <h1>Tickets</h1>

      {loading && <p>Cargando tickets...</p>}

      {!loading && tickets.length === 0 && <p>Aún no hay tickets registrados.</p>}

      {!loading && tickets.length > 0 && (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Prioridad</th>
              <th>Estado</th>
              <th>Creado por</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.title}</td>
                <td>{t.priority}</td>
                <td>{t.status}</td>
                <td>{t.createdByName}</td>
                <td>{new Date(t.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
