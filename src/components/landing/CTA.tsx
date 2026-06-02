"use client"

import { motion } from "framer-motion"
import { ArrowRight, Heart } from "lucide-react"

export default function CTA() {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#0a0a0a]" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-[#C9A84C]/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex justify-center mb-8">
            <div className="p-4 rounded-full bg-[#C9A84C]/10">
              <Heart className="h-8 w-8 text-[#C9A84C]" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Hay un lugar{" "}
            <span className="text-[#C9A84C]">para vos</span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-xl mx-auto">
            No importa en qué momento de la vida estés, siempre hay un lugar 
            para vos en nuestra familia. Te esperamos.
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-black bg-[#C9A84C] hover:bg-[#B8963C] rounded-2xl transition-all shadow-2xl shadow-[#C9A84C]/25 hover:shadow-[#C9A84C]/40 hover:-translate-y-0.5"
          >
            Planificá tu visita
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
