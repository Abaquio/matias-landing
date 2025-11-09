// src/App.jsx
import { Header } from "./components/header"
import { Hero } from "./components/hero"
import { Skills } from "./components/skills"
import { Projects } from "./components/projects"
import { AboutMe } from "./components/about-me"
import { Contact } from "./components/contact"
import { Footer } from "./components/footer"

export default function App() {
  return (
    <main className="w-full overflow-hidden bg-background text-foreground">
      {/* HEADER */}
      <Header />

      {/* HERO / INICIO */}
      <Hero />

      {/* COMPETENCIAS */}
      <Skills />

      {/* PROYECTOS */}
      <Projects />

      {/* SOBRE MÍ */}
      <AboutMe />

      {/* CONTACTO */}
      <Contact />

      {/* FOOTER */}
      <Footer />
    </main>
  )
}