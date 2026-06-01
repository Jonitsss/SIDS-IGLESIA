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
#FFFFFF ██  Fondo principal
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
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (dashboard)/        # Grupo de rutas protegidas
│   │   │   ├── layout.tsx      # Meta robots noindex
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── ministerios/
│   │   │   ├── eventos/
│   │   │   ├── cronogramas/
│   │   │   ├── tareas/
│   │   │   ├── asistencia/
│   │   │   ├── usuarios/
│   │   │   ├── reportes/
│   │   │   └── perfil/
│   │   ├── publico/page.tsx    # Redirecciona a /
│   │   ├── globals.css          # Tema Tokens + dark mode + radial gradients
│   │   ├── layout.tsx           # Root layout (Public Sans, FA, inline theme script)
│   │   ├── providers.tsx        # Providers globales
│   │   └── page.tsx             # Landing page completa
│   ├── components/
│   │   ├── ui/                  # shadcn/ui (Button, Card, Input, etc.)
│   │   ├── layout/              # Sidebar, DashboardLayout
│   │   └── landing/             # Componentes antiguos (en desuso)
│   ├── contexts/
│   │   ├── AuthContext.tsx       # Firebase Auth context
│   │   └── ThemeContext.tsx      # Dark/Light mode toggle
│   ├── hooks/
│   ├── lib/
│   │   ├── firebase.ts          # Firebase lazy init (SSR-safe)
│   │   ├── firestore.ts         # Firestore helpers
│   │   ├── utils.ts             # cn() utility
│   │   └── constants.ts         # Constantes del sistema
│   └── types/index.ts           # Tipos TypeScript
├── .env.local                   # Variables de entorno (no comitear)
├── .env.local.example
├── AGENTS.md
├── PROJECT.md
└── next.config.ts
```

---

## Rutas del Sistema

| Ruta | Acceso | Descripción |
|---|---|---|
| `/` | Público | Landing page (Quiénes Somos, Obispo, Músicos+Horarios, Mapa) |
| `/login` | Público | Inicio de sesión (sin link visible en landing) |
| `/register` | Público | Registro de usuario |
| `/publico` | Público | Redirecciona a `/` |
| `/dashboard` | Auth | Dashboard según rol |
| `/ministerios` | Pastor/Líder | Gestión de ministerios |
| `/ministerios/[id]` | Pastor/Líder | Detalle del ministerio |
| `/eventos` | Auth | Calendario de eventos |
| `/eventos/[id]` | Auth | Detalle del evento |
| `/cronogramas` | Auth | Grillas de servicio |
| `/cronogramas/[id]` | Auth | Detalle de grilla |
| `/tareas` | Auth | Gestión de tareas |
| `/asistencia` | Pastor/Líder | Registro de asistencia |
| `/usuarios` | Pastor | Gestión de usuarios |
| `/reportes` | Pastor/Líder | Estadísticas |
| `/perfil` | Auth | Perfil del usuario |

---

## Roles y Permisos

### Pastor
- Acceso total al sistema
- Gestionar usuarios, ministerios, eventos
- Crear cronogramas y asignar responsables
- Ver reportes y estadísticas de asistencia

### Líder de Ministerio
- Gestionar miembros de su ministerio
- Crear y editar tareas
- Registrar asistencia
- Ver cronogramas

### Colaborador
- Ver sus asignaciones
- Confirmar/rechazar asistencia
- Ver cronogramas y tareas asignadas
- Actualizar sus datos personales

---

## Colecciones Firestore

### `usuarios`
| Campo | Tipo | Descripción |
|---|---|---|
| id | string | UID de Firebase Auth |
| email | string | Correo electrónico |
| nombre | string | Nombre |
| apellido | string | Apellido |
| telefono | string | Teléfono |
| rol | string | pastor / lider / colaborador |
| ministerioIds | string[] | IDs de ministerios |
| fotoURL | string | URL de foto de perfil |
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
| responsableId | string | ID del responsable |
| ministerioId | string | ID del ministerio |
| eventoId | string | ID del evento asociado |
| fechaLimite | timestamp | Fecha límite |
| estado | string | pendiente / en_progreso / completada |
| creadoPor | string | ID del creador |
| createdAt | timestamp | Fecha de creación |
| updatedAt | timestamp | Última actualización |

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
- [x] Fondo con radial-gradients verdes y parallax
- [x] Sección full-width (edge-to-edge) para collage + horarios
- [x] Mapa de Google Maps con ubicación
- [x] Nav social con Facebook, YouTube, Instagram (Font Awesome)
- [x] Switch día/noche con ThemeContext
- [x] Autenticación con Firebase Auth
- [x] Roles: Pastor, Líder, Colaborador
- [x] Sidebar responsiva con menú por rol
- [x] Gestión de ministerios, eventos, tareas, asistencia
- [x] Perfil de usuario
- [x] Diseño responsive (mobile-first)

---

## Próximos Pasos / Roadmap

- [ ] Sincronización completa con Firestore en todas las pantallas
- [ ] Notificaciones push
- [ ] Subida de fotos a Storage
- [ ] Exportación de reportes a PDF/Excel
- [ ] Eventos recurrentes automáticos

---

## Notas Técnicas

### Landing page
- Sin links "Acceso" visibles en la UI, solo `/login` por URL directa
- Sin bordes/blur en secciones públicas (solo en dashboard)
- `Public Sans` cargada via Google Fonts `<link>` en layout.tsx
- `Font Awesome 4.7` cargada via CDN en layout.tsx
- `framer-motion` para `motion.section` con `initial/whileInView` (fade-in-up)
- Imágenes con `quality={100}` para máxima calidad
- Sección de horarios es full-width (edge-to-edge) sin contenedor max-w-5xl
- Las demas secciones dentro de contenedor `max-w-5xl`

### Theme (globals.css)
- `@theme` define colores light mode + dark mode via `.dark` class
- Fondo del body con `radial-gradient` para destellos verdes
- `bg-card` en dark usa `backdrop-filter: blur(20px)` solo en dashboard
- Inline script en layout.tsx evita flash de tema incorrecto

### Firebase
- `auth` y `db` se inicializan lazy (null-safe para SSR)
- Toda función de Firebase guarda con `if (!auth || !db) return`
