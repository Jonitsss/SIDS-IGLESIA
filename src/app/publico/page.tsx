"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Church, MapPin, Clock, Calendar, ChevronRight, Video, Camera, Globe } from "lucide-react"

const horarios = [
  { dia: "Jueves", actividad: "Reunión General", hora: "20:00", tipo: "general" },
  { dia: "Viernes", actividad: "Ensayo de Músicos", hora: "20:00", tipo: "ensayo" },
  { dia: "Sábado", actividad: "Reunión de Jóvenes", hora: "20:00", tipo: "jovenes" },
  { dia: "Domingo", actividad: "Reunión General", hora: "10:00", tipo: "general" },
]

const proximosEventos = [
  { fecha: "4 Jun", titulo: "Reunión General", hora: "20:00" },
  { fecha: "7 Jun", titulo: "Reunión General", hora: "10:00" },
  { fecha: "14 Jun", titulo: "Culto Especial", hora: "10:00" },
]

export default function PublicPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="relative max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-2xl bg-primary/10">
              <Church className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">SIDS Iglesia</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            &quot;Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos.&quot; — Mateo 18:20
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg">
              <Calendar className="h-4 w-4" />
              Nuestros Horarios
            </Button>
            <Button variant="outline" size="lg">
              <MapPin className="h-4 w-4" />
              Cómo Llegar
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Horarios de Reuniones</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {horarios.map((h) => (
            <Card key={h.dia} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Badge className="mb-3">{h.dia}</Badge>
                <h3 className="font-semibold text-lg">{h.actividad}</h3>
                <div className="flex items-center justify-center gap-1 mt-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{h.hora}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-12 px-4 bg-muted/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Próximos Eventos</h2>
          <div className="space-y-3">
            {proximosEventos.map((e) => (
              <Card key={e.titulo + e.fecha}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="text-center min-w-16">
                    <p className="text-lg font-bold text-primary">{e.fecha.split(" ")[0]}</p>
                    <p className="text-xs text-muted-foreground">{e.fecha.split(" ")[1]}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{e.titulo}</p>
                    <p className="text-sm text-muted-foreground">{e.hora}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 max-w-3xl mx-auto text-center">
        <div className="p-8 rounded-2xl border bg-card">
          <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Nuestra Ubicación</h2>
          <p className="text-muted-foreground mb-4">[Dirección de la Iglesia]</p>
          <Button variant="outline">
            <MapPin className="h-4 w-4" />
            Abrir en Google Maps
          </Button>
        </div>
      </section>

      <section className="py-12 px-4 bg-muted/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">Síguenos</h2>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="lg" className="gap-2">
              <Video className="h-5 w-5 text-red-500" />
              YouTube
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Camera className="h-5 w-5 text-pink-500" />
              Instagram
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              Facebook
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 text-center text-sm text-muted-foreground border-t">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Church className="h-4 w-4" />
          <span>SIDS Iglesia</span>
        </div>
        <p>© {new Date().getFullYear()} Todos los derechos reservados</p>
      </footer>
    </div>
  )
}
