"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Camera, Save } from "lucide-react"
import { toast } from "sonner"

export default function PerfilPage() {
  const { userData, updateUserData } = useAuth()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    nombre: userData?.nombre || "",
    apellido: userData?.apellido || "",
    telefono: userData?.telefono || "",
    notificaciones: userData?.notificaciones ?? true,
  })

  const handleSave = async () => {
    try {
      await updateUserData({ ...form, notificaciones: form.notificaciones })
      toast.success("Perfil actualizado")
      setEditing(false)
    } catch {
      toast.error("Error al actualizar perfil")
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Mi Perfil</h1>
        <p className="text-muted-foreground">Gestiona tu información personal</p>
      </div>

      <Card>
        <CardHeader className="text-center">
          <div className="relative inline-block">
            <Avatar className="h-24 w-24 mx-auto">
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {userData?.nombre?.[0]}{userData?.apellido?.[0]}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-4">
            <CardTitle>{userData?.nombre} {userData?.apellido}</CardTitle>
            <Badge variant="secondary" className="mt-1 capitalize">{userData?.rol}</Badge>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Información Personal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                disabled={!editing}
              />
            </div>
            <div className="space-y-2">
              <Label>Apellido</Label>
              <Input
                value={form.apellido}
                onChange={(e) => setForm({ ...form, apellido: e.target.value })}
                disabled={!editing}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Correo electrónico</Label>
            <Input value={userData?.email || ""} disabled />
          </div>
          <div className="space-y-2">
            <Label>Teléfono</Label>
            <Input
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              disabled={!editing}
            />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Rol</Label>
            <Input value={userData?.rol || ""} disabled className="capitalize" />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <Label className="text-sm font-medium">Notificaciones</Label>
              <p className="text-xs text-muted-foreground">Recibir alertas de nuevas asignaciones</p>
            </div>
            <Switch
              checked={form.notificaciones}
              onCheckedChange={(v) => setForm({ ...form, notificaciones: v })}
              disabled={!editing}
            />
          </div>
          <div className="flex justify-end gap-2">
            {editing ? (
              <>
                <Button variant="outline" onClick={() => setEditing(false)}>Cancelar</Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4" />
                  Guardar
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditing(true)}>Editar Perfil</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
