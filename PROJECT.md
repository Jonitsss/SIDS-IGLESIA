# SIDS Iglesia - Sistema de Gestión Ministerial

Plataforma moderna para la gestión interna de colaboradores de una iglesia. Permite organizar ministerios, colaboradores, cronogramas de servicios, asignación de tareas y control de asistencia.

---

## Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| Next.js | 16.2.6 (App Router) | Framework frontend |
| React | 19.x | UI Components |
| TypeScript | 5.x | Tipado estático |
| Firebase Auth | - | Autenticación |
| Firestore | - | Base de datos |
| Tailwind CSS | v4 | Estilos utilitarios |
| shadcn/ui | - | Componentes de UI (Radix primitives) |
| date-fns | 4.4.0 | Manejo de fechas |
| lucide-react | - | Iconos |
| framer-motion | 12.40.0 | Animaciones scroll |
| Font Awesome | 4.7 (CDN) | Iconos sociales (fa-facebook, fa-youtube-play, fa-instagram) |
| sonner | - | Toast notifications |
| Public Sans | Google Fonts | Tipografía principal |
| Cormorant Garamond | Google Fonts | Tipografía decorativa (landing page) |

---

## Paleta de Colores

### Modo Oscuro (default)
```
#0a0a0a ██  Fondo principal
#73A243 ██  Primary / acentos verdes
#2A6A47 ██  Secondary / tonalidad más oscura
#DAE953 ██  Accent / highlights brillantes
#EBF5BA ██  Verde muy claro / uso sutil
#C9A84C ██  Dorado (anterior, ya no se usa)
```

### Modo Claro (day mode)
```
#fff9f2 ██  Fondo principal (crema)
#0a0a0a ██  Texto foreground
#666666 ██  Texto muted
#2A6A47 ██  Primary / acentos (más oscuro en light)
#73A243 ██  Accent secundario
```

---

## Estructura del Proyecto

```
sids-iglesia/
├── public/
│   ├── Dra.jpg               # Dra. Magdalena Montenegro
│   ├── Obispo.jpg             # Obispo Edgardo Montenegro
│   ├── Pastor.jpg             # Pastor (en desuso)
│   ├── Musico.jpg             # Músico (en desuso)
│   └── Musicosection.jpg      # Sección músicos (collage)
├── src/
│   ├── app/
│   │   ├── (auth)/             # Grupo de rutas de autenticación
│   │   │   ├── layout.tsx      # Meta robots noindex
│   │   │   ├── login/page.tsx  # Login con normalize de email
│   │   │   └── register/page.tsx
│   │   ├── (dashboard)/        # Grupo de rutas protegidas
│   │   │   ├── layout.tsx      # Meta robots noindex
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── ministerios/    # Listado + detalle con roles
│   │   │   ├── eventos/        # Calendario mensual + lista
│   │   │   ├── cronogramas/    # Grillas de servicio con asignaciones
│   │   │   ├── tareas/         # CRUD con Firestore y notificaciones
│   │   │   ├── asistencia/     # Panel de confirmaciones del Pastor
│   │   │   ├── notificaciones/ # Bandeja de notificaciones con aceptar/rechazar
│   │   │   ├── usuarios/       # CRUD solo pastor, notificaciones toggle
│   │   │   ├── reportes/
│   │   │   └── perfil/         # Editar nombre, teléfono, notificaciones
│   │   ├── publico/page.tsx    # Redirecciona a /
│   │   ├── globals.css         # Tema Tokens + dark mode + radial gradients
│   │   ├── layout.tsx          # Root layout (Public Sans, FA, inline theme script)
│   │   ├── providers.tsx       # Providers globales
│   │   └── page.tsx            # Landing page completa
│   ├── components/
│   │   ├── ui/                 # shadcn/ui (Button, Card, Input, Switch, etc.)
│   │   ├── layout/             # Sidebar (menú por rol), DashboardLayout
│   │   └── auth/               # ProtectedRoute, RoleGuard
│   ├── contexts/
│   │   ├── AuthContext.tsx      # Firebase Auth + fetchUserData con authUid fallback
│   │   └── ThemeContext.tsx     # Dark/Light mode toggle
│   ├── hooks/
│   │   ├── useEventos.ts       # Fetch + mounted guard + refreshKey
│   │   ├── useCronogramas.ts
│   │   ├── useMinisterios.ts
│   │   ├── useTareas.ts        # Ordenamiento en memoria
│   │   └── useNotificaciones.ts# Query por usuarioId, ordenamiento en memoria
│   ├── lib/
│   │   ├── firebase.ts         # Firebase lazy init (SSR-safe)
│   │   ├── firestore.ts        # Helpers con Timestamp→Date, id correcto
│   │   ├── utils.ts            # cn() utility
│   │   └── constants.ts        # Constantes del sistema
│   └── types/index.ts          # Tipos TypeScript (Usuario, Evento, GrillaServicio, etc.)
├── .env.local                  # Variables de entorno (no comitear)
├── .env.local.example
├── AGENTS.md
├── PROJECT.md
└── next.config.ts
```

