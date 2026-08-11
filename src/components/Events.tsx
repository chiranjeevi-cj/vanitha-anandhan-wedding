import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, Clock, MapPin } from 'lucide-react'

interface Event {
  id: string; title: string; subtitle: string; date: string
  time: string; venueName: string; venueAddress: string
  googleMapsUrl: string; description: string
}

const events: Event[] = [
  {
    id: 'muhurtham',
    title: 'Mangala Muhurtham',
    subtitle: 'The divine binding knot of three rounds under sacred chants.',
    date: 'Sunday, 30 August 2026',
    time: '10:00 AM - 10:30 AM',
    venueName: 'Kumaran Mahal A/C',
    venueAddress: 'Mariyamman Kovil Vasal, Thiruvappur, Pudukkottai, Tamil Nadu 622005',
    googleMapsUrl: 'https://maps.app.goo.gl/jXSd7pRCSjXtjkBi7',
    description: "The auspicious moment where the Thali (Mangalsutra) is tied around the bride's neck under the resonant beats of Nadaswaram, followed by Sapthapadi.",
  },
  {
    id: 'reception',
    title: 'Grand Wedding Reception',
    subtitle: 'An evening of joy, music and celebration with loved ones.',
    date: 'Sunday, 6 September 2026',
    time: '7:00 PM onwards',
    venueName: 'P.V.P Mahal',
    venueAddress: '97, Kundrathur Main Rd, Gerugambakkam, Chennai, Tamil Nadu 600128',
    googleMapsUrl: 'https://maps.app.goo.gl/Xq9FNPmMGJ6WKf5X8',
    description: 'Join us for an enchanting evening of celebration as we welcome family and friends to bless the newly united couple.',
  },
]

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #dfb15b, transparent)' }} />
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" fill="#dfb15b" opacity="0.6" />
      </svg>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #dfb15b, transparent)' }} />
    </div>
  )
}

export default function Events() {
  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section
      id="events_section"
      className="relative min-h-screen w-full flex flex-col items-center text-white py-24 px-6 md:px-12 overflow-hidden select-none"
      style={{ background: '#01140d' }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #01140e, #043321, #01140e)' }} />
        {/* Slow spinning circle */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 opacity-[0.015] border border-[#dfb15b] rounded-full flex items-center justify-center"
          style={{ width: '120vw', height: '120vw', animation: 'spin 200s linear infinite', willChange: 'transform' }}
        >
          <div className="w-[80%] h-[80%] border border-[#dfb15b] rounded-full" />
        </div>
        <div
          className="absolute top-1/3 left-1/3 w-[60vw] h-[60vw] pointer-events-none animate-pulse"
          style={{ background: 'radial-gradient(circle, rgba(223,177,91,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
      </div>

      {/* Header */}
      <div ref={headerRef} className="relative w-full max-w-5xl z-10 flex flex-col items-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="h-px w-6 bg-[#dfb15b]/30" />
            <span className="text-xs tracking-[0.3em] font-sans-luxury uppercase text-[#dfb15b]">Auspicious Schedule</span>
            <span className="h-px w-6 bg-[#dfb15b]/30" />
          </div>
          <h2
            className="font-serif-royal text-[#dfb15b] pt-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', textShadow: '0 2px 10px rgba(223,177,91,0.3)' }}
          >
            Wedding Ceremonies
          </h2>
          <GoldDivider />
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="relative w-full max-w-5xl z-10 px-4 md:px-8">
        {/* Center line */}
        <div
          className="absolute left-[24px] md:left-1/2 md:-translate-x-[0.75px] top-2 bottom-6 w-[1.5px]"
          style={{ background: 'linear-gradient(to bottom, rgba(223,177,91,0.45), rgba(223,177,91,0.15), rgba(223,177,91,0.45))' }}
        />

        <div className="space-y-16 md:space-y-24">
          {events.map((event, index) => {
            const isLeft = index % 2 === 0
            const num = String(index + 1).padStart(2, '0')

            return (
              <div
                key={event.id}
                className={`relative w-full flex flex-col md:flex-row ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
              >
                {/* Timeline dot */}
                <span
                  className="absolute left-[17px] md:left-1/2 md:-translate-x-1/2 top-1.5 md:top-2 w-3.5 h-3.5 rounded-full border-2 z-10"
                  style={{ background: '#dfb15b', borderColor: '#01140d', boxShadow: '0 0 8px rgba(223,177,91,0.8)' }}
                />

                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.05 }}
                  className={`relative pl-12 md:pl-0 w-full md:w-[calc(50%-32px)] flex flex-col items-start text-left ${isLeft ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}
                >
                  <span className="text-[10px] md:text-xs font-sans-luxury font-semibold tracking-[0.3em] text-[#dfb15b]/80 uppercase">
                    Ceremony · {num}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif-elegant text-[#fbf5df] mt-1.5 mb-1 font-medium tracking-wide">
                    {event.title}
                  </h3>
                  <p
                    className={`text-sm md:text-base text-stone-300 italic font-quote my-2 py-0.5 leading-relaxed border-[#dfb15b]/45 ${
                      isLeft
                        ? 'border-l pl-3 md:border-l-0 md:border-r md:pl-0 md:pr-3'
                        : 'border-l pl-3'
                    }`}
                  >
                    "{event.subtitle}"
                  </p>

                  <div
                    className={`mt-3.5 space-y-2.5 text-stone-200/90 text-sm md:text-base font-sans-luxury tracking-wide flex flex-col w-full ${isLeft ? 'md:items-end' : 'md:items-start'}`}
                  >
                    <div className={`flex items-center gap-2.5 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                      <Calendar size={14} className="text-[#dfb15b]/80 flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className={`flex items-center gap-2.5 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                      <Clock size={14} className="text-[#dfb15b]/80 flex-shrink-0" />
                      <span className="text-[#dfb15b] font-medium">{event.time}</span>
                    </div>
                    <div className={`flex items-start gap-2.5 ${isLeft ? 'md:flex-row-reverse md:text-right' : 'md:flex-row md:text-left'}`}>
                      <MapPin size={14} className="text-[#dfb15b]/80 mt-1 flex-shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-white">{event.venueName}</span>
                        <span className="text-xs text-stone-400 leading-tight mt-0.5">{event.venueAddress}</span>
                      </div>
                    </div>
                  </div>

                  <div className={`mt-6 flex w-full ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                    <a
                      href={event.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-1.5 text-[10px] md:text-xs tracking-widest font-sans-luxury font-medium border border-[#dfb15b]/30 hover:border-[#dfb15b]/80 bg-[#2c0407] hover:bg-[#dfb15b]/10 text-[#dfb15b] hover:text-white rounded-full transition-all duration-300"
                    >
                      <MapPin size={10} />
                      Google Map Location
                    </a>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
