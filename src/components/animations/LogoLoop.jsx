import { useCallback, useEffect, useMemo, useRef, useState, memo } from "react"
import "./LogoLoop.css"

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 }
const toCssLength = (v) => (typeof v === "number" ? `${v}px` : v ?? undefined)

const useResizeObserver = (callback, elements, deps) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const onResize = () => callback()
      window.addEventListener("resize", onResize)
      callback()
      return () => window.removeEventListener("resize", onResize)
    }
    const obs = elements.map((ref) => {
      if (!ref.current) return null
      const o = new ResizeObserver(callback)
      o.observe(ref.current)
      return o
    })
    callback()
    return () => obs.forEach((o) => o?.disconnect())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

const useImageLoader = (seqRef, onLoad, deps) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll("img") ?? []
    if (images.length === 0) { onLoad(); return }
    let remaining = images.length
    const done = () => { remaining -= 1; if (remaining === 0) onLoad() }
    images.forEach((img) => {
      if (img.complete) done()
      else {
        img.addEventListener("load", done, { once: true })
        img.addEventListener("error", done, { once: true })
      }
    })
    return () => images.forEach((img) => {
      img.removeEventListener("load", done)
      img.removeEventListener("error", done)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

const useAnimationLoop = (trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover) => {
  const rafRef = useRef(null)
  const lastRef = useRef(null)
  const offsetRef = useRef(0)
  const velocityRef = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    if (seqWidth > 0) {
      offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth
      track.style.transform = `translate3d(${-offsetRef.current}px,0,0)`
    }

    const animate = (ts) => {
      if (lastRef.current === null) lastRef.current = ts
      const dt = Math.max(0, ts - lastRef.current) / 1000
      lastRef.current = ts

      const target = pauseOnHover && isHovered ? 0 : targetVelocity
      const ease = 1 - Math.exp(-dt / ANIMATION_CONFIG.SMOOTH_TAU)
      velocityRef.current += (target - velocityRef.current) * ease

      if (seqWidth > 0) {
        let next = offsetRef.current + velocityRef.current * dt
        next = ((next % seqWidth) + seqWidth) % seqWidth
        offsetRef.current = next
        track.style.transform = `translate3d(${-offsetRef.current}px,0,0)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); lastRef.current = null }
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover, trackRef])
}

export const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = "left",
  width = "100%",
  logoHeight = 28,
  gap = 32,
  pauseOnHover = false,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  ariaLabel = "Partner logos",
  className,
  style,
}) {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const seqRef = useRef(null)

  const [seqWidth, setSeqWidth] = useState(0)
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES)
  const [isHovered, setIsHovered] = useState(false)

  const targetVelocity = useMemo(() => {
    const mag = Math.abs(speed)
    const dir = direction === "left" ? 1 : -1
    const mult = speed < 0 ? -1 : 1
    return mag * dir * mult
  }, [speed, direction])

  const updateDims = useCallback(() => {
    const containerW = containerRef.current?.clientWidth ?? 0
    const sequenceW = seqRef.current?.getBoundingClientRect?.()?.width ?? 0
    if (sequenceW > 0) {
      setSeqWidth(Math.ceil(sequenceW))
      const copies = Math.ceil(containerW / sequenceW) + ANIMATION_CONFIG.COPY_HEADROOM
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copies))
    }
  }, [])

  useResizeObserver(updateDims, [containerRef, seqRef], [logos, gap, logoHeight])
  useImageLoader(seqRef, updateDims, [logos, gap, logoHeight])
  useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover)

  const cssVars = useMemo(() => ({
    "--logoloop-gap": `${gap}px`,
    "--logoloop-logoHeight": `${logoHeight}px`,
    ...(fadeOutColor && { "--logoloop-fadeColor": fadeOutColor }),
  }), [gap, logoHeight, fadeOutColor])

  const rootClass = useMemo(() =>
    ["logoloop", fadeOut && "logoloop--fade", scaleOnHover && "logoloop--scale-hover", className]
      .filter(Boolean).join(" "), [fadeOut, scaleOnHover, className])

  const onEnter = useCallback(() => pauseOnHover && setIsHovered(true), [pauseOnHover])
  const onLeave = useCallback(() => pauseOnHover && setIsHovered(false), [pauseOnHover])

  const renderItem = useCallback((item, key) => {
    const isNode = "node" in item
    const content = isNode
      ? <span className="logoloop__node" aria-hidden={!!item.href && !item.ariaLabel}>{item.node}</span>
      : <img src={item.src} srcSet={item.srcSet} sizes={item.sizes} width={item.width} height={item.height}
             alt={item.alt ?? ""} title={item.title} loading="lazy" decoding="async" draggable={false} />

    const label = isNode ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title)

    const inside = item.href ? (
      <a className="logoloop__link" href={item.href} aria-label={label || "logo link"} target="_blank" rel="noreferrer noopener">
        {content}
      </a>
    ) : content

    return <li className="logoloop__item" key={key} role="listitem">{inside}</li>
  }, [])

  const lists = useMemo(() =>
    Array.from({ length: copyCount }, (_, i) => (
      <ul className="logoloop__list" key={`copy-${i}`} role="list" aria-hidden={i > 0} ref={i === 0 ? seqRef : undefined}>
        {logos.map((item, j) => renderItem(item, `${i}-${j}`))}
      </ul>
    )), [copyCount, logos, renderItem])

  const containerStyle = useMemo(() => ({ width: toCssLength(width) ?? "100%", ...cssVars, ...style }), [width, cssVars, style])

  return (
    <div ref={containerRef} className={rootClass} style={containerStyle} role="region" aria-label={ariaLabel}
         onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div className="logoloop__track" ref={trackRef}>{lists}</div>
    </div>
  )
})

export default LogoLoop