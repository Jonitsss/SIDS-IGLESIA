"use client"

import { MapPin, Clock, Mail, Video, Camera, Globe } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer id="contacto" className="bg-black border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="mb-4">
              <span className="font-bold text-white text-lg">SIDS</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Una iglesia de puertas abiertas, fundada sobre la roca, para servir, amar y llevar el mensaje de salvación.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Horarios</h3>
            <div className="space-y-3 text-sm">
              {[
                { dia: "Jueves", hora: "20:00", act: "Reunión General" },
                { dia: "Sábado", hora: "19:00", act: "Reunión de Jóvenes" },
                { dia: "Domingo", hora: "18:00", act: "Reunión General" },
              ].map((h) => (
                <div key={h.dia} className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-[#C9A84C] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white font-medium">{h.act}</p>
                    <p className="text-white/40">{h.dia} - {h.hora}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Contacto</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#C9A84C] mt-0.5 shrink-0" />
                <div>
                  <p className="text-white">[Dirección de la Iglesia]</p>
                  <p className="text-white/40">Ciudad, Provincia</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-[#C9A84C] mt-0.5 shrink-0" />
                <p className="text-white/40">info@sidsiglesia.com</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Seguinos</h3>
            <div className="flex gap-3 mb-6">
              {[
                { icon: Video, href: "#", label: "YouTube" },
                { icon: Camera, href: "#", label: "Instagram" },
                { icon: Globe, href: "#", label: "Facebook" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="p-3 rounded-xl bg-white/5 hover:bg-[#C9A84C]/20 text-white/50 hover:text-[#C9A84C] transition-all"
                  aria-label={s.label}
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <Link
              href="/login"
              className="text-xs text-white/30 hover:text-[#C9A84C] transition-colors"
            >
              Acceso Colaboradores →
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center text-sm text-white/30">
          <p>© {new Date().getFullYear()} SIDS. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
