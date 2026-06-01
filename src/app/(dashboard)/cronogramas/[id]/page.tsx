"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, CheckCircle, XCircle, Clock, Send } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function CronogramaDetailPage() {
  const params = useParams()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/cronogramas">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Grilla de Servicio</h1>
          <p className="text-muted-foreground">Seleccioná una reunión para ver su grilla</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-12 text-center text-muted-foreground">
          <p className="text-lg font-medium mb-1">Sin asignaciones aún</p>
          <p className="text-sm">Las asignaciones aparecerán aquí cuando se configuren</p>
        </CardContent>
      </Card>
    </div>
  )
}
