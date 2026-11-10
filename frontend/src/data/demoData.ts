import { DemoData } from "../types";

const ago = (days: number) => new Date(Date.now() - days * 86400000).toISOString();

export const demoCredentials = [
  { email: "anghelic@demo.local", password: "demo", role: "ADMINISTRADOR" },
  { email: "stefany@demo.local", password: "demo", role: "ADMINISTRADOR" },
  { email: "lina@demo.local", password: "demo", role: "TECNICO" },
  { email: "luis.alexander@demo.local", password: "demo", role: "TECNICO" },
  { email: "cristian@demo.local", password: "demo", role: "USUARIO" },
  { email: "marcela@demo.local", password: "demo", role: "ADMINISTRADOR" },
  { email: "andrea@demo.local", password: "demo", role: "USUARIO" },
  { email: "liseth@demo.local", password: "demo", role: "USUARIO" },
  { email: "juan.camilo@demo.local", password: "demo", role: "ADMINISTRADOR" },
  { email: "jorge.luis@demo.local", password: "demo", role: "ADMINISTRADOR" },
  { email: "valeria@demo.local", password: "demo", role: "USUARIO" },
] as const;

const users = [
  [1, "Anghelic Suray Peñaranda Orejuela", "anghelic@demo.local", "ADMINISTRADOR"],
  [2, "Stefany Murillo Garcia", "stefany@demo.local", "ADMINISTRADOR"],
  [3, "Lina Marcela Ospina Chacon", "lina@demo.local", "TECNICO"],
  [4, "Luis Alexander Ocoro Loango", "luis.alexander@demo.local", "TECNICO"],
  [5, "Cristian Andrés Quiñonez Álvarez", "cristian@demo.local", "USUARIO"],
  [6, "Claudia Marcela Piedrahita Mera", "marcela@demo.local", "ADMINISTRADOR"],
  [7, "Andrea Navia Mesa", "andrea@demo.local", "USUARIO"],
  [8, "Liseth Valentina Mosquera Florez", "liseth@demo.local", "USUARIO"],
  [9, "Juan Camilo Ocampo Loboa", "juan.camilo@demo.local", "ADMINISTRADOR"],
  [10, "Jorge Luis Ramos Perdomo", "jorge.luis@demo.local", "ADMINISTRADOR"],
  [11, "Valeria Quitiaquez Pasuy", "valeria@demo.local", "USUARIO"],
].map(([id, fullName, email, role]) => ({
  id: Number(id), fullName: String(fullName), email: String(email),
  role: role as DemoData["users"][number]["role"], enabled: true, createdAt: ago(30),
}));

const titles = ["No puedo acceder al correo corporativo", "Pantalla azul al iniciar sesión", "Solicitud de acceso a carpeta compartida", "Impresora del área comercial no responde", "Configurar VPN para trabajo remoto", "Error al cargar reporte mensual", "Reemplazo de teclado", "Actualización de software pendiente", "Wi-Fi intermitente en sala 2", "Permisos para nueva herramienta", "Monitor con imagen parpadeante", "Restablecer contraseña de intranet", "Lentitud en equipo de diseño", "Crear cuenta para nuevo integrante", "Falla en lector de tarjetas", "Instalar certificado digital", "Aplicación se cierra inesperadamente", "Solicitud de capacitación"];
const statuses = ["ABIERTO", "EN_PROCESO", "RESUELTO", "CERRADO"] as const;
const priorities = ["ALTA", "MEDIA", "BAJA"] as const;
const tickets = titles.map((title, i) => ({ id: i + 1001, title, description: `Se requiere apoyo del equipo de soporte para resolver: ${title.toLowerCase()}.`, category: ["Acceso", "Hardware", "Software", "Redes"][i % 4], priority: priorities[i % 3], status: statuses[i % 4], requesterId: 5 + (i % 3), assigneeId: i % 5 === 0 ? undefined : 3 + (i % 2), createdAt: ago(i + 1), updatedAt: ago(Math.max(0, i - 1)) }));

export const initialDemoData: DemoData = {
  version: 1,
  users,
  tickets,
  comments: tickets.slice(0, 6).map((t, i) => ({ id: i + 1, ticketId: t.id, userId: t.assigneeId ?? 3, content: ["Estamos revisando el caso.", "Se aplicó una primera solución y validamos con el usuario.", "Quedó agendada una intervención para hoy."][i % 3], createdAt: ago(i) })),
  events: [],
  nextIds: { user: 12, ticket: 1019, comment: 7, event: 1 },
};
