// src/components/animations/DecryptedText.jsx
import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

const styles = {
  wrapper: { display: "inline-block", whiteSpace: "pre-wrap" },
  srOnly: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    border: 0,
  },
}

/**
 * animateOn:
 *  - "hover"           → solo al pasar el mouse
 *  - "view"            → una sola vez al entrar al viewport
 *  - "view-repeat"     → se reinicia cada vez que entra al viewport
 *  - "both"            → hover + una vez al entrar
 *  - "both-repeat"     → hover + reinicio en cada entrada
 */
export default function DecryptedText({
  text,
  speed = 200,
  maxIterations = 10,
  sequential = true,
  revealDirection = "start", // 'start' | 'end' | 'center'
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  ...props
}) {
  const [displayText, setDisplayText] = useState(text)
  const [isHovering, setIsHovering] = useState(false)
  const [isScrambling, setIsScrambling] = useState(false)
  const [revealedIndices, setRevealedIndices] = useState(new Set())

  // clave para “reiniciar” el efecto de forma confiable
  const runTokenRef = useRef(0)
  const containerRef = useRef(null)

  // función robusta para reiniciar y lanzar
  const triggerRun = () => {
    runTokenRef.current += 1
    setIsHovering(false)                // aseguro transición a “off”
    setIsScrambling(false)
    setRevealedIndices(new Set())
    setDisplayText(text)

    // dos RAF para garantizar flush de estados y layout antes de reactivar
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsHovering(true))
    })
  }

  // core de mezcla / revelado
  useEffect(() => {
    let interval
    let currentIteration = 0
    const tokenAtStart = runTokenRef.current

    const getNextIndex = (revealedSet) => {
      const n = text.length
      switch (revealDirection) {
        case "start":
          return revealedSet.size
        case "end":
          return n - 1 - revealedSet.size
        case "center": {
          const mid = Math.floor(n / 2)
          const offset = Math.floor(revealedSet.size / 2)
          const next = revealedSet.size % 2 === 0 ? mid + offset : mid - offset - 1
          if (next >= 0 && next < n && !revealedSet.has(next)) return next
          for (let i = 0; i < n; i++) if (!revealedSet.has(i)) return i
          return 0
        }
        default:
          return revealedSet.size
      }
    }

    const available = useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter((c) => c !== " ")
      : characters.split("")

    const shuffleText = (original, currentRevealed) => {
      if (useOriginalCharsOnly) {
        const pos = original.split("").map((char, i) => ({
          char,
          isSpace: char === " ",
          index: i,
          isRevealed: currentRevealed.has(i),
        }))
        const bag = pos.filter((p) => !p.isSpace && !p.isRevealed).map((p) => p.char)
        for (let i = bag.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[bag[i], bag[j]] = [bag[j], bag[i]]
        }
        let k = 0
        return pos
          .map((p) => {
            if (p.isSpace) return " "
            if (p.isRevealed) return original[p.index]
            return bag[k++]
          })
          .join("")
      } else {
        return original
          .split("")
          .map((char, i) => {
            if (char === " ") return " "
            if (currentRevealed.has(i)) return original[i]
            return available[Math.floor(Math.random() * available.length)]
          })
          .join("")
      }
    }

    if (isHovering) {
      setIsScrambling(true)
      interval = setInterval(() => {
        // si cambió el token (nuevo run), cancelo este ciclo
        if (tokenAtStart !== runTokenRef.current) {
          clearInterval(interval)
          return
        }

        setRevealedIndices((prev) => {
          if (sequential) {
            if (prev.size < text.length) {
              const nextIndex = getNextIndex(prev)
              const nextSet = new Set(prev)
              nextSet.add(nextIndex)
              setDisplayText(shuffleText(text, nextSet))
              return nextSet
            } else {
              clearInterval(interval)
              setIsScrambling(false)
              return prev
            }
          } else {
            setDisplayText(shuffleText(text, prev))
            currentIteration++
            if (currentIteration >= maxIterations) {
              clearInterval(interval)
              setIsScrambling(false)
              setDisplayText(text)
            }
            return prev
          }
        })
      }, speed)
    } else {
      // reset visual mientras no está corriendo
      setDisplayText(text)
      setRevealedIndices(new Set())
      setIsScrambling(false)
    }

    return () => interval && clearInterval(interval)
  }, [
    isHovering,
    text,
    speed,
    maxIterations,
    sequential,
    revealDirection,
    characters,
    useOriginalCharsOnly,
  ])

  // IntersectionObserver con modo repeat realmente fiable
  useEffect(() => {
    const enableView =
      animateOn === "view" ||
      animateOn === "both" ||
      animateOn === "view-repeat" ||
      animateOn === "both-repeat"
    if (!enableView) return

    const repeat = animateOn === "view-repeat" || animateOn === "both-repeat"

    const cb = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // siempre lanzo un nuevo run para asegurar reinicio
          triggerRun()
        } else if (repeat) {
          // al salir no hago nada especial: triggerRun() se encargará al re-entrar
          setIsHovering(false)
        }
      })
    }

    // rootMargin negativo hace que “salir” ocurra antes (útil con header fijo)
    const obs = new IntersectionObserver(cb, {
      root: null,
      rootMargin: "-15% 0px -15% 0px",
      threshold: 0.25,
    })
    const node = containerRef.current
    if (node) obs.observe(node)
    return () => node && obs.unobserve(node)
  }, [animateOn])

  const hoverProps =
    animateOn === "hover" || animateOn === "both" || animateOn === "both-repeat"
      ? { onMouseEnter: () => triggerRun(), onMouseLeave: () => setIsHovering(false) }
      : {}

  // Si cambia el texto externamente, reseteo
  useEffect(() => {
    runTokenRef.current += 1
    setDisplayText(text)
    setRevealedIndices(new Set())
    setIsScrambling(false)
    setIsHovering(false)
  }, [text])

  return (
    <motion.span
      className={parentClassName}
      ref={containerRef}
      style={styles.wrapper}
      {...hoverProps}
      {...props}
    >
      <span style={styles.srOnly}>{displayText}</span>
      <span aria-hidden="true">
        {displayText.split("").map((char, i) => {
          const revealed = revealedIndices.has(i) || !isScrambling || !isHovering
          return (
            <span key={i} className={revealed ? className : encryptedClassName}>
              {char}
            </span>
          )
        })}
      </span>
    </motion.span>
  )
}