"use client"

import { useState, useEffect } from "react"
import { Ministerio } from "@/types"
import { obtenerDocumentos, where } from "@/lib/firestore"

export function useMinisterios() {
  const [ministerios, setMinisterios] = useState<Ministerio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await obtenerDocumentos<Ministerio>("ministerios", [
          where("activo", "==", true),
        ])
        setMinisterios(data)
      } catch (error) {
        console.error("Error fetching ministerios:", error)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  return { ministerios, loading }
}