---

## Rutas del Sistema

| Ruta | Acceso | Descripción |
|---|---|---|
| `/` | Público | Landing page (SANTA IGLESIA DEL SEÑOR, Quiénes Somos, Obispo, Músicos+Horarios, Mapa) |
| `/login` | Público | Inicio de sesión (normaliza email a minúscula) |
| `/register` | Público | Registro con vinculación de pre-perfil por email case-insensitive |
| `/publico` | Público | Redirecciona a `/` |
| `/dashboard` | Auth | Dashboard según rol |
| `/ministerios` | Pastor/Líder | Gestión de ministerios (solo pastor elimina) |
| `/ministerios/[id]` | Pastor/Líder | Detalle con roles editables |
| `/eventos` | Auth | Calendario mensual + lista (solo pastor elimina) |
| `/eventos/[id]` | Auth | Detalle del evento |
| `/cronogramas` | Auth | Grillas de servicio (solo pastor elimina) |
| `/cronogramas/[id]` | Auth | Asignación de roles con filtro por ministerio, estado Pendiente/Confirmado/Rechazado, notificaciones automáticas |
| `/tareas` | Auth | CRUD en Firestore con notificaciones al asignar |
| `/asistencia` | Pastor | Panel de confirmaciones: muestra grillas con estados de asignación |
| `/notificaciones` | Auth | Bandeja de notificaciones con Aceptar/Rechazar; notifica al pastor al responder |
| `/usuarios` | Pastor | CRUD solo pastor, toggle de notificaciones, ministerios con badges |
| `/reportes` | Pastor/Líder | Estadísticas |
| `/perfil` | Auth | Editar nombre, teléfono, toggle de notificaciones |

---

## Roles y Permisos

### Pastor
- Acceso total al sistema
- Gestionar usuarios (crear, editar, eliminar)
- Crear y eliminar ministerios, eventos, cronogramas, tareas
- Asignar roles en grillas de servicio
- Ver panel de confirmaciones en /asistencia
- Recibir notificaciones cuando alguien confirma/rechaza una asignación

### Líder de Ministerio
- Ver ministerios, eventos, cronogramas, tareas
- NO puede eliminar ministerios, eventos, cronogramas (solo pastor)
- Ver panel de asistencia
- Gestionar sus notificaciones

### Colaborador
- Ver sus asignaciones y cronogramas
- Confirmar/rechazar asignaciones desde /notificaciones
- Ver eventos y tareas asignadas
- Actualizar sus datos personales y preferencia de notificaciones

---

## Colecciones Firestore

### `usuarios`
| Campo | Tipo | Descripción |
|---|---|---|
| id | string | UID de Firebase Auth (o auto-generado para pre-perfiles) |
| email | string | Correo electrónico (normalizado a minúscula) |
| nombre | string | Nombre |
| apellido | string | Apellido |
| telefono | string | Teléfono |
| rol | string | pastor / lider / colaborador |
| ministerioIds | string[] | IDs de ministerios |
| fotoURL | string | URL de foto de perfil |
| authUid | string | Firebase Auth UID (se vincula al registrarse) |
| notificaciones | boolean | Preferencia de notificaciones |
| activo | boolean | Estado del usuario |
| createdAt | timestamp | Fecha de creación |
| updatedAt | timestamp | Última actualización |

### `ministerios`
| Campo | Tipo | Descripción |
|---|---|---|
| id | string | Auto-generado |
| nombre | string | Nombre del ministerio |
| descripcion | string | Descripción |
| liderId | string | ID del líder asignado |
| roles | string[] | Roles disponibles |
| color | string | Color del ministerio |
| icono | string | Nombre del ícono |
| activo | boolean | Estado |
| createdAt | timestamp | Fecha de creación |

