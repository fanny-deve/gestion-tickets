import { expect, test } from "@playwright/test";

async function login(page: any, email = "jorge.luis@demo.local") {
  await page.goto("/login");
  await page.getByRole("textbox", { name: /Correo/ }).fill(email);
  await page.getByRole("textbox", { name: /Contrase/ }).fill("demo");
  await page.getByRole("button", { name: /Entrar al espacio de trabajo/ }).click();
  await expect(page).toHaveURL(/\/$/);
}

test.beforeEach(async ({ page }) => { await page.addInitScript(() => { if (!sessionStorage.getItem("e2e-reset")) { localStorage.clear(); sessionStorage.setItem("e2e-reset", "1"); } }); });

test("HU-01/HU-04: login y dashboard demo", async ({ page }) => {
  await login(page);
  await expect(page.getByRole("heading", { name: "Resumen general" })).toBeVisible();
  await expect(page.getByText("18", { exact: true }).first()).toBeVisible();
});

test("HU-03/HU-10: crear ticket y filtrarlo", async ({ page }) => {
  await login(page);
  await page.getByRole("link", { name: "＋ Nuevo ticket" }).click();
  await expect(page.getByRole("dialog", { name: "¿En qué podemos ayudarte?" })).toBeVisible();
  await page.getByRole("textbox", { name: "Título del problema" }).fill("E2E ticket");
  await page.getByRole("textbox", { name: "Cuéntanos más" }).fill("Creado por Playwright");
  await page.getByRole("button", { name: "Crear ticket →" }).click();
  await expect(page.getByText("E2E ticket")).toBeVisible();
  await page.getByPlaceholder(/Buscar por ID/).fill("E2E ticket");
  await expect(page.getByText("1 solicitudes encontradas")).toBeVisible();
});

test("HU-05/HU-08/HU-09: editar, avanzar estado y comentar", async ({ page }) => {
  await login(page);
  await page.goto("/tickets/1001");
  await expect(page.getByRole("button", { name: "Editar información" })).toBeVisible();
  await page.getByRole("button", { name: "Editar información" }).click();
  await page.getByRole("textbox", { name: "Descripción" }).fill("Descripción editada E2E");
  await page.getByRole("button", { name: "Guardar información" }).click();
  await expect(page.getByText("Descripción editada E2E")).toBeVisible();
  await page.getByRole("button", { name: /Avanzar a EN PROCESO/ }).click();
  await expect(page.getByText("EN PROCESO", { exact: true }).first()).toBeVisible();
  await page.getByRole("textbox", { name: "Escribe una actualización…" }).fill("Comentario E2E");
  await page.getByRole("button", { name: "Añadir comentario" }).click();
  await expect(page.getByText("Comentario E2E")).toBeVisible();
  await page.reload();
  await expect(page.getByText("Comentario E2E")).toBeVisible();
});

test("HU-02/HU-04: usuario solo ve sus tickets y no usuarios", async ({ page }) => {
  await login(page);
  await page.getByRole("button", { name: "↪" }).click();
  await expect(page).toHaveURL(/\/login$/);
  await login(page, "cristian@demo.local");
  await page.goto("/tickets");
  await expect(page.getByText("6 solicitudes encontradas")).toBeVisible();
  await page.goto("/usuarios");
  await expect(page).toHaveURL(/\/$/);
});

test("HU-02: administrador edita un usuario", async ({ page }) => {
  await login(page); await page.goto("/usuarios"); await page.getByRole("button", { name: "Editar" }).first().click();
  await page.getByRole("textbox", { name: "Nombre completo" }).fill("Valentina Editada"); await page.getByRole("button", { name: "Guardar cambios" }).click();
  await expect(page.getByText("Valentina Editada")).toBeVisible();
});

test("HU-04/HU-06: técnico consulta sus tickets asignados", async ({ page }) => {
  await login(page, "lina@demo.local"); await page.goto("/asignados"); await expect(page.getByRole("heading", { name: "Mis tickets asignados" })).toBeVisible(); await expect(page.getByText(/solicitudes encontradas/)).toBeVisible();
});

test("Configuración: exporta e importa datos demo", async ({ page }) => {
  await login(page); await page.goto("/configuracion");
  const download = page.waitForEvent("download"); await page.getByRole("button", { name: /Exportar JSON/ }).click(); expect((await download).suggestedFilename()).toBe("ticketflow-demo.json");
  const minimal = { version: 1, users: [], tickets: [], comments: [], events: [], nextIds: { user: 1, ticket: 1, comment: 1, event: 1 } };
  await page.locator('input[type="file"]').setInputFiles({ name: "demo.json", mimeType: "application/json", buffer: Buffer.from(JSON.stringify(minimal)) }); await expect(page.getByText("Datos importados correctamente")).toBeVisible();
});

test("Vista Kanban: muestra las cuatro columnas operativas", async ({ page }) => {
  await login(page); await page.goto("/tickets"); await page.getByRole("button", { name: "▦ Kanban" }).click();
  await expect(page.getByRole("heading", { name: "Abierto" })).toBeVisible(); await expect(page.getByRole("heading", { name: "En proceso" })).toBeVisible(); await expect(page.getByRole("heading", { name: "Resuelto" })).toBeVisible(); await expect(page.getByRole("heading", { name: "Cerrado" })).toBeVisible();
});

test("Crear ticket: la ruta antigua abre el modal integrado", async ({ page }) => {
  await login(page); await page.goto("/tickets/nuevo"); await expect(page).toHaveURL(/\/tickets\?new=1$/); await expect(page.getByRole("dialog", { name: "¿En qué podemos ayudarte?" })).toBeVisible();
});
