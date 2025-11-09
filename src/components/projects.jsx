"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"

const projects = [
  {
    title: "Barbería Elite",
    description: "Landing page profesional + sistema administrativo para gestión de citas y servicios de barbería",
    tech: ["React", "Tailwind CSS", "Supabase"],
    demoUrl: "https://demo-barberia.example",
    githubUrl: "https://github.com/usuario/barberia-elite",
    color: "from-primary to-accent",
    image: "/barberia-elite-demo.jpg",
  },
  {
    title: "Fideliza Plus",
    description: "Sistema completo de puntos y gestión de clientes con integraciones de pagos",
    tech: ["React", "Node.js", "Supabase"],
    demoUrl: "https://fideliza-plus.example",
    githubUrl: "https://github.com/usuario/fideliza-plus",
    color: "from-accent to-secondary",
    image: "/fideliza-plus-demo.jpg",
  },
  {
    title: "Gym System Pro",
    description: "Plataforma de gestión de membresías, usuarios y agendamiento de clases",
    tech: ["React", "Express.js", "MySQL"],
    demoUrl: "https://gym-system.example",
    githubUrl: "https://github.com/usuario/gym-system-pro",
    color: "from-secondary to-primary",
    image: "/gym-system-pro-demo.jpg",
  },
]

export function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  return (
    <section id="projects" className="py-20 sm:py-32 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
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
              Proyectos
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trabajos realizados con diferentes tecnologías
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="group relative bg-card border border-border rounded-xl overflow-hidden 
                         hover:border-primary/80 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] 
                         transition-all duration-300 flex flex-col"
            >
              {/* Glow morado suave */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(60% 60% at 50% 50%, rgba(168,85,247,0.18) 0%, rgba(168,85,247,0.08) 35%, rgba(0,0,0,0) 70%)",
                  filter: "blur(20px)",
                }}
              />

              {/* Imagen */}
              <div className="relative w-full h-48 overflow-hidden bg-muted/30">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              </div>

              {/* Contenido */}
              <div className="p-6 flex flex-col flex-1 gap-4 relative z-10">
                <div>
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-2">{project.description}</p>
                </div>

                {/* Tecnologías */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs font-medium px-3 py-1 bg-primary/20 text-primary rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Botones */}
                <div className="flex gap-3 pt-4 border-t border-border mt-auto">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 
                               bg-gradient-to-r from-primary to-accent text-white rounded-lg 
                               font-medium text-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.35)] 
                               hover:scale-105 transition-all duration-300"
                  >
                    <ExternalLink size={16} />
                    Demo
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 
                               bg-zinc-800/70 text-zinc-200 rounded-lg font-medium text-sm 
                               hover:bg-zinc-700 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] 
                               hover:scale-105 transition-all duration-300"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}