"use client"

import { useState, useEffect, useCallback } from "react"
import { Ministerio } from "@/types"
import { obtenerDocumentos, where } from "@/lib/firestore"

export function useMinisterios() {
  const [ministerios, setMinisterios] = useState<Ministerio[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await obtenerDocumentos<Ministerio>("ministerios", [
          where("activo", "==", true),
        ])
        if (mounted) setMinisterios(data)
      } catch (error) {
        if (mounted) console.error("Error fetching ministerios:", error)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [refreshKey])

  const refetch = useCallback(() => setRefreshKey((k) => k + 1), [])

  return { ministerios, loading, refetch, setMinisterios }
}
