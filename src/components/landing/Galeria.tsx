"use client"

import { motion } from "framer-motion"

const fotos = [
  { src: "/Obispo.jpg", alt: "Congregación", span: "row-span-2" },
  { src: "/Musico.jpg", alt: "Músicos" },
  { src: "/Pastor.jpg", alt: "Pastores" },
  { src: "/Musico1.jpg", alt: "Jóvenes" },
  { src: "/Obispo.jpg", alt: "Adoración" },
  { src: "/Pastor.jpg", alt: "Familia", span: "row-span-2" },
]

export default function Galeria() {
  return (
    <section className="py-24 md:py-32 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest uppercase text-[#C9A84C] bg-[#C9A84C]/10 rounded-full">
            Galería
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight mb-4">
            Momentos en familia
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Capturando la presencia de Dios en cada reunión
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[280px]">
          {fotos.map((foto, i) => (
            <motion.div
              key={foto.alt + i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08 }}
              className={`relative overflow-hidden rounded-2xl group ${foto.span || ""}`}
            >
              <img
                src={foto.src}
                alt={foto.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
