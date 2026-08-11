import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface TimeLeft {
  days: number; hours: number; minutes: number; seconds: number
}

function getTimeLeft(): TimeLeft {
  const wedding = new Date('2026-08-30T10:00:00').getTime()
  const diff = Math.max(0, wedding - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

function TimeUnit({ label, value, delay }: { label: string; value: number; delay: number }) {
  const prev = useRef(value)
  const [flip, setFlip] = useState(false)

  useEffect(() => {
    if (prev.current !== value) {
      setFlip(true)
      const t = setTimeout(() => setFlip(false), 300)
      prev.current = value
      return () => clearTimeout(t)
    }
  }, [value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className="flex flex-col items-center"
    >
      <div
        className="w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full p-[3px] relative flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #dfb15b, #3d060c, #b38428)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
        }}
      >
        <div
          className="w-full h-full rounded-full flex flex-col items-center justify-center p-2 text-center relative"
          style={{ background: 'linear-gradient(135deg, #21030a, #120102)' }}
        >
          <div className="absolute inset-1.5 sm:inset-2 border border-[#dfb15b]/15 rounded-full pointer-events-none" />
          <motion.span
            key={value}
            initial={flip ? { opacity: 0, y: -8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif-royal font-bold leading-none"
            style={{ color: '#dfb15b', textShadow: '0 0 20px rgba(223,177,91,0.5)' }}
          >
            {String(value).padStart(2, '0')}
          </motion.span>
          <span className="text-[8px] sm:text-[10px] font-sans-luxury tracking-[0.2em] uppercase mt-1" style={{ color: '#dfb15b', opacity: 0.6 }}>
            {label}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft())
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    const t = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      id="countdown_section"
      className="relative min-h-screen w-full flex flex-col justify-center items-center text-white py-24 px-4 overflow-hidden select-none"
      style={{ background: 'linear-gradient(to bottom, #1b0305, #3d060c, #120102)' }}
    >
      {/* Border frames */}
      <div className="absolute inset-4 sm:inset-6 md:inset-8 border border-[#dfb15b]/15 pointer-events-none z-10" />
      <div className="absolute inset-5 sm:inset-8 md:inset-[38px] border-2 border-double border-[#dfb15b]/10 pointer-events-none z-10" />
      {/* Glow center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(223,177,91,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-[-150px] left-1/4 w-[400px] h-[400px] opacity-[0.05] bg-[#dfb15b] rounded-full pointer-events-none" style={{ filter: 'blur(100px)' }} />

      <div ref={ref} className="relative w-full max-w-4xl z-10 flex flex-col items-center mb-12 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="flex flex-col items-center w-full"
        >
          <div className="flex items-center gap-3 mb-2 text-[#dfb15b]/90">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-[#dfb15b]" />
            <span className="text-[10px] tracking-[0.3em] font-sans-luxury uppercase font-medium">SHUBHA MUHURTHAM</span>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-[#dfb15b]" />
          </div>
          <h2
            className="font-calligraphy text-[#dfb15b] mb-2 pt-4"
            style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', textShadow: '0 2px 12px rgba(223,177,91,0.35)' }}
          >
            The Auspicious Countdown
          </h2>
          <p className="text-base sm:text-lg text-[#faf6f0]/85 italic font-quote max-w-lg leading-relaxed tracking-wide px-4">
            "Under the divine canopy of stars, we count down the moments leading to a beautiful lifetime together."
          </p>

          <div className="flex items-center gap-3 my-4 max-w-[280px] w-full opacity-80">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #dfb15b)' }} />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" fill="#dfb15b" opacity="0.6" />
            </svg>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #dfb15b)' }} />
          </div>
        </motion.div>
      </div>

      {/* Time units grid */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full max-w-4xl px-4 sm:px-6">
        <TimeUnit label="DAYS" value={time.days} delay={0} />
        <TimeUnit label="HOURS" value={time.hours} delay={0.1} />
        <TimeUnit label="MINUTES" value={time.minutes} delay={0.2} />
        <TimeUnit label="SECONDS" value={time.seconds} delay={0.3} />
      </div>
    </section>
  )
}
