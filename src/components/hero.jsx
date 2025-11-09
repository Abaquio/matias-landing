import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion"
import { User } from "lucide-react"
import DecryptedText from "./animations/DecryptedText" // ✅ ruta correcta según tu carpeta

export function Hero() {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const STRENGTH_1 = 60
  const STRENGTH_2 = 80

  const t1 = useTransform([mx, my], ([x, y]) =>
    reduce ? "none" : `translate3d(${x / STRENGTH_1}px, ${y / STRENGTH_1}px, 0)`
  )
  const t2 = useTransform([mx, my], ([x, y]) =>
    reduce ? "none" : `translate3d(${x / -STRENGTH_2}px, ${y / -STRENGTH_2}px, 0)`
  )

  const onMouseMove = (e) => {
    if (reduce) return
    const { innerWidth: w, innerHeight: h } = window
    mx.set(e.clientX - w / 2)
    my.set(e.clientY - h / 2)
  }

  const handleSmoothScroll = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      onMouseMove={onMouseMove}
    >
      {/* Fondo base */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-primary/5 to-background" />

      {/* Glows con parallax */}
      <div className="absolute inset-0 -z-5 pointer-events-none mix-blend-lighten">
        <motion.div style={{ transform: t1 }} className="absolute inset-0 will-change-transform">
          <div className="absolute inset-0 spot-tr spot-spin-slow" />
          <div className="orb orb-1 drift-1" />
        </motion.div>

        <motion.div style={{ transform: t2 }} className="absolute inset-0 will-change-transform">
          <div className="absolute inset-0 spot-bl" />
          <div className="orb orb-2 drift-2" />
        </motion.div>
      </div>

      {/* Círculos giratorios (tus motion originales) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute top-10 right-10 w-72 h-72 bg-primary/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute bottom-0 left-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl"
      />

      {/* Contenido principal */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 max-w-4xl"
        >
          {/* Icono animado */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              className="p-4 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full border border-primary/50"
            >
              <User size={48} className="text-primary" />
            </motion.div>
          </div>

          {/* Nombre */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance">
            <span className="text-foreground">Matías</span>{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Sepúlveda
            </span>
          </h1>

          {/* Rol */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
          >
            Desarrollador Web
          </motion.p>

          {/* Texto con efecto decrypt */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg leading-relaxed max-w-2xl mx-auto"
          >
            <DecryptedText
              text="Construyo soluciones modernas con React, Node.js y Django. Enfocado en calidad, integración y experiencia de usuario."
              animateOn="view-repeat"
              revealDirection="right"
              speed={25}
              maxIterations={22}
              sequential={true}
              className="text-muted-foreground"
              encryptedClassName="text-accent/70 tracking-wide"
              parentClassName="inline-block"
            />
          </motion.div>

          {/* Botones */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
          >
            <button
              onClick={() => handleSmoothScroll("#projects")}
              className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
            >
              Ver proyectos
            </button>
            <button
              onClick={() => handleSmoothScroll("#contact")}
              className="px-8 py-3 bg-transparent border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300"
            >
              Contactar
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}