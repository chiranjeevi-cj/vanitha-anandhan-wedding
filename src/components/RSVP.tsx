import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import GoldDivider from './GoldDivider'

type AttendingStatus = 'yes' | 'no' | ''
type Side = 'groom' | 'bride' | 'mutual' | ''

interface FormData {
  name: string
  attendees: string
  attending: AttendingStatus
  side: Side
  message: string
}

export default function RSVP() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<FormData>({
    name: '',
    attendees: '1',
    attending: '',
    side: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  const inputStyle = {
    background: 'rgba(27,3,5,0.8)',
    border: '1px solid rgba(223,177,91,0.3)',
    color: '#fbf5df',
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    padding: '0.75rem 1rem',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const labelStyle = {
    fontFamily: 'var(--font-sans-luxury)',
    fontSize: '0.7rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    color: '#dfb15b',
    opacity: 0.8,
    display: 'block',
    marginBottom: '0.5rem',
  }

  if (submitted) {
    return (
      <section
        className="relative py-24 px-6"
        style={{ background: 'linear-gradient(180deg, #120102 0%, #1b0305 50%, #120102 100%)' }}
      >
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Success icon */}
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
              style={{
                background: 'radial-gradient(circle, #022014, #01140e)',
                border: '2px solid #dfb15b',
                boxShadow: '0 0 40px rgba(223,177,91,0.3)',
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#dfb15b" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="font-serif-royal text-3xl md:text-4xl mb-4" style={{ color: '#dfb15b' }}>
              Dhanyavadham!
            </h2>
            <p className="font-serif-royal text-lg mb-4" style={{ color: '#f0d080', opacity: 0.8 }}>
              Response Received Joyfully
            </p>
            <GoldDivider />
            <p className="font-quote italic text-lg" style={{ color: '#fbf5df', opacity: 0.7 }}>
              Your presence and blessings are inscribed into the sacred scrolls of our celebrations. We look forward to welcoming you in Pudukkottai!
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section
      className="relative py-24 px-6"
      style={{ background: 'linear-gradient(180deg, #120102 0%, #1b0305 50%, #120102 100%)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, #dfb15b, transparent)' }} />

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="font-sans-luxury text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#dfb15b', opacity: 0.7 }}>
            Kindly Respond
          </p>
          <h2
            className="font-serif-royal text-3xl md:text-5xl mb-4"
            style={{ color: '#dfb15b', textShadow: '0 0 30px rgba(223,177,91,0.3)' }}
          >
            Join Us In Celebration
          </h2>
          <GoldDivider />
          <p className="font-quote italic text-lg max-w-xl mx-auto" style={{ color: '#fbf5df', opacity: 0.7 }}>
            We would be honored to celebrate this beautiful journey with your presence. Confirm your attendance and shower the couple with your blessings.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <form
            onSubmit={handleSubmit}
            className="p-8 md:p-10 relative"
            style={{
              background: 'linear-gradient(135deg, rgba(44,4,8,0.7) 0%, rgba(18,1,2,0.9) 100%)',
              border: '1px solid rgba(223,177,91,0.25)',
            }}
          >
            {/* Corner ornaments */}
            {[['top-2 left-2', '0 0 L20 0 L20 2 L2 2 L2 20 L0 20 Z'],
              ['top-2 right-2', 'M30 0 L10 0 L10 2 L28 2 L28 20 L30 20 Z'],
              ['bottom-2 left-2', 'M0 30 L20 30 L20 28 L2 28 L2 10 L0 10 Z'],
              ['bottom-2 right-2', 'M30 30 L10 30 L10 28 L28 28 L28 10 L30 10 Z'],
            ].map(([pos, path]) => (
              <svg key={pos} className={`absolute ${pos} w-7 h-7 opacity-40`} viewBox="0 0 30 30">
                <path d={path} fill="#dfb15b" />
              </svg>
            ))}

            <div className="flex flex-col gap-6">
              {/* Name */}
              <div>
                <label style={labelStyle}>Guest Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = '#dfb15b')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(223,177,91,0.3)')}
                />
              </div>

              {/* Attendees */}
              <div>
                <label style={labelStyle}>Number of Attendees</label>
                <select
                  value={form.attendees}
                  onChange={e => setForm(f => ({ ...f, attendees: e.target.value }))}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={e => (e.target.style.borderColor = '#dfb15b')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(223,177,91,0.3)')}
                >
                  {['1', '2', '3', '4', '5+'].map(n => (
                    <option key={n} value={n} style={{ background: '#1b0305' }}>{n}</option>
                  ))}
                </select>
              </div>

              {/* Attending */}
              <div>
                <label style={labelStyle}>Are you attending?</label>
                <div className="flex gap-3">
                  {[
                    { value: 'yes', label: 'YES, JOYFULLY' },
                    { value: 'no', label: 'Not Attending' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, attending: opt.value as AttendingStatus }))}
                      className="flex-1 py-3 px-4 transition-all duration-200"
                      style={{
                        fontFamily: 'var(--font-sans-luxury)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        background: form.attending === opt.value
                          ? 'linear-gradient(135deg, #dfb15b, #f0d080)'
                          : 'rgba(27,3,5,0.8)',
                        color: form.attending === opt.value ? '#120102' : '#dfb15b',
                        border: '1px solid rgba(223,177,91,0.3)',
                        cursor: 'pointer',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Side */}
              <div>
                <label style={labelStyle}>Whose side do you represent?</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'groom', label: "Groom's Side" },
                    { value: 'bride', label: "Bride's Side" },
                    { value: 'mutual', label: 'Mutual Friend' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, side: opt.value as Side }))}
                      className="py-2 px-4 transition-all duration-200"
                      style={{
                        fontFamily: 'var(--font-sans-luxury)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        background: form.side === opt.value
                          ? 'rgba(223,177,91,0.15)'
                          : 'transparent',
                        color: form.side === opt.value ? '#dfb15b' : 'rgba(251,245,223,0.5)',
                        border: `1px solid ${form.side === opt.value ? 'rgba(223,177,91,0.6)' : 'rgba(223,177,91,0.2)'}`,
                        cursor: 'pointer',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle}>Message of Blessing</label>
                <textarea
                  rows={4}
                  placeholder="Write your loving blessings and wishes to Anandh & Vanitha..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={e => (e.target.style.borderColor = '#dfb15b')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(223,177,91,0.3)')}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 transition-all duration-300 flex items-center justify-center gap-3"
                style={{
                  background: loading ? 'rgba(223,177,91,0.3)' : 'linear-gradient(135deg, #dfb15b 0%, #f0d080 50%, #b38428 100%)',
                  color: '#120102',
                  fontFamily: 'var(--font-sans-luxury)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? (
                  <>
                    <motion.div
                      className="w-4 h-4 rounded-full border-2"
                      style={{ borderColor: '#120102 transparent transparent transparent' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                    Seeking blessings...
                  </>
                ) : (
                  'Submit Response'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, #dfb15b, transparent)' }} />
    </section>
  )
}
