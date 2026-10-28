# Sistema Web de Gestión de Tickets — Base inicial (Sprint 1)

Este repositorio contiene el punto de partida del sistema, cubriendo las
cuatro historias de usuario planificadas para el Sprint 1:

- **HU-01** — Inicio de sesión.
- **HU-02** — Gestión de usuarios y roles.
- **HU-03** — Creación de tickets.
- **HU-04** — Consulta de tickets.

No incluye asignación de tickets, prioridades avanzadas, comentarios,
búsqueda/filtrado ni dashboard: esas historias (HU-05 a HU-11) quedan para
los siguientes Sprint, tal como se definió en el documento del primer avance.

## Nota sobre la base de datos

El documento del primer avance define **PostgreSQL** como base de datos del
proyecto, y esa sigue siendo la tecnología oficial. Sin embargo, para que
los 11 integrantes puedan arrancar el proyecto en su computador sin instalar
un servidor de base de datos, este avance usa **H2** en modo archivo: una
base de datos embebida que se crea sola dentro de `backend/data/` la primera
vez que se ejecuta el backend. No requiere ninguna instalación adicional.

Cuando el proyecto necesite desplegarse en un entorno real, cambiar a
PostgreSQL es cuestión de editar unas pocas líneas en
`backend/src/main/resources/application.properties` (las líneas ya están
dejadas, comentadas, en ese archivo, listas para activarse).

## Estructura del proyecto

```
ticket-system/
├── backend/     Java 17 + Spring Boot 3 + Spring Security + H2
└── frontend/    React 18 + TypeScript + Vite
```

## Requisitos previos (cada integrante debe instalar esto una sola vez)

- **Java 17** (recomendado: Eclipse Temurin 17, desde adoptium.net)
- **Maven** (desde maven.apache.org, o `choco install maven` en Windows con Chocolatey)
- **Node.js 18+** (desde nodejs.org, versión LTS)

No hace falta Docker ni instalar PostgreSQL para este avance.

## 1. Ejecutar el backend

```bash
cd backend
mvn spring-boot:run
```

La primera vez descarga dependencias y puede tardar unos minutos. Cuando
veas en la consola `Started TicketSystemApplication`, el backend ya está
corriendo en `http://localhost:8080`, y se creó automáticamente el archivo
de base de datos en `backend/data/`.

Al iniciar por primera vez, se crea también un usuario Administrador de
prueba:

```
correo:      admin@ticketsystem.com
contraseña:  Admin123
```

**Importante:** esta es una contraseña de prueba para el entorno local de
cada integrante; no debe usarse en un despliegue real.

### Consola de la base de datos (opcional, útil para ver los datos)

Con el backend corriendo, abre `http://localhost:8080/h2-console` en el
navegador. En el campo "JDBC URL" escribe exactamente:

```
jdbc:h2:file:./data/ticketsystem
```

Usuario: `sa`, contraseña: en blanco. Ahí puedes ver las tablas `USERS` y
`TICKETS` y su contenido, útil también como evidencia visual para el
documento de avance.

### Endpoints disponibles

| Método | Endpoint            | Historia | Autenticación requerida |
|--------|----------------------|----------|--------------------------|
| POST   | `/api/auth/login`    | HU-01    | No |
| POST   | `/api/auth/logout`   | HU-01    | Sí |
| GET    | `/api/auth/me`       | HU-01    | Sí |
| POST   | `/api/users`         | HU-02    | Sí (rol ADMINISTRADOR) |
| GET    | `/api/users`         | HU-02    | Sí (rol ADMINISTRADOR) |
| POST   | `/api/tickets`       | HU-03    | Sí |
| GET    | `/api/tickets`       | HU-04    | Sí |
| GET    | `/api/tickets/{id}`  | HU-04    | Sí |

## 2. Ejecutar el frontend

Abre una terminal **nueva** (deja la del backend corriendo) y ejecuta:

```bash
cd frontend
npm install
npm run dev
```

La consola te mostrará una URL, normalmente `http://localhost:5173`. Ábrela
en el navegador; ahí debe aparecer la pantalla de inicio de sesión.

## Flujo de prueba sugerido

1. Iniciar sesión con el usuario administrador de prueba.
2. Desde "Usuarios", crear un usuario con rol Técnico y otro con rol Usuario.
3. Cerrar sesión e iniciar con el usuario recién creado.
4. Crear un ticket desde "Nuevo ticket".
5. Consultar el listado en "Tickets".

## Solución de problemas comunes

**Error "Unsupported class file major version XX" o "release version X not
supported" al ejecutar `mvn spring-boot:run`.**
Significa que Maven está usando (o cree que debe usar) una versión de Java
distinta a la 17, casi siempre porque algún editor cambió sin darse cuenta
la propiedad `java.version` o `maven.compiler.release` en `pom.xml`, o
porque quedaron archivos compilados viejos en la carpeta `target/`.
Solución, en este orden:
1. Verifica que en `backend/pom.xml` ambas propiedades digan `17`.
2. Ejecuta `mvn clean spring-boot:run` (el `clean` borra `target/` y fuerza
   a recompilar todo desde cero).
3. Verifica con `java -version` y `mvn -v` que ambos reporten la versión 17.

**El login dice "No fue posible iniciar sesión. Verifica tus credenciales"
pero las credenciales son correctas.**
Ese mismo mensaje aparece también cuando el frontend no logra *conectarse*
al backend (no solo cuando la contraseña está mal). Revisa:
1. Que la terminal del backend siga abierta y sin errores.
2. En el navegador, F12 → pestaña "Network" → intenta iniciar sesión de
   nuevo → revisa el código de estado de la petición a `/api/auth/login`.
   `ERR_CONNECTION_REFUSED` significa que el backend no está corriendo.

**Error de CORS en la consola del navegador.**
Verifica que el frontend se esté abriendo exactamente en
`http://localhost:5173` (no `127.0.0.1:5173`), ya que ese es el único
origen permitido en `SecurityConfig.java`.

## Próximos pasos (fuera de este Sprint)

- HU-05 a HU-11: edición, asignación, cambio de estado, comentarios,
  búsqueda/filtrado y dashboard de estadísticas.
- Migrar `spring.jpa.hibernate.ddl-auto` a un esquema versionado con
  Flyway o Liquibase.
- Cuando aplique, migrar de H2 a PostgreSQL para un entorno de despliegue
  real (ver la nota sobre base de datos, arriba).
- Agregar pruebas automatizadas (JUnit en backend, y de componentes en
  frontend), en coordinación con el rol de QA del equipo.

