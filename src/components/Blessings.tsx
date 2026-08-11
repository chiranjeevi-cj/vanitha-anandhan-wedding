import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import GoldDivider from './GoldDivider'

interface Blessing {
  name: string
  relation: string
  message: string
}

const blessings: Blessing[] = [
  {
    name: 'Sundaresan & Alamelu',
    relation: 'Family Elder',
    message: 'Wishing the divine couple Anandh and Vanitha a lifetime of abundance, sound health, and pure spiritual joy! Om Namah Shivaya.',
  },
  {
    name: 'Karthik & Janani',
    relation: 'Friends of the Family',
    message: 'So incredibly happy to see Vanitha marrying her prince! Can\'t wait to witness this magnificent wedding in Pudukkottai!',
  },
  {
    name: 'Dr. R. Venkatraman',
    relation: 'Well Wisher',
    message: 'May Ganesha clear all obstacles from your path as you begin this beautiful new chapter of family life together.',
  },
  {
    name: 'Priya & Rajan',
    relation: 'Mutual Friends',
    message: 'Two beautiful souls coming together in the most sacred union. Wishing you infinite love and blessings!',
  },
  {
    name: 'Meenakshi Ammal',
    relation: 'Family Elder',
    message: 'Loka Samastha Sukhino Bhavantu — May this sacred union bring joy to the entire world. Blessed to witness this.',
  },
  {
    name: 'Arun & Deepa',
    relation: 'Friends of the Groom',
    message: 'Anandh found his perfect match! Wishing you both a lifetime of laughter, love, and beautiful moments together.',
  },
]

function BlessingCard({ blessing, index }: { blessing: Blessing; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative p-6 flex flex-col gap-4"
      style={{
        background: 'linear-gradient(135deg, rgba(44,4,8,0.7) 0%, rgba(18,1,2,0.9) 100%)',
        border: '1px solid rgba(223,177,91,0.2)',
      }}
    >
      {/* Quote mark */}
      <div
        className="font-serif-royal text-5xl leading-none absolute top-3 left-4 opacity-20 pointer-events-none select-none"
        style={{ color: '#dfb15b' }}
      >
        "
      </div>

      {/* Corner ornament */}
      <svg className="absolute top-2 right-2 w-6 h-6 opacity-30" viewBox="0 0 20 20">
        <path d="M20 0 L8 0 L8 2 L18 2 L18 12 L20 12 Z" fill="#dfb15b" />
      </svg>

      <p className="font-quote italic text-base leading-relaxed pt-4" style={{ color: '#fbf5df', opacity: 0.85 }}>
        "{blessing.message}"
      </p>

      <div className="flex items-center gap-3 mt-auto pt-4" style={{ borderTop: '1px solid rgba(223,177,91,0.15)' }}>
        {/* Avatar initial */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: 'radial-gradient(circle, #540c14, #2c0408)',
            border: '1px solid rgba(223,177,91,0.4)',
          }}
        >
          <span className="font-serif-royal text-xs" style={{ color: '#dfb15b' }}>
            {blessing.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-sans-luxury text-sm font-semibold" style={{ color: '#dfb15b' }}>
            {blessing.name}
          </p>
          <p className="font-sans-luxury text-xs" style={{ color: '#fbf5df', opacity: 0.45 }}>
            {blessing.relation}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Blessings() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="relative py-24 px-6"
      style={{ background: 'linear-gradient(180deg, #120102 0%, #1b0305 50%, #120102 100%)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, #dfb15b, transparent)' }} />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-sans-luxury text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#dfb15b', opacity: 0.7 }}>
            Temple Golden Scroll
          </p>
          <h2
            className="font-serif-royal text-3xl md:text-5xl mb-4"
            style={{ color: '#dfb15b', textShadow: '0 0 30px rgba(223,177,91,0.3)' }}
          >
            Blessings Wall
          </h2>
          <GoldDivider />
          <p className="font-quote italic text-lg max-w-xl mx-auto" style={{ color: '#fbf5df', opacity: 0.7 }}>
            Traditional plaques from friends and family — love inscribed in golden light.
          </p>
        </motion.div>

        {/* Blessings grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {blessings.map((blessing, index) => (
            <BlessingCard key={blessing.name} blessing={blessing} index={index} />
          ))}
        </div>

        {/* Closing quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="font-wedding-names text-3xl md:text-4xl" style={{ color: '#dfb15b', opacity: 0.7 }}>
            Wishing you infinite love and blessings!
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, #dfb15b, transparent)' }} />
    </section>
  )
}
