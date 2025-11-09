// src/components/contact.jsx
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Instagram } from "lucide-react"

export function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "mcoloma@mifaelwebstudio.com",
      href: "mailto:mcoloma@mifaelwebstudio.com",
    },
    {
      icon: Phone,
      label: "Teléfono",
      value: "+56 9 4545 6499",
      href: "tel:+56945456499",
    },
    {
      icon: Globe,
      label: "Website",
      value: "mifaelwebstudio.com",
      href: "https://mifaelwebstudio.com",
    },
    {
      icon: MapPin,
      label: "Ubicación",
      value: "Chile",
      href: "#",
    },
  ]

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/matias-sepulveda-abqo00",
      label: "LinkedIn",
    },
    {
      icon: Github,
      href: "https://github.com/Abaquio",
      label: "GitHub",
    },

  ]

  const handleReferralEmail = () => {
    const email = "mcoloma@mifaelwebstudio.com"
    const subject = encodeURIComponent("Referencia para Matías Sepúlveda")
    const body = encodeURIComponent(
      "Hola,\n\nTengo una recomendación de cliente para Matías Sepúlveda.\n\nSaludos."
    )
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="py-20 sm:py-32 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            ¿Quieres <span className="text-primary">Recomendarme?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Trabajo con <span className="font-semibold text-foreground">Mifael Web Studio</span>. Si buscas un
            desarrollador confiable para tu proyecto, conversemos.
          </p>
        </motion.div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
          {contactInfo.map((info, idx) => {
            const Icon = info.icon
            return (
              <motion.a
                key={idx}
                href={info.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-muted-foreground">{info.label}</p>
                    <p className="text-foreground font-semibold truncate group-hover:text-primary transition-colors">
                      {info.value}
                    </p>
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <button
            onClick={handleReferralEmail}
            className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105 inline-block"
          >
            Referir cliente a Matías
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4"
        >
          {socialLinks.map((social, idx) => {
            const Icon = social.icon
            return (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-3 bg-card border border-border rounded-lg hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
              >
                <Icon className="w-5 h-5 text-foreground hover:text-primary transition-colors" />
              </a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}