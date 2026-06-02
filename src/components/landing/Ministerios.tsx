"use client"

import { motion } from "framer-motion"
import { Music, Volume2, Monitor, Heart, BookOpen, Users } from "lucide-react"

const ministerios = [
  {
    nombre: "Alabanza",
    desc: "Músicos y cantores que lideran la adoración",
    img: "/Musico.jpg",
    icon: Music,
  },
  {
    nombre: "Sonido",
    desc: "Audio profesional y transmisión en vivo",
    img: "/Musico1.jpg",
    icon: Volume2,
  },
  {
    nombre: "Multimedia",
    desc: "Pantallas, cámaras y producción visual",
    img: "/Obispo.jpg",
    icon: Monitor,
  },
  {
    nombre: "Diáconos",
    desc: "Servicio, recepción y orden",
    img: "/Pastor.jpg",
    icon: Heart,
  },
  {
    nombre: "Escuela Bíblica",
    desc: "Enseñanza para todas las edades",
    img: "/Musico.jpg",
    icon: BookOpen,
  },
  {
    nombre: "Jóvenes",
    desc: "Espacio para la próxima generación",
    img: "/Musico1.jpg",
    icon: Users,
  },
]

export default function Ministerios() {
  return (
    <section id="ministerios" className="py-24 md:py-32 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest uppercase text-[#C9A84C] bg-[#C9A84C]/10 rounded-full">
            Servimos juntos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight mb-4">
            Nuestros Ministerios
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Encontrá tu lugar para servir y crecer en comunidad
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministerios.map((m, i) => (
            <motion.div
              key={m.nombre}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-[#C9A84C]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#C9A84C]/10"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={m.img}
                  alt={m.nombre}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-1">
                  <m.icon className="h-4 w-4 text-[#C9A84C]" />
                  <h3 className="font-bold text-white">{m.nombre}</h3>
                </div>
                <p className="text-sm text-white/70">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
