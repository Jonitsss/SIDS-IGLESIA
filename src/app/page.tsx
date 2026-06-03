"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
}

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
}

const reuniones = [
  {
    dia: "Jueves",
    hora: "20:00",
    titulo: "Reunión General",
    descripcion: "Alabanza, adoración y enseñanza de la Palabra de Dios para toda la familia.",
  },
  {
    dia: "Domingo",
    hora: "18:00",
    titulo: "Reunión General",
    descripcion: "Celebración con adoración, reflexión bíblica y comunión como iglesia.",
  },
  {
    dia: "Sábado",
    hora: "19:00",
    titulo: "Reunión de Jóvenes",
    descripcion: "Encuentro dinámico con actividades, enseñanza bíblica y alabanza.",
  },
]

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-[#fff9f2] dark:bg-background text-foreground">
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(800px at 50% -10%, rgba(115, 162, 67, 0.12), transparent 60%),
            radial-gradient(600px at 80% 100%, rgba(42, 106, 71, 0.10), transparent 50%),
            radial-gradient(400px at 20% 80%, rgba(218, 233, 83, 0.05), transparent 50%)
          `,
        }}
      />

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-24">
        {/* Social Nav */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center justify-between mb-8"
        >
          <motion.nav
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="flex items-center gap-4"
          >
            {[
              { href: "https://www.facebook.com/MinisterioSantaIglesia", label: "Facebook", icon: "fa-facebook" },
              { href: "https://www.youtube.com/@sids2025", label: "YouTube", icon: "fa-youtube-play" },
              { href: "https://www.instagram.com/sids_iglesia/", label: "Instagram", icon: "fa-instagram" },
            ].map((s) => (
              <motion.a
                key={s.label}
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0 },
                }}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-lg"
                aria-label={s.label}
              >
                <i className={`fa ${s.icon}`} />
              </motion.a>
            ))}
          </motion.nav>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
            onClick={toggleTheme}
            className="p-2 rounded-full border border-border bg-card hover:bg-muted transition-colors"
            aria-label="Cambiar modo"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Moon className="h-5 w-5 text-muted-foreground" />
            )}
          </motion.button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#144137" }}
          >
            SANTA IGLESIA
            <br />
            DEL SEÑOR
          </h1>
        </motion.div>

        {/* Section 1 — Dra. Magdalena */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-24"
        >
          <motion.div
            variants={fadeInLeft}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full md:w-1/2"
          >
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/Dra.jpg"
                alt="Dra. Magdalena Montenegro"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
          <motion.div
            variants={fadeInRight}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full md:w-1/2 space-y-4"
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-xs font-semibold tracking-[0.25em] uppercase text-primary"
            >
              Quiénes Somos
            </motion.p>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="text-foreground leading-relaxed"
            >
              Santa Iglesia del Señor es una Iglesia Cristiana Evangélica comprometida con la predicación del Evangelio de Jesucristo, la enseñanza de la Palabra de Dios y el acompañamiento espiritual de las familias y la comunidad.
            </motion.p>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="text-foreground leading-relaxed"
            >
              Nuestra congregación es guiada por los Obispos Dr. Obispo Edgardo Norberto Montenegro y Dra. Obispo Magdalena Ciulla De Montenegro, quienes desarrollan su ministerio con dedicación, amor y servicio, acompañados por un equipo de líderes comprometidos con la obra de Dios.
            </motion.p>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="text-foreground leading-relaxed"
            >
              Creemos en el poder transformador de Jesucristo y trabajamos para que cada persona pueda conocer el amor de Dios, crecer en la fe y encontrar un lugar donde desarrollar su propósito. Nuestra misión es llevar esperanza, restauración y vida a través del mensaje del Evangelio, formando discípulos comprometidos con Cristo y con su comunidad.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Section 2 — Obispo */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16 mb-24"
        >
          <motion.div
            variants={fadeInRight}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full md:w-1/2"
          >
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/Obispo.jpg"
                alt="Obispo Edgardo Montenegro"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
          <motion.div
            variants={fadeInLeft}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full md:w-1/2 space-y-4"
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-foreground leading-relaxed"
            >
              En Santa Iglesia del Señor contamos con espacios especialmente preparados para la adoración, la enseñanza bíblica, la comunión y el crecimiento espiritual.
            </motion.p>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="text-foreground leading-relaxed"
            >
              Te invitamos a ser parte de nuestras reuniones y a vivir una experiencia transformadora en la presencia de Dios. ¡Las puertas de Santa Iglesia del Señor están abiertas para vos y tu familia!
            </motion.p>
          </motion.div>
        </motion.section>

      </main>

        {/* Section 3 — Full width */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="relative z-10 grid md:grid-cols-2 gap-0 items-stretch"
        >
          <motion.div
            variants={scaleIn}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative overflow-visible min-h-[500px] flex items-center justify-center"
          >
            <div className="relative w-[85%] max-w-[536px] aspect-[8/5] shadow-lg">
              <Image
                src="/Musicosection.jpg"
                alt="Músicos"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 40vw"
                quality={100}
                priority
              />
            </div>
          </motion.div>

          <motion.div
            variants={fadeInRight}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="px-8 md:px-12 py-12 md:py-16 flex flex-col justify-center space-y-6"
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-xs font-semibold tracking-[0.25em] uppercase text-primary"
            >
              Nuestras Reuniones
            </motion.p>
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="text-2xl md:text-3xl font-bold text-foreground leading-tight"
            >
              Tenemos reuniones generales los días jueves y domingos
            </motion.h2>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="text-foreground leading-relaxed"
            >
              Los Jueves tenemos nuestra reunión general a las 20:00 hs, los Sábados a las 19:00 hs se realiza la reunión de jóvenes, y los Domingos celebramos nuestra reunión general a las 18:00 hs.
            </motion.p>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="flex flex-wrap gap-2 mt-2"
            >
              {["Alabanza", "Adoración"].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4, ease: "easeOut" }}
                  style={{
                    backgroundColor: "#efefef",
                    borderRadius: "20px",
                    color: "#1e1c1c",
                    display: "inline-block",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "14px",
                    padding: "9.1px 17.5px",
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-24">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-16"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4 text-center"
          >
            Nuestra Ubicación
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="rounded-2xl overflow-hidden border border-border"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d204.60280482687168!2d-58.190065407558976!3d-34.86514946029389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2d78a02f43253%3A0xf118fbba9ff02ca!2sColegio%20Jes%C3%BAs%20de%20Nazareth!5e0!3m2!1ses!2sar!4v1780336542615!5m2!1ses!2sar"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación"
            />
          </motion.div>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-border mt-24 pt-8 text-center text-sm text-muted-foreground"
        >
          <p>© {new Date().getFullYear()} Santa Iglesia del Señor</p>
        </motion.footer>
      </div>
    </div>
  )
}
