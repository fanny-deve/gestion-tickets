export type Role = "ADMINISTRADOR" | "USUARIO" | "TECNICO";

export type TicketPriority = "BAJA" | "MEDIA" | "ALTA";

export type TicketStatus = "ABIERTO" | "EN_PROCESO" | "RESUELTO" | "CERRADO";

export interface UserResponse {
  id: number;
  fullName: string;
  email: string;
  role: Role;
  enabled: boolean;
}

export interface TicketResponse {
  id: number;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdByName: string;
  createdAt: string;
}
