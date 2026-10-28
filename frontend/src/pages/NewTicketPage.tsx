import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { TicketPriority } from "../types";

// HU-03 - Creación de tickets
export default function NewTicketPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TicketPriority>("MEDIA");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api.post("/tickets", { title, description, priority });
      navigate("/tickets");
    } catch (err: any) {
      setError(err.response?.data?.error ?? "No fue posible crear el ticket.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <h1>Nuevo ticket</h1>
      <form className="stacked-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Título</label>
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="priority">Prioridad</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as TicketPriority)}
        >
          <option value="BAJA">Baja</option>
          <option value="MEDIA">Media</option>
          <option value="ALTA">Alta</option>
        </select>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Crear ticket"}
        </button>
      </form>
    </div>
  );
}
