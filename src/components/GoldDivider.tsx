interface Props {
  className?: string
}

export default function GoldDivider({ className = '' }: Props) {
  return (
    <div className={`flex items-center gap-4 my-8 ${className}`}>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #dfb15b, transparent)' }} />
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="3" fill="#dfb15b" />
        <circle cx="20" cy="20" r="7" stroke="#dfb15b" strokeWidth="0.5" fill="none" />
        <line x1="0" y1="20" x2="11" y2="20" stroke="#dfb15b" strokeWidth="0.5" />
        <line x1="29" y1="20" x2="40" y2="20" stroke="#dfb15b" strokeWidth="0.5" />
        <line x1="20" y1="0" x2="20" y2="11" stroke="#dfb15b" strokeWidth="0.5" />
        <line x1="20" y1="29" x2="20" y2="40" stroke="#dfb15b" strokeWidth="0.5" />
        <path d="M14.2 14.2 L17 17" stroke="#dfb15b" strokeWidth="0.5" />
        <path d="M23 23 L25.8 25.8" stroke="#dfb15b" strokeWidth="0.5" />
        <path d="M25.8 14.2 L23 17" stroke="#dfb15b" strokeWidth="0.5" />
        <path d="M17 23 L14.2 25.8" stroke="#dfb15b" strokeWidth="0.5" />
      </svg>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #dfb15b, transparent)' }} />
    </div>
  )
}
