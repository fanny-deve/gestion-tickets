# Referencias UX/UI y decisiones de diseño

La nueva capa visual toma patrones públicos de cinco productos, pero no copia marcas, textos ni recursos propietarios:

- **Zendesk:** panel contextual lateral y trabajo centrado en un ticket. [Agent Workspace](https://support.zendesk.com/hc/en-us/articles/4408821259930-About-the-Zendesk-Agent-Workspace/)
- **Freshdesk:** vistas operativas unificadas, colaboración y priorización en el mismo espacio. [Ticketing](https://www.freshworks.com/freshdesk/ticketing/)
- **Jira Service Management:** ciclo de incidentes, categorización, prioridad y timeline operacional. [Incident management](https://www.atlassian.com/software/jira/service-management/features/incident-management)
- **Zoho Desk:** work modes, vistas personalizables y organización por estado/prioridad. [Work modes](https://www.zoho.com/desk/work-modes.html)
- **Help Scout:** conversación compartida, notas/contexto y continuidad de interacciones. [Shared inbox](https://docs.helpscout.com/article/1581-what-is-shared-inbox)

## Traducción a TicketFlow

- Identidad original **Aurora Support**: azul profundo, índigo y violeta suave, con superficies ligeras y estados de alto contraste.
- Sidebar colapsable con estado persistente, navegación por vistas y modo demo visible.
- Lista y Kanban comparten filtros y el mismo repositorio demo; mover una tarjeta cambia realmente el estado y respeta las transiciones.
- Detalle en dos columnas: conversación/timeline a la izquierda y contexto editable a la derecha.
- Motion centralizado en `src/motion.ts`, con `AnimatePresence`, `layout`, stagger y springs.
- `prefers-reduced-motion` reduce transiciones y elimina animaciones repetitivas.
- Configuración demo con intensidad Normal, Alta y Reducida; la opción Reducida y la preferencia del sistema desactivan los efectos no esenciales.
