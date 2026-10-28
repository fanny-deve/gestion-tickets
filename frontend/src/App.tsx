import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import TicketsPage from "./pages/TicketsPage";
import NewTicketPage from "./pages/NewTicketPage";
import UsersPage from "./pages/UsersPage";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/tickets/nuevo" element={<NewTicketPage />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["ADMINISTRADOR"]} />}>
          <Route path="/usuarios" element={<UsersPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/tickets" replace />} />
      </Routes>
    </>
  );
}
