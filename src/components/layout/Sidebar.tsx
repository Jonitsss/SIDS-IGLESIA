"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  Users,
  Calendar,
  ClipboardList,
  CheckSquare,
  BarChart3,
  Church,
  UserCircle,
  LogOut,
  Sun,
  Moon,
  X,
} from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const menuItems = {
  pastor: [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/ministerios", icon: Church, label: "Ministerios" },
    { href: "/eventos", icon: Calendar, label: "Eventos" },
    { href: "/cronogramas", icon: ClipboardList, label: "Cronogramas" },
    { href: "/tareas", icon: CheckSquare, label: "Tareas" },
    { href: "/asistencia", icon: Users, label: "Asistencia" },
    { href: "/usuarios", icon: UserCircle, label: "Usuarios" },
    { href: "/reportes", icon: BarChart3, label: "Reportes" },
  ],
  lider: [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/ministerios", icon: Church, label: "Mi Ministerio" },
    { href: "/eventos", icon: Calendar, label: "Eventos" },
    { href: "/cronogramas", icon: ClipboardList, label: "Cronogramas" },
    { href: "/tareas", icon: CheckSquare, label: "Tareas" },
    { href: "/asistencia", icon: Users, label: "Asistencia" },
  ],
  colaborador: [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/cronogramas", icon: ClipboardList, label: "Mis Asignaciones" },
    { href: "/tareas", icon: CheckSquare, label: "Mis Tareas" },
    { href: "/eventos", icon: Calendar, label: "Eventos" },
    { href: "/perfil", icon: UserCircle, label: "Mi Perfil" },
  ],
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { userData, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const role = userData?.rol || "colaborador"
  const items = menuItems[role] || menuItems.colaborador

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 border-r bg-card/90 backdrop-blur-xl transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg">
            <Church className="h-6 w-6 text-primary" />
            SIDS Iglesia
          </Link>
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 h-[calc(100vh-8rem)]">
          <nav className="p-2 space-y-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </ScrollArea>

        <div className="border-t p-3 space-y-2">
          <div className="flex items-center gap-3 px-3 py-2 text-sm">
            <UserCircle className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="truncate font-medium">{userData?.nombre} {userData?.apellido}</p>
              <p className="text-xs text-muted-foreground capitalize">{userData?.rol}</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="flex-1">
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={logout} className="flex-1 text-destructive">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
