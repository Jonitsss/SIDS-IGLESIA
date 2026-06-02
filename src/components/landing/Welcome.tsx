"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export default function Welcome() {
  return (
    <section id="nosotros" className="py-24 md:py-32 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100">
              <img
                src="/Pastor.jpg"
                alt="SIDS Iglesia"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 p-6 rounded-2xl bg-black text-white shadow-2xl hidden md:block">
              <p className="text-3xl font-bold text-[#C9A84C]">15+</p>
              <p className="text-sm text-white/60">Años de ministerio</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest uppercase text-[#C9A84C] bg-[#C9A84C]/10 rounded-full">
              Bienvenidos
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight mb-6">
              Somos una iglesia de{" "}
              <span className="text-[#C9A84C]">puertas abiertas</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Creemos en una iglesia donde cada persona encuentra su lugar. 
              Una comunidad comprometida con llevar esperanza, restaurar familias 
              y compartir el amor de Dios a nuestra ciudad.
            </p>
            <div className="space-y-4 mb-8">
              {[
                { label: "Misión", desc: "Llevar el mensaje de salvación a cada persona" },
                { label: "Visión", desc: "Una iglesia fuerte, unida y en crecimiento" },
                { label: "Valores", desc: "Fe, familia, servicio y comunidad" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-[#C9A84C]/10 mt-0.5">
                    <Heart className="h-4 w-4 text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="font-semibold text-black text-sm">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
