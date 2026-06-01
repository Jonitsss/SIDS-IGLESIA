"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Plus, CheckCircle2, Circle, Loader2, Trash2 } from "lucide-react"
import { toast } from "sonner"

type EstadoTarea = "pendiente" | "en_progreso" | "completada"

interface TareaItem {
  id: string
  titulo: string
  descripcion: string
  responsable: string
  fechaLimite: string
  estado: EstadoTarea
  ministerio: string
}

export default function TareasPage() {
  const [tareas, setTareas] = useState<TareaItem[]>([])
  const [filtro, setFiltro] = useState<EstadoTarea | "todas">("todas")
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ titulo: "", descripcion: "", responsable: "", fechaLimite: "", ministerio: "" })

  const filtered = filtro === "todas" ? tareas : tareas.filter((t) => t.estado === filtro)

  const handleCreate = () => {
    if (!form.titulo) return
    const nueva: TareaItem = {
      id: String(Date.now()),
      ...form,
      estado: "pendiente",
    }
    setTareas([nueva, ...tareas])
    toast.success("Tarea creada exitosamente")
    setOpen(false)
    setForm({ titulo: "", descripcion: "", responsable: "", fechaLimite: "", ministerio: "" })
  }

  const handleDelete = (id: string, titulo: string) => {
    if (!confirm(`¿Eliminar la tarea "${titulo}"?`)) return
    setTareas(tareas.filter((t) => t.id !== id))
    toast.success("Tarea eliminada")
  }

  const toggleEstado = (id: string) => {
    setTareas(tareas.map((t) => {
      if (t.id !== id) return t
      const next: Record<EstadoTarea, EstadoTarea> = { pendiente: "en_progreso", en_progreso: "completada", completada: "pendiente" }
      return { ...t, estado: next[t.estado] }
    }))
  }

  const estadoBadge: Record<EstadoTarea, "secondary" | "warning" | "success"> = {
    pendiente: "secondary",
    en_progreso: "warning",
    completada: "success",
  }

  const estadoLabel: Record<EstadoTarea, string> = {
    pendiente: "Pendiente",
    en_progreso: "En Progreso",
    completada: "Completada",
  }

  const estadoIcon: Record<EstadoTarea, any> = {
    pendiente: Circle,
    en_progreso: Loader2,
    completada: CheckCircle2,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Tareas</h1>
          <p className="text-muted-foreground">Gestiona las tareas de cada ministerio</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" />
              Nueva Tarea
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Tarea</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Descripción</Label>
                <Textarea value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Responsable</Label>
                <Input value={form.responsable} onChange={(e) => setForm({ ...form, responsable: e.target.value })} placeholder="Nombre del responsable" />
              </div>
              <div className="space-y-2">
                <Label>Ministerio</Label>
                <Select value={form.ministerio} onValueChange={(v) => setForm({ ...form, ministerio: v })}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Diáconos">Diáconos</SelectItem>
                    <SelectItem value="Músicos">Músicos</SelectItem>
                    <SelectItem value="Sonido">Sonido</SelectItem>
                    <SelectItem value="Multimedia">Multimedia</SelectItem>
                    <SelectItem value="Escuela Bíblica">Escuela Bíblica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Fecha Límite</Label>
                <Input type="date" value={form.fechaLimite} onChange={(e) => setForm({ ...form, fechaLimite: e.target.value })} />
              </div>
              <Button onClick={handleCreate} className="w-full">Crear Tarea</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(["todas", "pendiente", "en_progreso", "completada"] as const).map((f) => (
          <Button key={f} variant={filtro === f ? "default" : "outline"} size="sm" onClick={() => setFiltro(f)}>
            {f === "todas" ? "Todas" : estadoLabel[f]}
          </Button>
        ))}
      </div>

      {tareas.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium mb-1">No hay tareas</p>
            <p className="text-sm">Crea tu primera tarea para empezar</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tarea) => {
            const Icon = estadoIcon[tarea.estado]
            return (
              <Card key={tarea.id} className="group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2 flex-1 min-w-0" onClick={() => toggleEstado(tarea.id)}>
                      <Icon className={`h-5 w-5 mt-0.5 shrink-0 cursor-pointer ${tarea.estado === "completada" ? "text-emerald-500" : tarea.estado === "en_progreso" ? "text-amber-500 animate-spin" : "text-muted-foreground"}`} />
                      <div className="min-w-0">
                        <CardTitle className="text-sm cursor-pointer hover:text-primary transition-colors">{tarea.titulo}</CardTitle>
                        <p className="text-xs text-muted-foreground truncate">{tarea.descripcion}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 opacity-0 group-hover:opacity-100 text-destructive h-6 w-6"
                      onClick={() => handleDelete(tarea.id, tarea.titulo)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-xs">
                    <div className="space-y-1">
                      <p className="text-muted-foreground">{tarea.responsable}</p>
                      <p className="text-muted-foreground">Vence: {tarea.fechaLimite}</p>
                    </div>
                    <Badge variant={estadoBadge[tarea.estado]}>{estadoLabel[tarea.estado]}</Badge>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
