"use client"

import { useState, useEffect, useCallback } from "react"
import { GrillaServicio } from "@/types"
import { obtenerDocumentos, orderBy } from "@/lib/firestore"

export function useCronogramas() {
  const [cronogramas, setCronogramas] = useState<GrillaServicio[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await obtenerDocumentos<GrillaServicio>("cronogramas", [orderBy("fecha", "asc")])
        if (mounted) setCronogramas(data)
      } catch (error) {
        if (mounted) console.error("Error fetching cronogramas:", error)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [refreshKey])

  const refetch = useCallback(() => setRefreshKey((k) => k + 1), [])

  return { cronogramas, loading, refetch, setCronogramas }
}
