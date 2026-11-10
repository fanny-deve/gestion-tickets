# Pendientes de backend

El backend actual cubre autenticación, usuarios y creación/consulta básica de tickets con sesión Spring Security. `frontend/src/services/apiRepository.ts` refleja esas operaciones soportadas. Todavía no expone contratos para edición de usuarios, asignación, edición de tickets, comentarios, historial, filtros avanzados ni migraciones del dump PostgreSQL. El adaptador demo no debe presentarse como equivalente a esos controles del servidor.
