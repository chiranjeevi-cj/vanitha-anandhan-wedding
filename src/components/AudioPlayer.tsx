import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function AudioPlayer() {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio('/song.mp3')
    audio.loop = true
    audio.volume = 0.35
    audio.muted = true
    audioRef.current = audio

    const tryPlay = () => {
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
    }

    document.addEventListener('click', tryPlay, { once: true })
    tryPlay()

    return () => {
      audio.pause()
      document.removeEventListener('click', tryPlay)
    }
  }, [])

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.muted = false
      if (!isPlaying) {
        audio.play().then(() => setIsPlaying(true)).catch(() => {})
      }
      setIsMuted(false)
    } else {
      audio.muted = true
      setIsMuted(true)
    }
  }

  return (
    <motion.button
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
      style={{
        background: 'radial-gradient(circle, #2c0408, #1b0305)',
        border: '1px solid #dfb15b',
        boxShadow: '0 0 20px rgba(223,177,91,0.3)',
      }}
      onClick={toggleMute}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
      title={isMuted ? 'Unmute traditional music' : 'Mute traditional music'}
    >
      {/* Sound waves or muted icon */}
      {isMuted ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dfb15b" strokeWidth="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <motion.div
          className="relative flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dfb15b" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        </motion.div>
      )}
    </motion.button>
  )
}