### `eventos`
| Campo | Tipo | Descripción |
|---|---|---|
| id | string | Auto-generado |
| titulo | string | Nombre del evento |
| descripcion | string | Descripción |
| fecha | timestamp | Fecha del evento |
| horaInicio | string | HH:mm |
| horaFin | string | HH:mm |
| tipo | string | reunion_general / ensayo / jovenes / escuela_biblica / evento_especial |
| recurrencia | string | semanal / quincenal / mensual / unico |
| esRecurrente | boolean | Si es evento recurrente |
| suspendido | boolean | Si está suspendido |
| ubicacion | string | Lugar del evento |
| ministerioIds | string[] | Ministerios involucrados |
| creadoPor | string | ID del creador |
| createdAt | timestamp | Fecha de creación |

### `tareas`
| Campo | Tipo | Descripción |
|---|---|---|
| id | string | Auto-generado |
| titulo | string | Título de la tarea |
| descripcion | string | Descripción |
| responsableId | string | ID del responsable (Firestore doc ID) |
| ministerioId | string | ID del ministerio |
| eventoId | string | ID del evento asociado |
| fechaLimite | timestamp | Fecha límite |
| estado | string | pendiente / en_progreso / completada |
| creadoPor | string | ID del creador |
| createdAt | timestamp | Fecha de creación |
| updatedAt | timestamp | Última actualización |

Nota: al crear una tarea con responsableId, se genera automáticamente una notificación al usuario asignado.

### `asistencia`
| Campo | Tipo | Descripción |
|---|---|---|
| id | string | Auto-generado |
| eventoId | string | ID del evento |
| usuarioId | string | ID del usuario |
| estado | string | presente / ausente / justificado |
| justificacion | string | Motivo de ausencia |
| fecha | timestamp | Fecha del registro |
| registradoPor | string | ID de quien registró |
| createdAt | timestamp | Fecha de creación |

### `notificaciones`
| Campo | Tipo | Descripción |
|---|---|---|
| id | string | Auto-generado |
| usuarioId | string | ID del destinatario |
| titulo | string | Título de la notificación |
| mensaje | string | Contenido |
| leido | boolean | Estado de lectura |
| tipo | string | asignacion / tarea / evento / confirmacion |
| referenciaId | string | ID del recurso relacionado |
| createdAt | timestamp | Fecha de creación |

---

## Requisitos de Instalación

1. Node.js 18+ (v24 recomendada)
2. Cuenta de Firebase
3. Proyecto de Firebase con:
   - Authentication (Email/Password habilitado)
   - Firestore Database creado

---

## Configuración Local

```bash
# 1. Clonar el repositorio
git clone <repo-url> sids-iglesia
cd sids-iglesia

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local con las credenciales de Firebase

# 4. Iniciar desarrollo
npm run dev
```

---

## Comandos Disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run start` | Inicia servidor de producción |
| `npm run lint` | Ejecuta linter |

---

## Guía de Inicio Rápido

1. **Registrar primer usuario** desde `/register`
2. **Cambiar rol a pastor** en Firebase Console → Firestore → colección `usuarios` → editar campo `rol` a `"pastor"`
3. **Crear ministerios** desde `/ministerios`
4. **Crear usuarios** y asignarlos a ministerios
5. **Crear eventos** desde `/eventos`
6. **Asignar grillas de servicio** desde `/cronogramas`
7. **Crear tareas** desde `/tareas`
8. **Registrar asistencia** desde `/asistencia`

---

## Características Principales

