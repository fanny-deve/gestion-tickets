import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Role } from "../types";

interface Props {
  allowedRoles?: Role[];
}

/**
 * Protege rutas que requieren sesion iniciada (HU-01) y, opcionalmente,
 * un rol especifico (por ejemplo, gestion de usuarios solo para
 * ADMINISTRADOR, ver HU-02).
 */
export default function PrivateRoute({ allowedRoles }: Props) {
  const { user, loading } = useAuth();

  // Mientras se confirma si hay sesion activa (GET /auth/me), no se decide
  // nada todavia: evita un redireccionamiento a /login en falso al refrescar.
  if (loading) {
    return <div className="loading-screen">Cargando espacio de trabajo…</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
