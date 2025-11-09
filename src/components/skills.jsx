"use client"

import { motion } from "framer-motion"
import { Code2, Layout, Server, Database, GitBranch, Palette, Zap } from "lucide-react"
import LogoLoop from "./animations/LogoLoop"
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs, // ✅ nombre correcto (todo en minúsculas)
  SiDjango,
  SiTailwindcss,
  SiMysql,
} from "react-icons/si"

// Logos para el loop animado
const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiDjango />, title: "Django", href: "https://www.djangoproject.com" },
  { node: <SiTailwindcss />, title: "TailwindCSS", href: "https://tailwindcss.com" },
  { node: <SiMysql />, title: "MySQL", href: "https://mysql.com" },
]

const skillCategories = [
  { title: "Lenguajes", skills: ["JavaScript", "Python", "SQL"], icon: Code2, color: "from-primary to-accent", iconColor: "text-primary" },
  { title: "Frontend", skills: ["React", "Tailwind CSS", "Material-UI", "Bootstrap", "Figma"], icon: Layout, color: "from-accent to-primary", iconColor: "text-accent" },
  { title: "Backend", skills: ["Node.js", "Express.js", "Django"], icon: Server, color: "from-primary via-accent to-primary", iconColor: "text-primary" },
  { title: "Bases de Datos", skills: ["MySQL", "MongoDB", "SQL Server"], icon: Database, color: "from-accent to-primary", iconColor: "text-accent" },
  { title: "Versionado y Colaboración", skills: ["Git", "GitHub"], icon: GitBranch, color: "from-primary to-secondary", iconColor: "text-primary" },
  { title: "Habilidades blandas", skills: ["Comunicación efectiva ","Resolución de problemas","Adaptabilidad","Resiliencia"], icon: Zap, color: "from-accent to-secondary", iconColor: "text-accent" },
]

export function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <section id="skills" className="py-20 sm:py-32 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* === Logo Loop (visible arriba del título) === */}
        <div className="w-full flex justify-center mb-10">
          <div className="w-full max-w-5xl">
            <LogoLoop
              logos={techLogos}
              speed={110}
              direction="left"
              logoHeight={42}
              gap={60}
              scaleOnHover
              fadeOut
              fadeOutColor="transparent"
              ariaLabel="Tecnologías que uso"
            />
          </div>
        </div>

        {/* === Título === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Mis{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Competencias
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Herramientas y tecnologías con las que trabajo
          </p>
        </motion.div>

        {/* === Grid de Skills con efecto Glow === */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, idx) => {
            const Icon = category.icon
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative group p-6 bg-card border border-border rounded-xl transition-all duration-300 overflow-hidden
                           hover:border-primary/80 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]"
              >
                {/* Glow morado suave */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(60% 60% at 50% 50%, rgba(168,85,247,0.18) 0%, rgba(168,85,247,0.08) 35%, rgba(0,0,0,0) 70%)",
                    filter: "blur(20px)",
                  }}
                />

                {/* Contenido */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon size={24} className={category.iconColor} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {category.skills.map((skill, sIdx) => (
                      <motion.div key={sIdx} whileHover={{ x: 4 }} className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.color}`} />
                        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}