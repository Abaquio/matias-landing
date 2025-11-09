"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import DecryptedText from "./animations/DecryptedText";
import devPng from "../assets/desarrollador-de-software.png";

function Hero() {
  const handleSmoothScroll = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative isolate min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Fondo mejorado */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* base + radiales en inline style (no los purga Tailwind) */}
        <div
          className="absolute inset-0"
          style={{
            // shadcn/ui: usa el color del tema como base
            backgroundColor: 'hsl(var(--background))',
            backgroundImage: `
              radial-gradient(900px 360px at 20% 35%, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.00) 60%),
              radial-gradient(800px 320px at 85% 45%, rgba(168,85,247,0.18) 0%, rgba(168,85,247,0.00) 60%)
            `
          }}
        />

        {/* discos animados suaves */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-12 right-10 w-80 h-80 bg-primary/12 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-10 left-10 w-[28rem] h-[28rem] bg-accent/12 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
          {/* Columna izquierda */}
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 max-w-3xl mx-auto md:mx-0"
            >


              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance">
                <span className="text-foreground">Matías</span>{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Sepúlveda
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
              >
                Desarrollador Full Stack
              </motion.p>

              {/* DecryptedText intacto */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg text-muted-foreground leading-relaxed max-w-2xl"
              >
                <DecryptedText
                  text={
                    "Construyo soluciones modernas con React, Node.js y Django. Enfocado en calidad, integración y experiencia de usuario."
                  }
                  speed={50}
                  sequential
                  revealDirection="start"
                  animateOn="view"
                />
              </motion.p>

              {/* Botones desktop/tablet */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="hidden md:flex gap-4 pt-4"
              >
                <button
                  onClick={() => handleSmoothScroll("#projects")}
                  className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
                >
                  Ver proyectos
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Columna derecha */}
          <div className="flex flex-col items-center md:items-end">
            {/* PNG: oculto en pantallas < 640px */}
            <img
              src={typeof devPng === "string" ? devPng : devPng?.src || "/desarrollador-de-software.png"}
              alt="Desarrollador de software"
              className="hidden sm:block w-[280px] sm:w-[360px] md:w-[420px] lg:w-[480px] h-auto filter invert drop-shadow-[0_0_18px_rgba(168,85,247,0.35)]"
              draggable={false}
            />

            {/* Botones móviles (bajo el PNG; si PNG se oculta, igual aparecen) */}
            <div className="flex md:hidden gap-4 mt-6">
              <button
                onClick={() => handleSmoothScroll("#projects")}
                className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/40 transition-all duration-300"
              >
                Ver proyectos
              </button>
              <button
                onClick={() => handleSmoothScroll("#contact")}
                className="px-6 py-3 bg-transparent border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300"
              >
                Contactar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
export { Hero };