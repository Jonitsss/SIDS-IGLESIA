"use client"

import { motion } from "framer-motion"
import { ArrowRight, MapPin } from "lucide-react"

export default function Hero() {
  return (
    <section id="inicio" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black/90" />

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#C9A84C]/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[120px]" />
      </div>

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(201, 168, 76, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase text-[#C9A84C] border border-[#C9A84C]/30 rounded-full bg-[#C9A84C]/5">
            Bienvenido a SIDS Iglesia
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] tracking-tight mb-6"
        >
          Una familia
          <br />
          <span className="text-[#C9A84C]">con propósito</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          &quot;Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos.&quot;
          <br />
          <span className="text-white/40 text-sm">Mateo 18:20</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="#horarios"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-black bg-[#C9A84C] hover:bg-[#B8963C] rounded-2xl transition-all shadow-2xl shadow-[#C9A84C]/25 hover:shadow-[#C9A84C]/40 hover:-translate-y-0.5"
          >
            Nuestros Horarios
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white border border-white/20 hover:border-white/40 rounded-2xl transition-all hover:bg-white/5 hover:-translate-y-0.5"
          >
            <MapPin className="h-4 w-4" />
            Cómo llegar
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-3 rounded-full bg-[#C9A84C]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
