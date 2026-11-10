export type Role = "ADMINISTRADOR" | "USUARIO" | "TECNICO";
export type TicketPriority = "BAJA" | "MEDIA" | "ALTA";
export type TicketStatus = "ABIERTO" | "EN_PROCESO" | "RESUELTO" | "CERRADO";
export interface UserResponse { id: number; fullName: string; email: string; role: Role; enabled: boolean; createdAt: string; }
export interface TicketAttachment { id: string; name: string; type: string; url: string; }
export interface TicketResponse { id: number; title: string; description: string; category: string; priority: TicketPriority; status: TicketStatus; requesterId: number; assigneeId?: number; attachments?: TicketAttachment[]; createdAt: string; updatedAt: string; }
export interface Comment { id: number; ticketId: number; userId: number; content: string; createdAt: string; }
export interface AuditEvent { id: number; ticketId: number; userId: number; label: string; createdAt: string; }
export interface DemoData { version: number; users: UserResponse[]; tickets: TicketResponse[]; comments: Comment[]; events: AuditEvent[]; nextIds: { user: number; ticket: number; comment: number; event: number }; }