- [x] Landing page minimalista con modo oscuro/claro
- [x] Fondo crema #fff9f2 en modo claro, oscuro con radial-gradients verdes
- [x] Header "SANTA IGLESIA DEL SEÑOR" con Cormorant Garamond (#144137)
- [x] Sección full-width (edge-to-edge) para collage + horarios
- [x] Mapa de Google Maps con ubicación
- [x] Nav social con Facebook, YouTube, Instagram (Font Awesome)
- [x] Switch día/noche con ThemeContext
- [x] Autenticación con Firebase Auth (Email/Password)
- [x] Roles: Pastor, Líder, Colaborador
- [x] Sidebar responsiva con menú por rol
- [x] Gestión de ministerios con roles personalizados
- [x] Calendario de eventos (vista mes + lista)
- [x] Cronogramas/grillas con asignación por ministerio y rol
- [x] Estados de asignación: Pendiente → Confirmado → Rechazado
- [x] Tareas conectadas a Firestore con notificaciones
- [x] Sistema de notificaciones con aceptar/rechazar
- [x] Panel de Pastor en /asistencia con estados de confirmación
- [x] Pre-perfiles de usuario con vinculación al registrarse
- [x] Normalización de emails (case-insensitive)
- [x] Permisos por rol (solo pastor elimina)
- [x] Perfil de usuario con toggle de notificaciones
- [x] Diseño responsive (mobile-first)

---

## Próximos Pasos / Roadmap

- [ ] Subida de fotos a Storage
- [ ] Exportación de reportes a PDF/Excel
- [ ] Eventos recurrentes automáticos
- [ ] Notificaciones push

---

## Notas Técnicas

### Landing page
- Sin links "Acceso" visibles en la UI, solo `/login` por URL directa
- Sin bordes/blur en secciones públicas (solo en dashboard)
- `Public Sans` cargada via Google Fonts `<link>` en layout.tsx
- `Cormorant Garamond` cargada como segunda fuente para el header decorativo
- `Font Awesome 4.7` cargada via CDN en layout.tsx
- `framer-motion` para `motion.section` con `initial/whileInView` (fade-in-up)
- Imágenes con `quality={100}` para máxima calidad
- Sección de horarios es full-width (edge-to-edge) sin contenedor max-w-5xl
- Las demas secciones dentro de contenedor `max-w-5xl`
- Header "SANTA IGLESIA DEL SEÑOR" con `Cormorant Garamond`, color #144137
- Fondo light mode `#fff9f2` (crema), dark mode mantiene `bg-background`

### Theme (globals.css)
- `@theme` define colores light mode + dark mode via `.dark` class
- Fondo del body con `radial-gradient` para destellos verdes
- `bg-card` en dark usa `backdrop-filter: blur(20px)` solo en dashboard
- Inline script en layout.tsx evita flash de tema incorrecto

### Firebase
- `auth` y `db` se inicializan lazy (null-safe para SSR)
- Toda función de Firebase guarda con `if (!auth || !db) return`

### Firestore
- `obtenerDocumentos` y `obtenerDocumento` convierten `fecha`, `fechaLimite`, `fechaIngreso`, `createdAt`, `updatedAt` de Timestamp a Date mediante `.toDate()`
- El helper `crearDocumento` usa `addDoc` (auto-ID) y agrega `createdAt`/`updatedAt` con `serverTimestamp()`
- El helper `actualizarDocumento` usa `updateDoc` con `{merge: true}` a nivel de Firestore
- Los IDs de documento siempre toman precedencia sobre campos `id` almacenados en el documento

### Autenticación (AuthContext)
- `fetchUserData` busca el documento del usuario en este orden: (1) `doc(db, "usuarios", uid)`, (2) `where("authUid")`, (3) `where("email")`. Si el email existe, lo vincula automáticamente.
- `register` busca un pre-perfil con email case-insensitive; si existe lo vincula seteando `authUid`, si no crea un doc nuevo en `usuarios/{uid}`.
- `updateUserData` usa el mismo patrón de búsqueda por uid → authUid.

### Notificaciones
- Se crean al guardar asignaciones nuevas en cronogramas y al crear tareas con responsable
- Se consultan solo con `where("usuarioId")` y se ordenan en memoria para evitar índices compuestos de Firebase
- Al aceptar/rechazar desde `/notificaciones`, se notifica a todos los usuarios con rol "pastor"
- El sidebar muestra el enlace sin badge ni consulta a Firestore para no bloquear la navegación

### Permisos de eliminación
- Solo el rol "pastor" puede eliminar eventos, ministerios, cronogramas y tareas
- Los botones de eliminar se ocultan condicionalmente con `{esPastor && <Trash2/>}`

### Duplicación de usuarios
- Un mismo email puede tener dos documentos en `usuarios` (uno con `authUid` y otro sin)
- Las listas de usuarios en dropdowns se deduplican por email, priorizando el documento con `authUid`
- Las notificaciones se envían usando `authUid` cuando está disponible
