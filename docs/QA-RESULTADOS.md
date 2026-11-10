# QA – resultados

Fecha de verificación: 2026-11-09. Entorno: frontend demo, Node instalado localmente durante la tarea.

| Caso | Resultado | Estado |
|---|---|---|
| Compilación TypeScript y build Vite | `npm run build` exitoso | Aprobado |
| Pruebas unitarias del repositorio demo | `npm test`: 6 tests aprobados | Aprobado |
| Suite E2E demo | `npx playwright test`: 10 tests aprobados | Aprobado |
| Vista Kanban | Ejecutada en E2E; cuatro columnas visibles | Aprobado |
| Motion, toasts y sidebar colapsable | Verificados en build y recorrido demo | Aprobado |
| Creación de ticket integrada | Modal, ruta antigua y flujo de creación verificados en E2E | Aprobado |
| Dependencia de Java/Spring para cargar frontend | El código demo no llama Axios | Aprobado |
| Pruebas backend Maven | No ejecutadas: `mvn` no está instalado en el entorno | Pendiente |
| Login demo y sesión tras recarga | Implementado en `demoStore` y verificado en E2E | Aprobado |
| Roles y navegación | `PrivateRoute`, menú condicional y flujo de tres roles verificado en E2E | Aprobado |
| Crear ticket y estado inicial | Modal y estado `ABIERTO` verificados en E2E | Aprobado |
| Usuarios/correo duplicado | Implementado y cubierto por pruebas unitarias | Aprobado |
| Búsqueda y filtro combinado | Búsqueda y filtrado verificados en E2E | Aprobado |
| Login demo de Jorge Luis como administrador | Ejecutado en navegador y E2E | Aprobado |
| Crear ticket desde formulario | Ejecutado en navegador | Aprobado |
| Restricción de tickets por solicitante | Ejecutado: el usuario solo ve sus tickets | Aprobado |
| Restricción de ruta Usuarios | Ejecutado: redirección a resumen | Aprobado |
| Pantalla de edición de usuarios | Ejecutada y guardada en E2E | Aprobado |
| Dashboard y listado de 18 tickets ficticios | Ejecutado en navegador | Aprobado |
| Detalle de ticket | Ejecutado en navegador | Aprobado |
| Asignar a técnico activo | Ejecutado en navegador | Aprobado |
| Avanzar estado y persistir tras recarga | Ejecutado en navegador | Aprobado |
| Agregar comentario y persistir tras recarga | Ejecutado en navegador | Aprobado |
| Flujo Sprint 2 por roles (HU-05 a HU-08) | Jorge edita/asigna/prioriza/avanza; Lina consulta asignados; Cristian queda restringido | Aprobado |

La suite E2E cubre perfiles administrador, solicitante y técnico, además de importación/exportación JSON. El build de producción sí fue ejecutado correctamente con `npm run build`. La única verificación externa pendiente es el backend Maven, porque Maven no está instalado en este entorno.
