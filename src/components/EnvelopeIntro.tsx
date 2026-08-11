import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onOpen: () => void
}

function Particles({ count = 45 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? Math.min(count, 15) : count

    const resize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    resize()

    type PType = 'rose' | 'jasmine' | 'sparkle'

    interface Particle {
      x: number; y: number; size: number; angle: number
      speedX: number; speedY: number; rotSpeed: number
      type: PType; opacity: number
    }

    const create = (w: number, h: number, init = false): Particle => {
      const r = Math.random()
      let type: PType = 'rose'
      if (r > 0.7) type = 'jasmine'
      if (r > 0.85) type = 'sparkle'
      return {
        x: Math.random() * w,
        y: init ? Math.random() * h : -20,
        size: type === 'sparkle' ? Math.random() * 2 + 1 : Math.random() * 12 + 8,
        angle: Math.random() * 360,
        speedX: Math.random() * 0.6 - 0.3,
        speedY: type === 'sparkle' ? Math.random() * 0.3 + 0.2 : Math.random() * 1 + 0.5,
        rotSpeed: Math.random() * 0.015 - 0.0075,
        type,
        opacity: Math.random() * 0.4 + 0.3,
      }
    }

    const particles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      particles.push(create(canvas.width, canvas.height, true))
    }

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.speedX
        p.y += p.speedY
        p.angle += p.rotSpeed * 180 / Math.PI

        if (p.y > canvas.height + 20) {
          particles[i] = create(canvas.width, canvas.height)
        }

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle * Math.PI / 180)
        ctx.globalAlpha = p.opacity

        if (p.type === 'rose') {
          ctx.beginPath()
          ctx.moveTo(0, 0)
          ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size, p.size / 3, 0, p.size)
          ctx.bezierCurveTo(p.size, p.size / 3, p.size / 2, -p.size / 2, 0, 0)
          const g = ctx.createRadialGradient(-2, p.size / 3, 1, 0, p.size / 2, p.size)
          g.addColorStop(0, '#e11d48')
          g.addColorStop(0.5, '#be123c')
          g.addColorStop(1, '#6b071a')
          ctx.fillStyle = g
          ctx.fill()
        } else if (p.type === 'jasmine') {
          for (let j = 0; j < 4; j++) {
            ctx.rotate(Math.PI / 2)
            ctx.beginPath()
            ctx.ellipse(0, p.size / 2.5, p.size / 4, p.size / 2.5, 0, 0, Math.PI * 2)
            ctx.fillStyle = 'rgba(255,250,240,0.85)'
            ctx.fill()
          }
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(223,177,91,${p.opacity * 0.8})`
          ctx.fill()
        }

        ctx.restore()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => cancelAnimationFrame(raf)
  }, [count])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-[1]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

export default function EnvelopeIntro({ onOpen }: Props) {
  const [sealed, setSealed] = useState(false)
  const [device, setDevice] = useState<'mobile' | 'desktop'>('desktop')

  useEffect(() => {
    const check = () => setDevice(window.innerWidth < 768 ? 'mobile' : 'desktop')
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleSeal = () => {
    if (sealed) return
    setSealed(true)
    setTimeout(() => onOpen(), 2200)
  }

  return (
    <div
      id="intro_screen_container"
      className="fixed inset-0 h-screen w-screen z-50 overflow-hidden bg-black select-none"
    >
      {/* Gopuram background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.02 }}
        animate={{ scale: sealed ? 1.09 : 1.03, opacity: sealed ? 0 : 1 }}
        transition={{ duration: sealed ? 2.2 : 20, ease: 'easeInOut', repeat: sealed ? 0 : Infinity, repeatType: 'mirror' }}
      >
        <img
          src={device === 'mobile' ? '/gopuram-mobile.png' : '/gopuram-desktop.png'}
          alt="Royal Tamil Gopuram Landscape"
          className="w-full h-full object-cover pointer-events-none"
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2c0408]/90 via-[#320308]/20 to-black/50" />
        {/* Warm glow */}
        <div className="absolute inset-x-0 bottom-1/4 h-1/3 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(223,177,91,0.2) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </motion.div>

      {/* Cloud overlays - desktop only */}
      {device !== 'mobile' && (
        <div className="absolute inset-0 pointer-events-none z-10 mix-blend-screen opacity-40">
          <motion.div
            className="absolute w-[200vw] h-[50vh]"
            style={{ top: '10%', background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }}
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute w-[200vw] h-[40vh]"
            style={{ bottom: '20%', background: 'radial-gradient(ellipse at center, rgba(223,177,91,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }}
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      )}

      {/* Particles */}
      <Particles count={device === 'mobile' ? 25 : 55} />

      {/* Top header - "शुभ विवाह" */}
      <div className="absolute top-12 inset-x-0 flex flex-col items-center justify-center text-center z-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-3 mb-1">
            <span className="h-px w-8" style={{ background: 'linear-gradient(to right, transparent, #dfb15b)' }} />
            <span className="text-[#dfb15b] text-lg md:text-2xl font-sans-luxury tracking-[0.5em] uppercase">அன்பின் பயணம்</span>
            <span className="h-px w-8" style={{ background: 'linear-gradient(to left, transparent, #dfb15b)' }} />
          </div>
          {/* <span
            className="text-[#dfb15b] text-lg md:text-2xl tracking-[0.15em] font-serif-royal"
            style={{ textShadow: '0 2px 8px rgba(223,177,91,0.4)' }}
          >
            அன்பின் பயணம்
          </span> */}
        </motion.div>
      </div>

      {/* Bottom - Wax Seal */}
      <div className="absolute bottom-30 inset-x-0 flex flex-col items-center justify-center z-30 px-6 text-center">
        <div className="relative flex items-center justify-center">
          {/* Corona / glow ring */}
          <AnimatePresence>
            {!sealed && (
              <>
                <motion.div
                  className="absolute w-44 h-44 rounded-full -z-10 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(223,177,91,0.25) 0%, transparent 70%)' }}
                  animate={{ scale: [0.95, 1.15, 0.95], opacity: [0.6, 0.9, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute w-36 h-36 rounded-full border border-dashed border-[#dfb15b]/20 pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                />
              </>
            )}
          </AnimatePresence>

          {/* Golden burst on unlock */}
          <AnimatePresence>
            {sealed && (
              <motion.div
                className="absolute w-[400vmax] h-[400vmax] rounded-full -z-20 pointer-events-none mix-blend-screen"
                style={{ background: 'radial-gradient(circle, rgba(223,177,91,0.8) 0%, #fbf5df 40%, rgba(223,177,91,0.9) 100%)' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, ease: 'easeOut' }}
              />
            )}
          </AnimatePresence>

          {/* Wax Seal Button */}
          <motion.button
            id="grand_ganesha_wax_seal"
            onClick={handleSeal}
            disabled={sealed}
            aria-label="Crack royal wax seal"
            className="group relative cursor-pointer outline-none select-none touch-manipulation focus:scale-105 active:scale-95 transition-transform duration-300"
            animate={sealed ? {
              scale: [1, 0.93, 2.5],
              rotate: [0, -12, 12, -6, 6, 0],
              opacity: [1, 1, 0],
              filter: [
                'drop-shadow(0 0 10px rgba(223,177,91,0.5))',
                'drop-shadow(0 0 50px rgba(251,245,223,1))',
                'drop-shadow(0 0 5px rgba(0,0,0,0))',
              ],
            } : { y: [0, -4, 0] }}
            transition={sealed ? {
              scale: { duration: 1.8, ease: 'linear' },
              rotate: { duration: 0.6, ease: 'easeInOut' },
              opacity: { duration: 1.8, delay: 0.2, ease: 'easeIn' },
              filter: { duration: 1.8, ease: 'linear' },
            } : { y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
          >
            <div
              className="w-28 h-28 md:w-32 md:h-32 rounded-[52%_48%_55%_45%/_48%_52%_45%_55%] p-2 relative flex items-center justify-center select-none overflow-hidden group-hover:rotate-6 transition-transform duration-500"
              style={{
                background: 'linear-gradient(135deg, #800b14, #540c14, #2c0408)',
                boxShadow: 'inset 2px 2px 8px rgba(255,255,255,0.2), inset -2px -2px 8px rgba(0,0,0,0.6), 0 10px 25px rgba(0,0,0,0.6), 0 0 15px rgba(84,12,20,0.4)',
                border: '1px solid rgba(168,28,40,0.4)',
              }}
            >
              {/* Highlight gloss */}
              <div className="absolute top-1 left-2 w-16 h-12 rounded-[50%] pointer-events-none -rotate-12" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)', filter: 'blur(1px)' }} />
              <div className="absolute inset-2 border border-dashed border-[#dfb15b]/25 rounded-full pointer-events-none opacity-45" />
              {/* Inner circle */}
              <div
                className="w-[84%] h-[84%] rounded-full flex items-center justify-center relative"
                style={{
                  background: 'linear-gradient(135deg, #4a0209, #6e0d16, #8c1822)',
                  boxShadow: 'inset 1px 1px 4px rgba(0,0,0,0.8), 1px 1px 3px rgba(255,255,255,0.1)',
                }}
              >
                <svg viewBox="0 0 100 100" className="w-[74%] h-[74%] fill-none" style={{ color: '#dfb15b', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6))' }}>
                  {/* Crown */}
                  <polygon points="50,12 44,26 56,26" fill="#dfb15b" opacity="0.9" />
                  {/* Side flourishes */}
                  <path d="M 44 26 C 30 24, 25 36, 42 42" stroke="#dfb15b" strokeWidth="2.5" />
                  <path d="M 56 26 C 70 24, 75 36, 58 42" stroke="#dfb15b" strokeWidth="2.5" />
                  {/* Center shaft */}
                  <line x1="50" y1="26" x2="50" y2="33" stroke="#dfb15b" strokeWidth="2.5" />
                  <line x1="47" y1="28" x2="53" y2="28" stroke="#dfb15b" strokeWidth="2" />
                  {/* Bottom flourish */}
                  <path d="M 50 31 C 41 33, 41 50, 47 52 C 51 53, 58 48, 59 55 C 60 62, 45 68, 42 63" stroke="#dfb15b" strokeWidth="1.8" fill="none" />
                  <ellipse cx="40" cy="64" rx="2" ry="2" fill="#dfb15b" opacity="0.6" />
                  {/* Side dots */}
                  <line x1="45" y1="40" x2="41" y2="41" stroke="#dfb15b" strokeWidth="1.5" />
                  <line x1="55" y1="40" x2="60" y2="41" stroke="#dfb15b" strokeWidth="1.5" />
                  {/* Bottom arc */}
                  <path d="M 33 55 C 25 65, 32 78, 50 78 C 68 78, 75 65, 67 55" stroke="#dfb15b" strokeWidth="1.8" fill="none" />
                </svg>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Tap label */}
        <motion.div
          className="mt-6 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: sealed ? 0 : 1 }}
        >
          <p className="text-[#dfb15b] text-[10px] md:text-xs tracking-[0.45em] font-sans-luxury uppercase font-semibold animate-pulse">
            Tap to Open the Invitation
          </p>
          <div className="flex items-center gap-2">
            <span className="h-px w-8" style={{ background: 'linear-gradient(to right, transparent, rgba(223,177,91,0.6))' }} />
            <span className="text-[#dfb15b]/40 text-[8px]">✦</span>
            <span className="h-px w-8" style={{ background: 'linear-gradient(to left, transparent, rgba(223,177,91,0.6))' }} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
