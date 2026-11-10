import { expect, test } from "@playwright/test";

async function login(page: any, email: string) {
  await page.goto("/login");
  await page.getByRole("textbox", { name: /Correo/ }).fill(email);
  await page.getByRole("textbox", { name: /Contrase/ }).fill("demo");
  await page.getByRole("button", { name: /Entrar al espacio de trabajo/ }).click();
  await expect(page).toHaveURL(/\/$/);
}

test("Sprint 2: flujo de HU-05 a HU-08 por rol", async ({ page }) => {
  await login(page, "jorge.luis@demo.local");
  await page.goto("/tickets/1001");
  await page.getByRole("button", { name: /Editar/ }).click();
  await page.locator("#ticket-edit-form textarea").fill("Ticket actualizado por Jorge durante Sprint 2");
  await page.getByRole("button", { name: /Guardar/ }).click();
  await page.getByLabel(/Responsable/).selectOption("3");
  await page.getByLabel(/Prioridad/).selectOption("ALTA");
  await page.getByRole("button", { name: /Avanzar a EN PROCESO/ }).click();
  await expect(page.getByText("EN PROCESO", { exact: true }).first()).toBeVisible();

  await page.locator('button[title^="Cerrar"]').click();
  await login(page, "lina@demo.local");
  await page.goto("/asignados");
  await expect(page.getByRole("link", { name: /#1001/ })).toBeVisible();

  await page.locator('button[title^="Cerrar"]').click();
  await login(page, "cristian@demo.local");
  await page.goto("/tickets/1001");
  await expect(page.getByRole("button", { name: /Editar/ })).not.toBeVisible();
  await expect(page.getByLabel(/Prioridad/)).toBeDisabled();
});
