# Modelo de datos

El respaldo `C:\Users\ramos\Downloads\neon.sql` tiene firma `PGDMP`: es un dump PostgreSQL binario y debe restaurarse con `pg_restore`, no leerse como SQL plano.

Para demo se usa una representación sintética: `users` concentra la entidad de usuario (se evita la duplicación conceptual `usuarios`/`users`), `tickets.id` representa `id_ticket`, `requesterId` representa el solicitante y `assigneeId` el técnico responsable. Los comentarios conservan `ticketId` y `userId`. Las contraseñas demo no se almacenan; el acceso usa cuentas ficticias predefinidas.
