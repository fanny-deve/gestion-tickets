import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-brand">Gestión de Tickets</div>
      <div className="navbar-links">
        <Link to="/tickets">Tickets</Link>
        <Link to="/tickets/nuevo">Nuevo ticket</Link>
        {user.role === "ADMINISTRADOR" && <Link to="/usuarios">Usuarios</Link>}
      </div>
      <div className="navbar-user">
        <span>{user.fullName} ({user.role})</span>
        <button onClick={() => logout()}>Cerrar sesión</button>
      </div>
    </nav>
  );
}
