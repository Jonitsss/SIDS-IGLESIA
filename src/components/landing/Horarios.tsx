"use client"

import { motion } from "framer-motion"
import { Clock, MapPin } from "lucide-react"

const horarios = [
  {
    dia: "Jueves",
    hora: "20:00",
    actividad: "Reunión General",
    desc: "Culto de enseñanza y adoración",
  },
  {
    dia: "Sábado",
    hora: "19:00",
    actividad: "Reunión de Jóvenes",
    desc: "Espacio para jóvenes de 12 a 25 años",
  },
  {
    dia: "Domingo",
    hora: "18:00",
    actividad: "Reunión General",
    desc: "Culto de celebración y palabra",
  },
]

export default function Horarios() {
  return (
    <section id="horarios" className="py-24 md:py-32 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest uppercase text-[#C9A84C] bg-[#C9A84C]/10 rounded-full">
            Visitanos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Horarios de Reuniones
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Te esperamos con las puertas abiertas
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {horarios.map((h, i) => (
            <motion.div
              key={h.dia}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15 }}
              className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#C9A84C]/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-[#C9A84C]/10">
                  <Clock className="h-6 w-6 text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#C9A84C] tracking-wider uppercase">
                    {h.dia}
                  </p>
                  <p className="text-3xl font-bold text-white">{h.hora}</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{h.actividad}</h3>
              <p className="text-white/50">{h.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-black bg-[#C9A84C] hover:bg-[#B8963C] rounded-xl transition-all"
          >
            <MapPin className="h-4 w-4" />
            Ver ubicación
          </a>
        </motion.div>
      </div>
    </section>
  )
}
