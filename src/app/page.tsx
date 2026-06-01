"use client"

import { Button } from "@/components/ui/button"
import { Church, MapPin, Clock, ChevronRight, Music, Users, Heart, Globe, Video, Camera } from "lucide-react"
import Link from "next/link"

const horarios = [
  { dia: "Jueves", hora: "20:00", actividad: "Reunión General", desc: "Culto de enseñanza y adoración" },
  { dia: "Sábado", hora: "19:00", actividad: "Reunión de Jóvenes", desc: "Espacio para jóvenes de 12 a 25 años" },
  { dia: "Domingo", hora: "18:00", actividad: "Reunión General", desc: "Culto de celebración y palabra" },
]

const equipo = [
  { img: "/Obispo.jpg", nombre: "Obispo", rol: "Liderazgo Espiritual" },
  { img: "/Pastor.jpg", nombre: "Pastor", rol: "Pastor Principal" },
  { img: "/Musico.jpg", nombre: "Músico", rol: "Ministerio de Alabanza" },
  { img: "/Musico1.jpg", nombre: "Músico", rol: "Ministerio de Alabanza" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#144137] via-[#0a0a0a] to-[#1a3a2e]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#73A243] rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#2A6A47] rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="p-4 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
              <Church className="h-14 w-14 text-[#DAE953]" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            SIDS Iglesia
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-2 max-w-2xl mx-auto">
            &quot;Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos.&quot;
          </p>
          <p className="text-white/50 text-sm mb-10">Mateo 18:20</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#horarios">
              <Button size="lg" className="bg-[#73A243] hover:bg-[#2A6A47] text-white gap-2">
                <Clock className="h-4 w-4" />
                Nuestros Horarios
              </Button>
            </Link>
            <Link href="#nosotros">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 gap-2">
                <Heart className="h-4 w-4" />
                Conocenos
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-6 w-6 text-white/40 rotate-90" />
        </div>
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="py-20 px-4 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#144137] dark:text-[#DAE953] mb-4">
              Somos SIDS Iglesia
            </h2>
            <p className="text-gray-600 dark:text-white/60 max-w-2xl mx-auto text-lg">
              Una comunidad de fe comprometida con llevar el mensaje de esperanza y amor a nuestra ciudad.
              Creemos en familias fuertes, jóvenes con propósito y una iglesia de puertas abiertas.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {equipo.map((miembro) => (
              <div key={miembro.nombre} className="group text-center">
                <div className="relative overflow-hidden rounded-2xl mb-3 aspect-square">
                  <img
                    src={miembro.img}
                    alt={miembro.nombre}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                    <p className="text-white font-semibold text-sm">{miembro.nombre}</p>
                    <p className="text-white/60 text-xs">{miembro.rol}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-[#144137]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "15+", label: "Años de Ministerio", icon: Heart },
            { num: "3", label: "Reuniones Semanales", icon: Clock },
            { num: "5+", label: "Ministerios", icon: Music },
            { num: "50+", label: "Colaboradores", icon: Users },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-xl bg-white/10">
                  <stat.icon className="h-6 w-6 text-[#DAE953]" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{stat.num}</p>
              <p className="text-white/60 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Horarios */}
      <section id="horarios" className="py-20 px-4 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#144137] dark:text-[#DAE953] mb-4">
              Horarios de Reuniones
            </h2>
            <p className="text-gray-600 dark:text-white/60">
              Te esperamos con las puertas abiertas
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {horarios.map((h) => (
              <div
                key={h.dia}
                className="relative p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:shadow-lg transition-all group"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#73A243] rounded-t-2xl" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-[#73A243]/10">
                    <Clock className="h-5 w-5 text-[#73A243]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#73A243]">{h.dia}</p>
                    <p className="text-2xl font-bold text-[#144137] dark:text-white">{h.hora}</p>
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-[#144137] dark:text-white mb-1">{h.actividad}</h3>
                <p className="text-sm text-gray-500 dark:text-white/50">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ministerios */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#144137] dark:text-[#DAE953] mb-4">
              Nuestros Ministerios
            </h2>
            <p className="text-gray-600 dark:text-white/60">
              Encontrá tu lugar para servir y crecer
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { nombre: "Alabanza", icon: Music, desc: "Músicos y cantores" },
              { nombre: "Sonido", icon: Music, desc: "Audio y streaming" },
              { nombre: "Multimedia", icon: Camera, desc: "Pantallas y cámaras" },
              { nombre: "Diáconos", icon: Heart, desc: "Servicio y logística" },
              { nombre: "Escuela Bíblica", icon: Users, desc: "Enseñanza" },
            ].map((m) => (
              <div key={m.nombre} className="p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-center hover:border-[#73A243]/50 transition-colors group">
                <div className="p-3 rounded-full bg-[#73A243]/10 w-fit mx-auto mb-3 group-hover:bg-[#73A243]/20 transition-colors">
                  <m.icon className="h-5 w-5 text-[#73A243]" />
                </div>
                <p className="font-semibold text-sm text-[#144137] dark:text-white">{m.nombre}</p>
                <p className="text-xs text-gray-500 dark:text-white/50 mt-1">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section className="py-16 px-4 bg-[#144137]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-4 rounded-full bg-white/10 w-fit mx-auto mb-6">
            <MapPin className="h-8 w-8 text-[#DAE953]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Visitanos</h2>
          <p className="text-white/70 mb-2">[Dirección de la Iglesia]</p>
          <p className="text-white/50 text-sm mb-6">Ciudad, Provincia</p>
          <Button className="bg-[#DAE953] text-[#144137] hover:bg-[#DAE953]/90 gap-2">
            <MapPin className="h-4 w-4" />
            Cómo Llegar
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <Church className="h-6 w-6 text-[#73A243]" />
              <span className="font-bold text-white text-lg">SIDS Iglesia</span>
            </div>
            <div className="flex gap-3">
              {[
                { icon: Video, href: "#", label: "YouTube" },
                { icon: Camera, href: "#", label: "Instagram" },
                { icon: Globe, href: "#", label: "Facebook" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                  aria-label={s.label}
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          <div className="text-center text-sm text-white/40">
            <p>© {new Date().getFullYear()} SIDS Iglesia. Todos los derechos reservados.</p>
            <div className="mt-2">
              <Link href="/login" className="hover:text-white/60 transition-colors">
                Acceso Colaboradores
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
