import { FormEvent, useEffect, useState } from "react";
import { api } from "../api/client";
import { Role, UserResponse } from "../types";

// HU-02 - Gestión de usuarios y roles (vista de Administrador)
export default function UsersPage() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("USUARIO");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadUsers() {
    const { data } = await api.get<UserResponse[]>("/users");
    setUsers(data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api.post("/users", { fullName, email, password, role });
      setFullName("");
      setEmail("");
      setPassword("");
      setRole("USUARIO");
      await loadUsers();
    } catch (err: any) {
      setError(err.response?.data?.error ?? "No fue posible crear el usuario.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <h1>Gestión de usuarios</h1>

      <form className="inline-form" onSubmit={handleSubmit}>
        <h2>Crear usuario</h2>
        <input
          placeholder="Nombre completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value as Role)}>
          <option value="ADMINISTRADOR">Administrador</option>
          <option value="USUARIO">Usuario</option>
          <option value="TECNICO">Técnico</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear usuario"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>

      <h2>Usuarios registrados</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.fullName}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.enabled ? "Activo" : "Inactivo"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
