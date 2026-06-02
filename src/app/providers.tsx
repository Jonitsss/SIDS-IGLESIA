"use client"

import { ReactNode } from "react"
import { AuthProvider } from "@/contexts/AuthContext"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { Toaster } from "sonner"
import { MotionConfig } from "framer-motion"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MotionConfig reducedMotion="user">
          {children}
        </MotionConfig>
        <Toaster
          position="top-right"
          richColors
          closeButton
          theme="system"
        />
      </AuthProvider>
    </ThemeProvider>
  )
}
