"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Download } from "lucide-react"

export default function AsistenciaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Asistencia</h1>
          <p className="text-muted-foreground">Registro de asistencia a reuniones</p>
        </div>
        <Button variant="outline" disabled>
          <Download className="h-4 w-4" />
          Exportar
        </Button>
      </div>

      <Card>
        <CardContent className="p-12 text-center text-muted-foreground">
          <Users className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium mb-1">No hay registros de asistencia</p>
          <p className="text-sm">Los registros aparecerán cuando se configuren eventos y se tome asistencia</p>
        </CardContent>
      </Card>
    </div>
  )
}
