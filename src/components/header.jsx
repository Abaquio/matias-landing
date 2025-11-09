// src/components/header.jsx
import { useState } from "react"
import { motion } from "framer-motion"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { label: "Inicio", href: "#hero" },
    { label: "Competencias", href: "#skills" },
    { label: "Proyectos", href: "#projects" },
    { label: "Contacto", href: "#contact" },
  ]

  const handleSmoothScroll = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo/Nombre */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl font-bold text-primary"
        >
          Mifael Web Studio
        </motion.div>

        {/* Desktop Menu */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden md:flex items-center gap-8"
        >
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSmoothScroll(item.href)}
              className="text-foreground hover:text-primary transition-colors relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => handleSmoothScroll("#contact")}
          className="hidden sm:block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
        >
          Contactame
        </motion.button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1 p-2"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-foreground transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-foreground transition-all ${isMenuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-foreground transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-card border-b border-border p-4 flex flex-col gap-4"
        >
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSmoothScroll(item.href)}
              className="text-foreground hover:text-primary transition-colors text-left"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleSmoothScroll("#contact")}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg transition-all mt-2"
          >
            Recomiéndame
          </button>
        </motion.div>
      )}
    </header>
  )
}