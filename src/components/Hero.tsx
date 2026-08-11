import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

interface Props {
  isMusicPlaying: boolean
  onToggleMusic: () => void
}

function playGong() {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(120, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 2)
    gain.gain.setValueAtTime(0.5, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 2.5)
  } catch (_) {}
}

export default function Hero({ isMusicPlaying, onToggleMusic }: Props) {
  const gongRef = useRef<HTMLDivElement>(null)

  const handleGong = () => {
    playGong()
    if (gongRef.current) {
      gongRef.current.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.3)' },
        { transform: 'scale(0.95)' },
        { transform: 'scale(1)' },
      ], { duration: 400, easing: 'ease-out' })
    }
  }

  return (
    <section
      id="hero_section"
      className="relative min-h-screen w-full flex flex-col justify-between items-center text-white overflow-hidden select-none px-6 pt-20 pb-12"
      style={{ background: 'linear-gradient(to bottom, #1b0305, #3d060c, #120102)' }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
          style={{ backgroundImage: "url('/hero-bg-mobile.jpg')" }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
          style={{ backgroundImage: "url('/hero-bg-desktop.png')" }}
        />
        {/* Overlays */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(18,1,2,0.15) 0%, rgba(18,1,2,0.6) 50%, rgba(18,1,2,0.92) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(60% 50% at 50% 48%, rgba(27,3,5,0.65) 0%, rgba(27,3,5,0.25) 45%, transparent 80%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(27,3,5,0.7), transparent, rgba(18,1,2,0.95))' }} />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: 'radial-gradient(#dfb15b 1px, transparent 1px)', backgroundSize: '20px 20px' }}
        />
        {/* Noise */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")` }}
        />
      </div>

      {/* Decorative bells top */}
      <div className="absolute top-[48px] inset-x-12 z-10 flex justify-around opacity-40 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center select-none"
            style={{
              opacity: 0.15 + (i % 2) * 0.15,
              animation: `swing ${4 + i}s ease-in-out infinite`,
            }}
          >
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-[#dfb15b] to-transparent" />
            <span className="text-[10px] text-[#dfb15b]">🔔</span>
          </div>
        ))}
      </div>

      {/* Ambient dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
        <div className="absolute top-1/3 left-1/5 w-1 h-1 rounded-full bg-[#dfb15b]/80 animate-ping" />
        <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 rounded-full bg-[#dfb15b]/40 blur-[1px] animate-pulse" />
        <div className="absolute bottom-1/3 left-[40%] w-2 h-2 rounded-full bg-[#fbf5df]/30 blur-[1.5px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 rounded-full bg-[#dfb15b]/40 blur-[0.5px] animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Music toggle - top right */}
      <div className="absolute top-8 right-8 md:top-12 md:right-12 z-20">
        <motion.button
          onClick={onToggleMusic}
          className="p-3.5 rounded-full border border-[#dfb15b]/35 bg-[#1b0305]/95 backdrop-blur-md text-[#dfb15b] hover:text-[#fbf5df] hover:border-[#dfb15b]/60 transition-all shadow-[0_6px_20px_rgba(0,0,0,0.5)] cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isMusicPlaying ? 'Mute traditional music' : 'Unmute traditional music'}
        >
          {isMusicPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </motion.button>
      </div>

      {/* Main content */}
      <div className="w-full flex-grow flex flex-col justify-center items-center text-center z-10 max-w-4xl py-6 md:py-12 mt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col items-center w-full"
        >
          {/* TOGETHER WITH FAMILIES */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.95, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-[#dfb15b]/90 tracking-[0.35em] text-[10px] md:text-xs font-sans-luxury uppercase mb-8 font-semibold"
          >
            TOGETHER WITH FAMILIES
          </motion.p>

          {/* Names */}
          <div className="flex flex-col items-center justify-center py-4 w-full px-4 relative z-10">
            <motion.h1
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
              className="font-normal font-wedding-names text-[#fbf5df] tracking-normal leading-none py-3 select-all"
              style={{
                fontSize: 'clamp(4.5rem, 12vw, 9.5rem)',
                textShadow: '0 4px 20px rgba(0,0,0,0.98), 0 2px 4px rgba(0,0,0,0.9)',
              }}
            >
              Anandh
            </motion.h1>

            {/* Gong - clickable & */}
            <motion.div
              ref={gongRef}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.3, delay: 0.9, type: 'spring' }}
              onClick={handleGong}
              className="group relative cursor-pointer my-2 select-none active:scale-90 transition-transform duration-300"
              title="Strike traditional temple gong"
            >
              <div className="absolute inset-x-[-24px] inset-y-[-10px] rounded-full border border-dashed border-[#dfb15b]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110" />
              <h2
                className="text-[#fbf5df] font-wedding-names select-none"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
                  textShadow: '0 4px 10px rgba(0,0,0,0.95)',
                }}
              >
                &
              </h2>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95, y: -15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.7, ease: 'easeOut' }}
              className="font-normal font-wedding-names text-[#fbf5df] tracking-normal leading-none py-3 select-all"
              style={{
                fontSize: 'clamp(4.5rem, 12vw, 9.5rem)',
                textShadow: '0 4px 20px rgba(0,0,0,0.98), 0 2px 4px rgba(0,0,0,0.9)',
              }}
            >
              Vanitha
            </motion.h1>
          </div>

          {/* Quote */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            transition={{ duration: 1.5, delay: 1.3 }}
            className="text-base sm:text-lg md:text-2xl text-[#fbf5df]/92 italic font-quote tracking-normal max-w-xl mt-8 px-6 leading-relaxed"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.85)' }}
          >
            "Two hearts, one beautiful journey."
          </motion.p>

          <div className="h-[1.5px] w-20 bg-gradient-to-r from-transparent via-[#dfb15b]/40 to-transparent my-6" />

          {/* Save the Date + Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.5 }}
            className="flex flex-col items-center gap-4"
          >
            {/* Date badge */}
            <div
              className="relative px-10 py-4 border-t border-b border-[#dfb15b]/50 bg-[#1b0305]/85 backdrop-blur-md flex items-center justify-center gap-5 text-[#fbf5df] font-serif-royal tracking-[0.3em] font-medium rounded-[2px]"
              style={{ boxShadow: '0 10px 35px rgba(0,0,0,0.6)' }}
            >
              <span className="text-[#dfb15b] text-base select-none">✦</span>
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-[8px] font-sans-luxury tracking-[0.5em] text-[#dfb15b]/70 uppercase">Save the Date</span>
                <span className="text-base sm:text-lg md:text-xl tracking-[0.3em]">30 · AUGUST · 2026</span>
              </div>
              <span className="text-[#dfb15b] text-base select-none">✦</span>
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#dfb15b]/70" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#dfb15b]/70" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#dfb15b]/70" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#dfb15b]/70" />
            </div>

            {/* Google Calendar pill */}
            <motion.a
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Anandh+%26+Vanitha%27s+Sacred+Muhurtham&dates=20260830T043000Z%2F20260830T050000Z&details=You+are+cordially+invited+to+celebrate+the+sacred+wedding+ceremonies+of+Anandh+and+Vanitha.&location=Kumaran+Mahal+A%2FC%2C+Mariyamman+Kovil+Vasal%2C+Thiruvappur%2C+Pudukkottai%2C+Tamil+Nadu+622005&sf=true&output=xml"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(223,177,91,0.3)' }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#dfb15b]/35 hover:border-[#dfb15b]/80 text-[#dfb15b] hover:text-[#fbf5df] font-sans-luxury text-[9px] sm:text-[10px] tracking-[0.18em] uppercase transition-all duration-300"
              style={{
                background: 'linear-gradient(to right, #2c0407, #120102)',
                boxShadow: '0 5px 15px rgba(0,0,0,0.4)',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Add to Google Calendar
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
