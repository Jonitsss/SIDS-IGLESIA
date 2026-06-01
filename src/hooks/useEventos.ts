"use client"

import { useState, useEffect } from "react"
import { Evento } from "@/types"
import { obtenerDocumentos, where, orderBy } from "@/lib/firestore"

export function useEventos(fechaInicio?: Date, fechaFin?: Date) {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const c: any[] = [orderBy("fecha", "asc")]
        if (fechaInicio) {
          c.push(where("fecha", ">=", fechaInicio))
        }
        if (fechaFin) {
          c.push(where("fecha", "<=", fechaFin))
        }
        const data = await obtenerDocumentos<Evento>("eventos", c)
        setEventos(data)
      } catch (error) {
        console.error("Error fetching eventos:", error)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [fechaInicio, fechaFin])

  return { eventos, loading }
}
