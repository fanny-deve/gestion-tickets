# Arquitectura

La aplicación mantiene React + TypeScript + Vite en `frontend/` y Spring Boot en `backend/`.

El modo demo usa `services/repository.ts` como contrato y `services/demoStore.ts` como adaptador de persistencia. Los datos se serializan en `localStorage` bajo `gestion-tickets.demo.v1`; la sesión usa una clave separada. La carga ejecuta una migración/validación estricta de versión 1 y restaura datos sintéticos si el contenido es corrupto o incompatible. La aplicación escucha eventos `storage` para refrescar las vistas entre pestañas. Las páginas no conocen detalles de Axios ni de almacenamiento. `VITE_DATA_MODE=demo` es el valor principal; el cliente API existente y `VITE_API_URL` quedan conservados para la futura integración Spring, pero no se presentan como soportados para operaciones que el servidor aún no expone.

El control de roles del modo demo es educativo y ocurre en el navegador. No equivale a la seguridad de Spring Security.
