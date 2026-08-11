import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, CheckCircle, Scroll } from 'lucide-react'

// Paste your Google Apps Script web app URL here after deploying
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbw0h8BE4tG8A0Ep08qT2dMHiKy8acwRrukS1kKkAihgc2jTa459gPj9jWsVFI5CzHMDUg/exec'

interface Blessing {
  id: string
  guestName: string
  side: 'groom' | 'bride' | 'general'
  message: string
  createdAt: string
}

function GoldDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 h-[1.5px]" style={{ background: 'linear-gradient(to right, transparent, #dfb15b)' }} />
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" fill="#dfb15b" opacity="0.6" />
      </svg>
      <div className="flex-1 h-[1.5px]" style={{ background: 'linear-gradient(to left, transparent, #dfb15b)' }} />
    </div>
  )
}

export default function RSVPAndBlessings() {
  const [name, setName] = useState('')
  const [side, setSide] = useState<'groom' | 'bride' | 'general'>('general')
  const [message, setMessage] = useState('')
  const [sheetBlessings, setSheetBlessings] = useState<Blessing[]>([])
  const [localBlessings, setLocalBlessings] = useState<Blessing[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [focusField, setFocusField] = useState<string | null>(null)

  const blessings = [...localBlessings, ...sheetBlessings].slice(0, 20)

  useEffect(() => {
    const callbackName = `jsonp_${Date.now()}`
    const script = document.createElement('script')

    const w = window as unknown as Record<string, unknown>
    w[callbackName] = (data: Array<{ name: string; side: string; message: string; timestamp: string }>) => {
      delete w[callbackName]
      if (script.parentNode) document.body.removeChild(script)
      const fetched: Blessing[] = data.map((row, i) => ({
        id: `sheet_${i}`,
        guestName: row.name,
        side: (['groom', 'bride', 'general'].includes(row.side) ? row.side : 'general') as 'groom' | 'bride' | 'general',
        message: row.message,
        createdAt: row.timestamp,
      }))
      setSheetBlessings(fetched)
    }

    script.onerror = () => {
      delete w[callbackName]
      if (script.parentNode) document.body.removeChild(script)
    }

    script.src = `${SHEET_URL}?callback=${callbackName}`
    document.body.appendChild(script)

    return () => {
      delete w[callbackName]
      if (script.parentNode) document.body.removeChild(script)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)

    const newBlessing: Blessing = {
      id: String(Date.now()),
      guestName: name.trim(),
      side,
      message: message.trim() || 'Wishing you infinite love and blessings!',
      createdAt: new Date().toISOString(),
    }

    // Send to Google Sheets (fire-and-forget, no-cors)
    try {
      const body = new URLSearchParams({
        name: newBlessing.guestName,
        side: newBlessing.side,
        message: newBlessing.message,
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      })
      fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', body })
    } catch (_) { }

    await new Promise(r => setTimeout(r, 1000))
    setLocalBlessings(prev => [newBlessing, ...prev])
    setLoading(false)
    setSuccess(true)
    setName('')
    setMessage('')
    setTimeout(() => setSuccess(false), 5500)
  }

  const inputClass = (field: string) =>
    `w-full bg-[#01140d]/80 border pl-11 pr-4 py-3 text-sm rounded-xl focus:outline-none placeholder-stone-500 text-white font-sans-luxury tracking-wide select-text transition-all duration-300 ${focusField === field ? 'border-[#dfb15b] ring-1 ring-[#dfb15b]/40 bg-[#01140d]' : 'border-[#dfb15b]/10'
    }`

  return (
    <section
      id="rsvp_section"
      className="relative min-h-screen w-full flex flex-col justify-center items-center text-white py-24 px-6 md:px-12 overflow-hidden select-none"
      style={{ background: '#150103' }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #3d060c, #21030a, #120102)' }} />
        <div
          className="absolute top-0 bottom-0 left-0 right-0 opacity-[0.015] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#dfb15b 1px, transparent 1px)', backgroundSize: '16px 16px' }}
        />
        <div className="absolute bottom-0 inset-x-0 h-[40vh] pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(223,177,91,0.1), transparent)' }} />
        <div
          className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] pointer-events-none animate-pulse"
          style={{ background: 'radial-gradient(circle, rgba(223,177,91,0.04) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="relative w-full max-w-5xl z-10 flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16">
        {/* LEFT: Form */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="flex flex-col mb-10 text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="h-[1.5px] w-6" style={{ background: 'linear-gradient(to right, transparent, #dfb15b)' }} />
              <span className="text-xs uppercase font-sans-luxury tracking-[0.25em] text-[#dfb15b]">R.S.V.P</span>
            </div>
            <h2
              className="font-calligraphy text-[#dfb15b] pt-4"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', textShadow: '0 2px 12px rgba(223,177,91,0.4)' }}
            >
              Join Us In Celebration
            </h2>
            <GoldDivider className="my-4 text-left justify-start max-w-xs" />
            <p className="text-base md:text-lg text-[#faf6f0]/75 italic font-quote mt-4 max-w-md leading-relaxed">
              "We would be honored to celebrate this beautiful journey with your presence. Share your blessings and shower the couple with love."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="relative p-6 md:p-8 rounded-2xl border border-[#dfb15b]/15 overflow-hidden"
            style={{
              background: 'rgba(2,33,22,0.8)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 20px 50px -15px rgba(0,0,0,0.8)',
            }}
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#dfb15b]/30 rounded-tl-xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#dfb15b]/30 rounded-br-xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                    className="mb-6 p-4 rounded-full bg-[#dfb15b]/10 text-[#dfb15b]"
                  >
                    <CheckCircle size={48} />
                  </motion.div>
                  <h3 className="text-xl md:text-3xl font-serif-royal font-bold tracking-widest text-[#fbf5df] uppercase">
                    Dhanyavadham!
                  </h3>
                  <p className="text-[#dfb15b] font-quote italic text-base md:text-xl mt-2">
                    Blessings Received Joyfully
                  </p>
                  <div className="h-px w-16 bg-[#dfb15b]/30 my-6" />
                  <p className="text-sm md:text-base text-[#faf6f0]/75 font-body italic max-w-sm leading-relaxed tracking-wide">
                    Your blessings are inscribed into the sacred scrolls of our celebrations. We look forward to welcoming you in Pudukkottai!
                  </p>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] md:text-xs font-sans-luxury uppercase tracking-[0.2em] text-[#dfb15b]/80 font-semibold block">
                      Your Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#dfb15b]/50">
                        <User size={16} />
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anandha Krishnan"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        onFocus={() => setFocusField('name')}
                        onBlur={() => setFocusField(null)}
                        className={inputClass('name')}
                      />
                    </div>
                  </div>

                  {/* Side */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] md:text-xs font-sans-luxury uppercase tracking-[0.2em] text-[#dfb15b]/80 font-semibold block">
                      Whose side do you represent?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { v: 'groom', label: "Groom's Side" },
                        { v: 'bride', label: "Bride's Side" },
                        { v: 'general', label: 'Mutual Friend' },
                      ].map(opt => (
                        <button
                          key={opt.v}
                          type="button"
                          onClick={() => setSide(opt.v as 'groom' | 'bride' | 'general')}
                          className="py-2 px-4 rounded-xl border text-[9px] font-sans-luxury tracking-wider uppercase transition-all duration-200"
                          style={{
                            background: side === opt.v ? 'rgba(223,177,91,0.1)' : 'transparent',
                            color: side === opt.v ? '#dfb15b' : 'rgba(251,245,223,0.4)',
                            borderColor: side === opt.v ? 'rgba(223,177,91,0.5)' : 'rgba(223,177,91,0.1)',
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] md:text-xs font-sans-luxury uppercase tracking-[0.2em] text-[#dfb15b]/80 font-semibold block">
                      Message of Blessing
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Write your loving blessings and wishes to Anandh & Vanitha..."
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      onFocus={() => setFocusField('message')}
                      onBlur={() => setFocusField(null)}
                      className={`${inputClass('message').replace('pl-11', 'px-4')} resize-none`}
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full relative py-3.5 px-4 rounded-xl cursor-pointer select-none border border-[#dfb15b]/20 font-sans-luxury uppercase font-bold tracking-[0.2em] text-[#021f14] text-xs transition-transform flex items-center justify-center gap-2 overflow-hidden"
                    style={{
                      background: loading ? 'rgba(223,177,91,0.4)' : 'linear-gradient(to right, #b38428, #dfb15b, #b38428)',
                      boxShadow: '0 4px 15px rgba(223,177,91,0.3)',
                    }}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-[#021f14]" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Sending blessings...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Blessings</span>
                        <CheckCircle size={12} className="text-[#021f14]" />
                      </>
                    )}
                    <div className="absolute top-0 bottom-0 left-[-100px] w-12 bg-white/20 skew-x-12 animate-[shimmer_3s_infinite_linear]" />
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* RIGHT: Blessings Wall */}
        <div className="w-full lg:w-[45%] flex flex-col justify-between">
          <div className="mb-6">
            <div className="flex items-center gap-1.5 mb-1">
              <Scroll size={14} className="text-[#dfb15b]" />
              <span className="text-[10px] uppercase font-sans-luxury tracking-[0.3em] text-[#dfb15b] font-semibold">
                Temple Golden Scroll
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-serif-elegant font-medium tracking-wider text-[#fbf5df]">
              Blessings Wall
            </h3>
            <p className="text-[11px] text-[#faf6f0]/40 font-sans-luxury mt-1 uppercase tracking-wider">
              Traditional plaques from friends and family
            </p>
          </div>

          <div className="flex-grow max-h-[420px] lg:max-h-[500px] overflow-y-auto pr-2 space-y-4">
            <AnimatePresence>
              {blessings.map(b => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.6 }}
                  className="p-4 rounded-xl border border-[#dfb15b]/10 hover:bg-[#022014]/65 backdrop-blur-sm transition-colors relative"
                  style={{
                    background: 'rgba(2,32,20,0.4)',
                    boxShadow: '0 4px 15px -5px rgba(0,0,0,0.5)',
                  }}
                >
                  <span className="absolute top-4 right-4 text-[9px] uppercase font-sans-luxury tracking-widest px-2 py-0.5 rounded border border-[#dfb15b]/25 bg-[#320308] text-[#dfb15b]">
                    {b.side === 'groom' ? 'Groom Side' : b.side === 'bride' ? 'Bride Side' : 'Well Wisher'}
                  </span>
                  <h4 className="text-xs font-sans-luxury font-bold tracking-wider text-[#dfb15b] max-w-[70%]">
                    {b.guestName}
                  </h4>
                  <p className="text-sm text-[#faf6f0]/85 font-quote italic mt-3 leading-relaxed tracking-wide border-l-2 border-[#dfb15b]/30 pl-3">
                    "{b.message}"
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-8 flex justify-center text-[#dfb15b] opacity-35">
            <svg viewBox="0 0 100 20" className="w-24 h-5 fill-current">
              <path d="M10 5 Q30-5 50 5 T90 5" stroke="#dfb15b" strokeWidth="1" fill="none" />
              <circle cx="50" cy="5" r="2" />
              <circle cx="30" cy="5" r="1.5" />
              <circle cx="70" cy="5" r="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
