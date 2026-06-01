"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { CalendarDays, CheckCircle, XCircle, Clock, Trash2 } from "lucide-react"
import { toast } from "sonner"

export default function CronogramasPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cronogramas</h1>
          <p className="text-muted-foreground">Grillas de servicio para cada reunión</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <CalendarDays className="h-4 w-4" />
          Nueva Grilla
        </Button>
      </div>

      <Card>
        <CardContent className="p-12 text-center text-muted-foreground">
          <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium mb-1">No hay cronogramas</p>
          <p className="text-sm">Crea una grilla de servicio para una reunión</p>
          <Button variant="outline" className="mt-4" onClick={() => setOpen(true)}>
            Crear Primera Grilla
          </Button>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nueva Grilla de Servicio</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Reunión</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Seleccionar reunión" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="domingo">Domingo - Reunión General</SelectItem>
                  <SelectItem value="jueves">Jueves - Reunión General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground">La configuración de roles se hará desde cada ministerio.</p>
            <Button className="w-full" onClick={() => { toast.success("Grilla creada"); setOpen(false) }}>
              Crear Grilla
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
