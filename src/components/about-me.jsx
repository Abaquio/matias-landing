"use client"

import { motion, useInView, useMotionValue, animate } from "framer-motion"
import { useEffect, useRef, useState } from "react"

// Count up estable (sin controls ni subscribe)
function CountUpNumber({ target, duration = 2, className = "", suffix = "" }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" }) // dispara al entrar
  const value = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  // Vincula el motion value al estado (redondeado)
  useEffect(() => {
    const unsubscribe = value.on("change", (v) => setDisplay(Math.round(v)))
    return () => unsubscribe()
  }, [value])

  // Lanza la animación cuando entra en viewport
  useEffect(() => {
    if (!isInView) return
    const controls = animate(value, target, {
      duration,
      ease: "easeOut",
    })
    return () => controls.stop()
  }, [isInView, target, duration, value])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}

export function AboutMe() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-muted/10 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Sobre <span className="text-primary">Mí</span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground leading-relaxed space-y-4"
          >
            <span className="block">
              <span className="font-semibold text-foreground">Analista Programador</span> y cursando último semestre de{" "}
              <span className="font-semibold text-foreground">Ingeniería en Informática</span>. Con más de 4 años de experiencia 
              en el desarrollo de proyectos web, integración de sistemas y gestión de bases de datos.
            </span>
            <span className="block">
              Me especializo en crear soluciones escalables y performantes usando tecnologías modernas. Valoro la
              calidad del código, la accesibilidad y la experiencia del usuario en cada proyecto.
            </span>
            <span className="block">
              En aprendizaje continuo y abierto a nuevos desafíos. Busco colaborar en proyectos que requieran
              desarrolladores comprometidos con la excelencia técnica.
            </span>
          </motion.p>

          {/* Quick Stats con Count Up estable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-4 mt-12 pt-12 border-t border-border"
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">
                <CountUpNumber target={4} duration={1.6} />+
              </p>
              <p className="text-muted-foreground text-sm mt-2">Certificados</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-accent">
                <CountUpNumber target={7} duration={1.6} />+
              </p>
              <p className="text-muted-foreground text-sm mt-2">Tecnologías</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-secondary">
                <CountUpNumber target={100} duration={1.8} suffix="%" />
              </p>
              <p className="text-muted-foreground text-sm mt-2">Dedicación</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}