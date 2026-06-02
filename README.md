# SIDS - Sistema de Gestión Ministerial

Plataforma moderna para la gestión interna de colaboradores de una iglesia. Permite organizar ministerios, colaboradores, cronogramas de servicios, asignación de tareas y control de asistencia.

---

## Funcionalidades

### Landing Page
- Página pública con información de la iglesia: presentación de la pastora, el obispo, sección de músicos con horarios, mapa de ubicación y footer con redes sociales
- Modo claro por defecto con switch a modo oscuro
- Diseño responsive con animaciones suaves (framer-motion), zoom deshabilitado en mobile
- Sin enlaces de acceso visibles — solo `/login` por URL directa

### Autenticación
- Registro e inicio de sesión con Firebase Auth (Email/Password)
- Normalización de emails (case-insensitive)
- Vinculación automática de pre-perfiles al registrarse
- Roles: **Pastor**, **Líder de Ministerio**, **Colaborador**
- Las páginas de login y register redirigen automáticamente al dashboard si ya hay sesión activa

### Dashboard Protegido
- Panel principal según el rol del usuario
- Sidebar fija anclada a la izquierda con avatar del usuario (foto o iniciales), solo el contenido derecho scrollea
- Badge rojo con contador de notificaciones no leídas en el sidebar
- Hover effects consistentes: logo SIDS, avatar, nombre y rol heredan colores de hover como los items del menú
- Perfil de usuario editable (nombre, teléfono, foto con canvas compression a base64, preferencia de notificaciones)

### Gestión de Ministerios
- CRUD completo de ministerios con roles personalizados (solo pastor crea/elimina)
- Asignación de líderes y colaboradores a ministerios
- Notificación automática al ser asignado a un ministerio
- Eliminación en cascada: borrar un ministerio elimina sus notificaciones y referencias
- Solo el pastor puede eliminar ministerios

### Eventos
- Calendario con vista mensual y lista de eventos
- Tipos: reunión general, ensayo, jóvenes, escuela bíblica, evento especial
- Recurrencia: semanal, quincenal, mensual o único
- Solo el pastor puede eliminar eventos

### Cronogramas (Grillas de Servicio)
- Creación de grillas con fecha, ministerio y roles asignados
- Asignación de colaboradores con estados: **Pendiente → Confirmado → Rechazado**
- Filtro por ministerio
- Notificaciones automáticas al asignar un colaborador
- Eliminación en cascada: borrar un evento elimina sus cronogramas y notificaciones
- El pastor puede eliminar cronogramas

### Tareas
- CRUD completo de tareas conectado a Firestore
- Asignación de responsables con ministerio y evento asociado
- Estados: pendiente, en progreso, completada
- Notificaciones automáticas al asignar una tarea
- Solo el pastor puede crear y eliminar tareas

### Asistencia
- Panel del pastor con estados de confirmación de las grillas
- Registro de asistencia: presente, ausente, justificado

### Notificaciones
- Bandeja de notificaciones con acción de **Aceptar/Rechazar** asignaciones
- Notificación al pastor cuando un colaborador confirma o rechaza
- Marcado de lectura

### Usuarios
- CRUD exclusivo del pastor
- Toggle de notificaciones por usuario
- Ministerios mostrados con badges de colores

---

## Stack Tecnológico

| Tecnología | Uso |
|---|---|
| **Next.js 16** (App Router) | Framework frontend |
| **React 19** | UI Components |
| **TypeScript** | Tipado estático |
| **Firebase Auth** | Autenticación |
| **Firestore** | Base de datos |
| **Tailwind CSS v4** | Estilos utilitarios |
| **shadcn/ui** | Componentes de UI (Radix primitives) |
| **framer-motion** | Animaciones |
| **date-fns** | Manejo de fechas |
| **sonner** | Toast notifications |
| **lucide-react** | Iconos dashboard |
| **Font Awesome 4.7** | Iconos sociales landing page |

## Estructura del Proyecto

```
sids-iglesia/
├── public/                  # Imágenes estáticas
├── src/
│   ├── app/
│   │   ├── (auth)/          # Login y registro
│   │   ├── (dashboard)/     # Panel protegido (ministerios, eventos,
│   │   │                      cronogramas, tareas, asistencia,
│   │   │                      notificaciones, usuarios, reportes, perfil)
│   │   ├── globals.css      # Tema tokens, dark mode, radial gradients
│   │   ├── layout.tsx       # Root layout
│   │   ├── providers.tsx    # Providers globales
│   │   └── page.tsx         # Landing page
│   ├── components/
│   │   ├── ui/              # shadcn/ui (Button, Card, Input, Switch, etc.)
│   │   ├── layout/          # Sidebar, DashboardLayout
│   │   └── auth/            # ProtectedRoute, RoleGuard
│   ├── contexts/
│   │   ├── AuthContext.tsx   # Firebase Auth + fetchUserData
│   │   └── ThemeContext.tsx  # Dark/Light mode
│   ├── hooks/               # Custom hooks (useEventos, useTareas, etc.)
│   ├── lib/
│   │   ├── firebase.ts      # Inicialización lazy SSR-safe
│   │   ├── firestore.ts     # Helpers Firestore con conversión Timestamp→Date
│   │   ├── utils.ts         # Utilidades
│   │   └── constants.ts     # Constantes del sistema
│   └── types/index.ts       # Tipos TypeScript
├── .env.local.example       # Template de variables de entorno
├── AGENTS.md                # Instrucciones para AI coding agents
└── PROJECT.md               # Documentación técnica completa
```

## Roles y Permisos

| Rol | Crear | Eliminar | Acceso |
|---|---|---|---|
| **Pastor** | ✅ Todo | ✅ Todo | Acceso total al sistema |
| **Líder** | ✅ Eventos, Cronogramas | ❌ | Visualiza todo. Crea eventos y grillas. Ve asistencia. |
| **Colaborador** | ❌ | ❌ | Solo visualiza asignaciones, tareas, eventos. Confirma/rechaza desde notificaciones. Edita su perfil. |

## Requisitos

- Node.js 18+ (v24 recomendada)
- Cuenta de Firebase con Authentication (Email/Password) y Firestore Database

## Instalación

```bash
# Clonar
git clone <repo-url> sids-iglesia
cd sids-iglesia

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local con las credenciales de Firebase

# Iniciar desarrollo
npm run dev
```

## Comandos

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilar para producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | Ejecutar linter |

## Guía Rápida

1. Registrar primer usuario desde `/register`
2. Cambiar rol a **pastor** en Firebase Console → Firestore → colección `usuarios`
3. Crear ministerios desde `/ministerios`
4. Crear usuarios y asignarlos a ministerios
5. Crear eventos desde `/eventos`
6. Crear grillas de servicio desde `/cronogramas`
7. Asignar tareas desde `/tareas`
8. Registrar asistencia desde `/asistencia`
