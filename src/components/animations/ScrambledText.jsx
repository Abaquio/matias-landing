import { useEffect, useRef, useState } from "react"
import "./ScrambledText.css"

/**
 * ScrambledText
 * - Efecto de “scramble” por carácter cuando el puntero pasa cerca.
 * - No requiere GSAP ni plugins de pago; sin dependencias externas.
 *
 * Props:
 *  radius         => px alrededor del puntero que activa el efecto (default 100)
 *  duration       => segundos que dura el scramble de cada letra (default 1.2)
 *  speed          => cambios por segundo por letra (default 20–30 se siente bien)
 *  scrambleChars  => string de caracteres a usar durante el scramble
 *  className      => clases para el contenedor del párrafo
 *  style          => estilos inline opcionales
 *  children       => texto (string) a mostrar
 */
export default function ScrambledText({
  radius = 100,
  duration = 1.2,
  speed = 30,
  scrambleChars = ".:",
  className = "",
  style = {},
  children,
}) {
  const rootRef = useRef(null)
  const [chars, setChars] = useState([])

  // refs por carácter para hacer el scramble sin re-render
  const refs = useRef([])
  const animState = useRef([]) // por índice: {running:boolean, rafId:number, tEnd:number, lastTick:number}

  useEffect(() => {
    const text = typeof children === "string" ? children : String(children)
    const arr = Array.from(text) // respeta tildes/emojis
    setChars(arr)
  }, [children])

  // Inicializa arrays de control cuando cambia la longitud
  useEffect(() => {
    refs.current = Array(chars.length)
      .fill(null)
      .map((_, i) => refs.current[i] || null)
    animState.current = Array(chars.length)
      .fill(null)
      .map(() => ({ running: false, rafId: 0, tEnd: 0, lastTick: 0 }))
  }, [chars.length])

  const startScrambleFor = (i) => {
    const el = refs.current[i]
    if (!el || animState.current[i].running) return

    const original = el.dataset.original || el.textContent
    const state = animState.current[i]
    state.running = true
    state.tEnd = performance.now() + duration * 1000
    state.lastTick = 0

    const tickInterval = 1000 / Math.max(1, speed)
    const pool = scrambleChars.split("")

    const loop = (now) => {
      if (!el) return
      if (now >= state.tEnd) {
        el.textContent = original
        state.running = false
        state.rafId = 0
        return
      }
      if (now - state.lastTick >= tickInterval) {
        // cambia por un char del pool (mantén espacios)
        if (original !== " ") {
          const r = pool[Math.floor(Math.random() * pool.length)] || original
          el.textContent = r
        }
        state.lastTick = now
      }
      state.rafId = requestAnimationFrame(loop)
    }
    state.rafId = requestAnimationFrame(loop)
  }

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const onMove = (e) => {
      refs.current.forEach((span, i) => {
        if (!span) return
        const rect = span.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const dist = Math.hypot(dx, dy)
        if (dist < radius) startScrambleFor(i)
      })
    }
    el.addEventListener("pointermove", onMove)
    return () => el.removeEventListener("pointermove", onMove)
  }, [radius, duration, speed, scrambleChars])

  return (
    <div ref={rootRef} className={className} style={style}>
      <p>
        {chars.map((ch, i) => (
          <span
            key={i}
            ref={(r) => (refs.current[i] = r)}
            data-original={ch}
            className="scramble-char"
          >
            {ch}
          </span>
        ))}
      </p>
    </div>
  )
}