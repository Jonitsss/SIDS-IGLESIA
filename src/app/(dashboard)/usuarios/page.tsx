"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Trash2, MoreHorizontal } from "lucide-react"
import { Usuario } from "@/types"
import { obtenerDocumentos, eliminarDocumento } from "@/lib/firestore"
import { toast } from "sonner"

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await obtenerDocumentos<Usuario>("usuarios")
        setUsuarios(data)
      } catch {
        // Silently fail - Firestore might not be ready
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const filtered = usuarios.filter(
    (u) =>
      `${u.nombre} ${u.apellido}`.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id: string, nombre: string) => {
    if (!confirm(`¿Eliminar el usuario "${nombre}"?`)) return
    try {
      await eliminarDocumento("usuarios", id)
      setUsuarios(usuarios.filter((u) => u.id !== id))
      toast.success("Usuario eliminado")
    } catch {
      toast.error("Error al eliminar usuario")
    }
  }

  const rolBadge: Record<string, "default" | "secondary" | "outline"> = {
    pastor: "default",
    lider: "secondary",
    colaborador: "outline",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Usuarios</h1>
          <p className="text-muted-foreground">Gestiona los colaboradores del sistema</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar usuarios..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {loading ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">Cargando...</CardContent>
        </Card>
      ) : usuarios.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium mb-1">No hay usuarios</p>
            <p className="text-sm">Los usuarios registrados aparecerán aquí</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filtered.map((u) => (
                <div key={u.id} className="flex items-center gap-3 p-4 group">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {u.nombre?.[0]}{u.apellido?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{u.nombre} {u.apellido}</p>
                    <p className="text-sm text-muted-foreground truncate">{u.email}</p>
                  </div>
                  <Badge variant={rolBadge[u.rol]} className="capitalize">{u.rol}</Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 text-destructive"
                    onClick={() => handleDelete(u.id, `${u.nombre} ${u.apellido}`)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
