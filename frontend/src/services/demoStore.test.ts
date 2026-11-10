import { beforeEach, describe, expect, it } from "vitest";
import { demoStore } from "./demoStore";

describe("demoStore", () => {
  beforeEach(() => { localStorage.clear(); });
  it("initializes synthetic data and authenticates demo users", () => {
    expect(demoStore.data().tickets).toHaveLength(18);
    expect(demoStore.login("jorge.luis@demo.local", "demo").role).toBe("ADMINISTRADOR");
    expect(demoStore.currentUser()?.email).toBe("jorge.luis@demo.local");
  });
  it("creates tickets with an immutable initial open status", () => {
    const ticket = demoStore.createTicket({ title: "Prueba", description: "Descripción", category: "Software", priority: "ALTA" }, 4);
    expect(ticket.status).toBe("ABIERTO");
    expect(demoStore.data().tickets[0].id).toBe(ticket.id);
  });
  it("rejects invalid assignees and invalid status transitions", () => {
    expect(() => demoStore.updateTicket(1001, { assigneeId: 5 }, 1)).toThrow("técnico activo");
    expect(() => demoStore.updateTicket(1001, { status: "CERRADO" }, 1)).toThrow("transición");
  });
  it("edits users while protecting duplicate emails", () => {
    const user = demoStore.updateUser(5, { fullName: "Cristian Actualizado", email: "cristian.nuevo@demo.local", role: "TECNICO" });
    expect(user.fullName).toBe("Cristian Actualizado"); expect(user.role).toBe("TECNICO");
    expect(() => demoStore.updateUser(5, { fullName: "Cristian", email: "anghelic@demo.local", role: "USUARIO" })).toThrow("correo");
  });
  it("edits ticket information and records an event", () => {
    const updated = demoStore.updateTicket(1001, { title: "Título actualizado", description: "Nueva descripción", category: "Redes" }, 1);
    expect(updated.title).toBe("Título actualizado"); expect(updated.category).toBe("Redes");
    expect(demoStore.data().events[0].ticketId).toBe(1001);
  });
  it("keeps comments and exported data after persistence", () => {
    demoStore.addComment(1001, 1, "Seguimiento");
    const raw = demoStore.export();
    expect(raw).toContain("Seguimiento");
    expect(() => demoStore.import(raw)).not.toThrow();
  });
});
