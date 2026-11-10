import { api } from "../api/client";
import { Role, TicketPriority, UserResponse } from "../types";

/** Adaptador de las operaciones que el backend actual realmente expone. */
export const apiRepository = {
  async login(email: string, password: string) { return (await api.post<UserResponse>("/auth/login", { email, password })).data; },
  async currentUser() { return (await api.get<UserResponse>("/auth/me")).data; },
  async logout() { await api.post("/auth/logout"); },
  async users() { return (await api.get<UserResponse[]>("/users")).data; },
  async createUser(input: { fullName: string; email: string; password: string; role: Role }) { return (await api.post<UserResponse>("/users", input)).data; },
  async tickets() { return (await api.get("/tickets")).data; },
  async ticket(id: number) { return (await api.get(`/tickets/${id}`)).data; },
  async createTicket(input: { title: string; description: string; priority: TicketPriority }) { return (await api.post("/tickets", input)).data; },
  unsupported(operation: string): never { throw new Error(`La operación «${operation}» aún no está soportada por el backend Spring actual.`); },
};
