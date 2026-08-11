import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function GoldDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 my-4 ${className}`}>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #dfb15b, transparent)' }} />
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" fill="#dfb15b" opacity="0.6" />
      </svg>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #dfb15b, transparent)' }} />
    </div>
  )
}

export default function Families() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="parents_section"
      className="relative min-h-screen w-full flex flex-col justify-center items-center text-white py-24 px-6 md:px-12 overflow-hidden select-none"
      style={{ background: '#01140d' }}
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(1,24,16,0.95), #023321, #01140d)' }} />
        {/* Side gold bars */}
        <div className="absolute top-0 bottom-0 left-0 w-2 md:w-4 opacity-30 border-r border-[#dfb15b]/20" style={{ background: 'linear-gradient(to bottom, rgba(223,177,91,0.2), rgba(223,177,91,0.4))' }} />
        <div className="absolute top-0 bottom-0 right-0 w-2 md:w-4 opacity-30 border-l border-[#dfb15b]/20" style={{ background: 'linear-gradient(to bottom, rgba(223,177,91,0.2), rgba(223,177,91,0.4))' }} />
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(223,177,91,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      <div className="relative w-full max-w-5xl z-10 flex flex-col items-center">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="flex flex-col items-center mb-10 text-center"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="h-px w-6 bg-[#dfb15b]/30" />
            <span className="text-xs tracking-[0.3em] font-sans-luxury uppercase text-[#dfb15b]">Mangala Shubh</span>
            <span className="h-px w-6 bg-[#dfb15b]/30" />
          </div>
          <h2
            className="font-calligraphy text-[#dfb15b] pt-4"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', textShadow: '0 2px 12px rgba(223,177,91,0.4)' }}
          >
            Family & Blessings
          </h2>
          <GoldDivider />
        </motion.div>

        <div className="w-full flex flex-col items-center text-center">
          {/* Ancestor blessing */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.85 } : {}}
            transition={{ duration: 1.2 }}
            className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#dfb15b]/90 font-sans-luxury mb-12 font-semibold"
          >
            ✦&nbsp;&nbsp;&nbsp;With the divine blessings of our ancestors&nbsp;&nbsp;&nbsp;✦
          </motion.p>

          {/* Parents grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 w-full max-w-4xl relative mb-16 px-4">
            {/* Center divider line - desktop only */}
            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2" style={{ background: 'linear-gradient(to bottom, rgba(223,177,91,0.1), rgba(223,177,91,0.35), rgba(223,177,91,0.1))' }} />

            {/* Groom's parents */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <div
                className="w-10 h-10 rounded-full border border-[#dfb15b]/30 flex items-center justify-center mb-6 text-[#dfb15b] opacity-80 backdrop-blur-sm"
                style={{ boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}
              >
                <span className="font-serif-royal text-sm font-semibold">G</span>
              </div>
              <h3 className="text-xl md:text-2xl font-serif-elegant font-medium tracking-wide text-[#fbf5df]">
                Gunasekaran T & Rajeswari C
              </h3>
              <p className="text-[10px] md:text-xs tracking-[0.25em] font-sans-luxury text-[#dfb15b] uppercase mt-2 font-semibold">
                Parents of the Groom
              </p>
              <div className="h-px w-12 bg-[#dfb15b]/30 my-4" />
              <p className="text-sm md:text-base text-[#faf6f0]/70 italic font-body max-w-xs leading-relaxed tracking-wider">
                Tracing ancestral roots from Pudukkottai, seeking to unite two grand families with ancient traditional virtues.
              </p>
            </motion.div>

            {/* Bride's parents */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div
                className="w-10 h-10 rounded-full border border-[#dfb15b]/30 flex items-center justify-center mb-6 text-[#dfb15b] opacity-80 backdrop-blur-sm"
                style={{ boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}
              >
                <span className="font-serif-royal text-sm font-semibold">B</span>
              </div>
              <h3 className="text-xl md:text-2xl font-serif-elegant font-medium tracking-wide text-[#fbf5df]">
                Gajendran J & Manjula G
              </h3>
              <p className="text-[10px] md:text-xs tracking-[0.25em] font-sans-luxury text-[#dfb15b] uppercase mt-2 font-semibold">
                Parents of the Bride
              </p>
              <div className="h-px w-12 bg-[#dfb15b]/30 my-4" />
              <p className="text-sm md:text-base text-[#faf6f0]/70 italic font-body max-w-xs leading-relaxed tracking-wider">
                Rooted in the vibrant heart of Chennai, offering their cherished daughter under pure love and divine warmth.
              </p>
            </motion.div>
          </div>

          {/* Invitation text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="flex flex-col items-center max-w-2xl px-4"
          >
            <p className="text-[#dfb15b] font-quote text-xl md:text-3xl italic tracking-wide" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
              cordially request the honour of your esteemed presence
            </p>
            <p className="text-[#fbf5df]/90 font-sans-luxury text-[10px] md:text-xs tracking-[0.3em] uppercase font-semibold mt-3">
              to celebrate the auspicious wedding of their beloved children
            </p>

            <GoldDivider className="opacity-70 max-w-[200px] w-full" />

            {/* Couple names in serif-royal */}
            <div className="mt-6 flex flex-col md:flex-row items-center gap-2 md:gap-6">
              <span className="text-2xl md:text-4xl font-serif-royal font-bold text-[#fbf5df] tracking-widest">ANANDHAN</span>
              <span className="text-[#dfb15b] font-serif-elegant italic text-xl md:text-2xl">&</span>
              <span className="text-2xl md:text-4xl font-serif-royal font-bold text-[#fbf5df] tracking-widest">VANITHA</span>
            </div>

            <p className="text-xs md:text-sm text-[#faf6f0]/60 font-sans-luxury tracking-[0.2em] uppercase mt-10">
              Pudukkottai & Chennai • August & September 2026
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
