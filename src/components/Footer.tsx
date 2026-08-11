export default function Footer() {
  return (
    <footer
      className="relative text-white/50 text-xs py-16 text-center select-none border-t border-[#dfb15b]/10"
      style={{ background: '#01140e' }}
    >
      <div className="flex justify-center items-center gap-3 mb-8 text-[#dfb15b]/40">
        <span className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, currentColor)' }} />
        <span className="font-serif-royal text-sm">✦</span>
        <span className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, currentColor)' }} />
      </div>

      <div className="max-w-md mx-auto px-6 space-y-4">
        <p className="font-serif-royal text-sm md:text-base text-[#dfb15b]/80 tracking-[0.25em] font-medium leading-relaxed">
          May all beings, everywhere, be happy and free
        </p>
        <p className="text-sm md:text-base font-quote italic text-[#faf6f0]/55 tracking-wide leading-relaxed">
          Thank you for being a part of our sacred union.
        </p>
        <div className="h-px w-12 bg-[#dfb15b]/20 mx-auto my-4" />
        <p className="text-[9px] font-sans-luxury opacity-35 uppercase tracking-[0.2em] pt-2">
          © 2026 Anandh & Vanitha Wedding&nbsp;&nbsp;•&nbsp;&nbsp;Crafted with devotion
        </p>
        <p className="text-[10px] font-sans-luxury text-[#faf6f0]/40 tracking-[0.18em] uppercase pt-1">
          Created by <span className="font-calligraphy text-lg text-[#fbf5df] tracking-wide inline-block normal-case">CJ Creation</span>
        </p>
      </div>
    </footer>
  )
}
