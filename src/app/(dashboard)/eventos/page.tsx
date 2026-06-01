"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { useEventos } from "@/hooks/useEventos"
import { Plus, ChevronLeft, ChevronRight, Trash2, CalendarDays } from "lucide-react"
import { DIAS_SEMANA } from "@/lib/constants"
import { crearDocumento, eliminarDocumento } from "@/lib/firestore"
import { Evento } from "@/types"
import { toast } from "sonner"
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameMonth, isSameDay } from "date-fns"
import { es } from "date-fns/locale"


type ViewMode = "month" | "list"

export default function EventosPage() {
  const { eventos, loading } = useEventos()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<ViewMode>("month")
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    titulo: "",
    fecha: new Date(),
    horaInicio: "20:00",
    tipo: "reunion_general" as Evento["tipo"],
  })

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calStart = startOfWeek(monthStart)
  const calEnd = endOfWeek(monthEnd)

  const days: Date[] = []
  let day = calStart
  while (day <= calEnd) {
    days.push(day)
    day = addDays(day, 1)
  }

  const eventosDelMes = eventos.filter((e) => isSameMonth(e.fecha, currentDate))

  const prevMonth = () => setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))
  const nextMonth = () => setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))

  const handleCreate = async () => {
    if (!form.titulo) return
    try {
      await crearDocumento<Evento>("eventos", {
        ...form,
        recurrencia: "unico",
        esRecurrente: false,
        suspendido: false,
        ubicacion: "",
        ministerioIds: [],
        creadoPor: "",
      })
      toast.success("Evento creado exitosamente")
      setOpen(false)
      setForm({ titulo: "", fecha: new Date(), horaInicio: "20:00", tipo: "reunion_general" })
    } catch {
      toast.error("Error al crear evento")
    }
  }

  const handleDelete = async (id: string, titulo: string) => {
    if (!confirm(`¿Eliminar el evento "${titulo}"?`)) return
    try {
      await eliminarDocumento("eventos", id)
      toast.success("Evento eliminado")
    } catch {
      toast.error("Error al eliminar evento")
    }
  }

  const tipoBadge = (tipo: string) => {
    const variants: Record<string, "default" | "secondary" | "outline" | "warning"> = {
      reunion_general: "default",
      ensayo: "secondary",
      jovenes: "outline",
      evento_especial: "warning",
    }
    return variants[tipo] || "default"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Eventos</h1>
          <p className="text-muted-foreground">Calendario de reuniones y eventos</p>
        </div>
        <div className="flex gap-2">
          <Select value={viewMode} onValueChange={(v: ViewMode) => setViewMode(v)}>
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Mes</SelectItem>
              <SelectItem value="list">Lista</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4" />
                Nuevo Evento
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear Evento</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Fecha</Label>
                  <Calendar mode="single" selected={form.fecha} onSelect={(d) => d && setForm({ ...form, fecha: d })} />
                </div>
                <div className="space-y-2">
                  <Label>Horario</Label>
                  <Input type="time" value={form.horaInicio} onChange={(e) => setForm({ ...form, horaInicio: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <Select value={form.tipo} onValueChange={(v: any) => setForm({ ...form, tipo: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reunion_general">Reunión General</SelectItem>
                      <SelectItem value="ensayo">Ensayo</SelectItem>
                      <SelectItem value="jovenes">Jóvenes</SelectItem>
                      <SelectItem value="escuela_biblica">Escuela Bíblica</SelectItem>
                      <SelectItem value="evento_especial">Evento Especial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleCreate} className="w-full">Crear Evento</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {viewMode === "month" ? (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="icon" onClick={prevMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <CardTitle>{format(currentDate, "MMMM yyyy", { locale: es })}</CardTitle>
                  <Button variant="ghost" size="icon" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-px">
                  {DIAS_SEMANA.map((d) => (
                    <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">{d}</div>
                  ))}
                  {days.map((d, idx) => {
                    const evs = eventos.filter((e) => isSameDay(e.fecha, d))
                    return (
                      <div
                        key={idx}
                        className={`min-h-[80px] p-1 border rounded-md text-sm ${
                          !isSameMonth(d, currentDate) ? "text-muted-foreground/40" : ""
                        } ${isSameDay(d, new Date()) ? "border-primary" : ""}`}
                      >
                        <span className="text-xs font-medium">{format(d, "d")}</span>
                        {evs.map((e) => (
                          <div key={e.id} className="text-xs bg-primary/10 text-primary rounded px-1 mt-1 truncate">
                            {e.titulo}
                          </div>
                        ))}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Lista de Eventos</CardTitle>
              </CardHeader>
              <CardContent>
                {eventosDelMes.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p>No hay eventos este mes</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {eventosDelMes.map((e) => (
                      <div key={e.id} className="flex items-center justify-between p-3 rounded-lg border group">
                        <div className="flex items-center gap-3">
                          <div className="text-center min-w-12">
                            <p className="text-lg font-bold">{format(e.fecha, "d")}</p>
                            <p className="text-xs text-muted-foreground">{format(e.fecha, "MMM", { locale: es })}</p>
                          </div>
                          <div>
                            <p className="font-medium">{e.titulo}</p>
                            <p className="text-sm text-muted-foreground">{e.horaInicio}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={tipoBadge(e.tipo)}>
                            {e.tipo === "reunion_general" ? "Reunión" : e.tipo === "ensayo" ? "Ensayo" : e.tipo === "jovenes" ? "Jóvenes" : "Especial"}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 text-destructive"
                            onClick={() => handleDelete(e.id, e.titulo)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Próximos Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            {eventos.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No hay próximos eventos</p>
            ) : (
              <div className="space-y-2">
                {eventos.slice(0, 5).map((e) => (
                  <div key={e.id} className="flex items-center gap-2 text-sm">
                    <CalendarDays className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="flex-1 truncate">{e.titulo}</span>
                    <span className="text-xs text-muted-foreground shrink-0">{format(e.fecha, "d MMM", { locale: es })}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
