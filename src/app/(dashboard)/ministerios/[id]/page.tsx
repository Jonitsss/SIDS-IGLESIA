"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Ministerio, Usuario } from "@/types"
import { obtenerDocumento, obtenerDocumentos, where, actualizarDocumento } from "@/lib/firestore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, UserPlus, Settings } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function MinisterioDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [ministerio, setMinisterio] = useState<Ministerio | null>(null)
  const [miembros, setMiembros] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const m = await obtenerDocumento<Ministerio>("ministerios", id)
        setMinisterio(m)
        if (m) {
          const usuarios = await obtenerDocumentos<Usuario>("usuarios", [
            where("ministerioIds", "array-contains", id),
            where("activo", "==", true),
          ])
          setMiembros(usuarios)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  if (loading) return <div className="p-8 text-center text-muted-foreground">Cargando...</div>
  if (!ministerio) return <div className="p-8 text-center text-muted-foreground">Ministerio no encontrado</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/ministerios">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{ministerio.nombre}</h1>
          <p className="text-muted-foreground">{ministerio.descripcion}</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm">
            <UserPlus className="h-4 w-4" />
            Agregar Miembro
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
            Configurar
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {ministerio.roles?.map((rol) => (
          <Badge key={rol}>{rol}</Badge>
        ))}
      </div>

      <Tabs defaultValue="miembros">
        <TabsList>
          <TabsTrigger value="miembros">Miembros ({miembros.length})</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="config">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="miembros" className="space-y-4">
          {miembros.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                No hay miembros en este ministerio
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
              {miembros.map((miembro) => (
                <Card key={miembro.id}>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {miembro.nombre?.[0]}{miembro.apellido?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{miembro.nombre} {miembro.apellido}</p>
                      <p className="text-sm text-muted-foreground capitalize">{miembro.rol}</p>
                    </div>
                    <Badge variant="secondary">Miembro</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Roles del Ministerio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {ministerio.roles?.map((rol) => (
                  <div key={rol} className="flex items-center justify-between p-3 rounded-lg border">
                    <span>{rol}</span>
                    <Badge variant="secondary">Disponible</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config">
          <Card>
            <CardHeader>
              <CardTitle>Configuración del Ministerio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Color</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: ministerio.color }} />
                  <span className="text-sm text-muted-foreground">{ministerio.color}</span>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium">ID del Líder</p>
                <p className="text-sm text-muted-foreground">{ministerio.liderId || "Sin asignar"}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
