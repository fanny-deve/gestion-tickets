# Guía de demo

1. Ejecuta `cd frontend && npm install && npm run dev`.
2. Entra con `jorge.luis@demo.local` / `demo` como administrador.
3. Revisa el dashboard y abre Tickets; usa búsqueda y estado.
4. Crea un ticket y comprueba que inicia en `ABIERTO`.
5. En Usuarios registra un técnico y desactívalo/actívalo.
6. Cierra sesión y entra como `cristian@demo.local` / `demo` para mostrar el alcance por solicitante.
7. Para Sprint 2, como Jorge edita el ticket `#1001`, lo asigna a Lina, cambia la prioridad y lo avanza a `EN_PROCESO`.
8. Entra como `lina@demo.local` / `demo` y revisa el ticket en “Mis tickets asignados”.
9. Entra como `cristian@demo.local` / `demo` y verifica que puede consultar su ticket, pero no editarlo ni asignarlo.
10. Usa Configuración para exportar o restaurar datos.

Para ejecutar las verificaciones automatizadas: `npm test`, `npx playwright install chromium` (solo la primera vez) y `npm run test:e2e`.

Todas las cuentas demo usan la contraseña `demo` y son sintéticas.
