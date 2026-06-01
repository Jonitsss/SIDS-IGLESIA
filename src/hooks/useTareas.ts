"use client"

import { useState, useEffect } from "react"
import { Tarea } from "@/types"
import { obtenerDocumentos, where, orderBy } from "@/lib/firestore"

export function useTareas(usuarioId?: string, ministerioId?: string) {
  const [tareas, setTareas] = useState<Tarea[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const c: any[] = [orderBy("fechaLimite", "asc")]
        if (usuarioId) {
          c.push(where("responsableId", "==", usuarioId))
        }
        if (ministerioId) {
          c.push(where("ministerioId", "==", ministerioId))
        }
        const data = await obtenerDocumentos<Tarea>("tareas", c)
        setTareas(data)
      } catch (error) {
        console.error("Error fetching tareas:", error)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [usuarioId, ministerioId])

  return { tareas, loading }
}
