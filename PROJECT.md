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
| sonner | - | Toast notifications |

---

## Paleta de Colores

```
#144137 ██  Fondo dark mode / verde muy oscuro
#2A6A47 ██  Secondary / bordes dark mode
#73A243 ██  Primary / acentos principales
#DAE953 ██  Accent / highlights
#EBF5BA ██  Texto foreground dark / fondos light
```

---

## Estructura del Proyecto

```
sids-iglesia/
├── public/
├── src/
│   ├── app/
│   │   ├── (auth)/             # Grupo de rutas de autenticación
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (dashboard)/        # Grupo de rutas protegidas
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── ministerios/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── eventos/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── cronogramas/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── tareas/page.tsx
│   │   │   ├── asistencia/page.tsx
│   │   │   ├── usuarios/page.tsx
│   │   │   ├── reportes/page.tsx
│   │   │   └── perfil/page.tsx
│   │   ├── publico/page.tsx     # Página pública (sin login)
│   │   ├── globals.css          # Estilos globales + tema
│   │   ├── layout.tsx           # Layout raíz
│   │   ├── providers.tsx        # Providers globales
│   │   └── page.tsx             # Redirección inicial
│   ├── components/
│   │   ├── ui/                  # Componentes shadcn/ui
│   │   ├── layout/              # Sidebar, DashboardLayout
│   │   └── auth/                # ProtectedRoute, RoleGuard
│   ├── contexts/
│   │   ├── AuthContext.tsx       # Contexto de autenticación
│   │   └── ThemeContext.tsx      # Contexto de modo oscuro
│   ├── hooks/                   # Hooks personalizados
│   ├── lib/
│   │   ├── firebase.ts          # Configuración Firebase
│   │   ├── firestore.ts         # Helper functions Firestore
│   │   ├── utils.ts             # Utilidades (cn)
│   │   └── constants.ts         # Constantes del sistema
│   └── types/index.ts           # Tipos TypeScript
├── .env.local                   # Variables de entorno (no comitear)
├── .env.local.example           # Template de variables
├── AGENTS.md                    # Instrucciones para la IA
├── PROJECT.md                   # Esta documentación
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## Rutas del Sistema

| Ruta | Acceso | Descripción |
|---|---|---|
| `/` | Público | Redirecciona según auth |
| `/login` | Público | Inicio de sesión |
| `/register` | Público | Registro de usuario |
| `/publico` | Público | Página pública con horarios y eventos |
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

- [x] Autenticación con Firebase Auth
- [x] Roles: Pastor, Líder, Colaborador
- [x] Sidebar responsiva con menú por rol
- [x] Modo oscuro con paleta verde personalizada
- [x] Gestión de ministerios con roles personalizados
- [x] Calendario de eventos con vista mensual/lista
- [x] Grillas de servicio por reunión
- [x] Confirmación de participación
- [x] Gestión de tareas con estados
- [x] Registro de asistencia
- [x] Reportes y estadísticas
- [x] Perfil de usuario
- [x] Página pública informativa
- [x] Diseño responsive (mobile-first)

---

## Próximos Pasos / Roadmap

- [ ] Sincronización completa con Firestore en todas las pantallas
- [ ] Asignación de roles por ministerio
- [ ] Notificaciones push
- [ ] Subida de fotos de perfil a Storage
- [ ] Exportación de reportes a PDF/Excel
- [ ] Eventos recurrentes automáticos
- [ ] Aplicación móvil (API layer)
