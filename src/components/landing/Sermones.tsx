"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"

const sermones = [
  {
    titulo: "Propósito y destino",
    texto: "Descubrí el plan que Dios tiene para tu vida",
    img: "/Pastor.jpg",
  },
  {
    titulo: "Familia restaurada",
    texto: "Principios bíblicos para hogares sólidos",
    img: "/Obispo.jpg",
  },
  {
    titulo: "Fe en acción",
    texto: "Aprendé a caminar en fe cada día",
    img: "/Musico.jpg",
  },
]

export default function Sermones() {
  return (
    <section id="sermones" className="py-24 md:py-32 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest uppercase text-[#C9A84C] bg-[#C9A84C]/10 rounded-full">
            Sermones
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight mb-4">
            Sermones Recientes
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Palabra fresca para tu vida
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {sermones.map((s, i) => (
            <motion.div
              key={s.titulo}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-[#C9A84C]/30 transition-all duration-500 hover:shadow-2xl"
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={s.img}
                  alt={s.titulo}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="p-4 rounded-full bg-[#C9A84C]/90 hover:bg-[#C9A84C] transition-colors shadow-xl">
                    <Play className="h-6 w-6 text-black ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-black text-lg mb-1">{s.titulo}</h3>
                <p className="text-sm text-gray-500">{s.texto}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
