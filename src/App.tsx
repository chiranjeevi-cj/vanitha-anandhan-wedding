import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import EnvelopeIntro from './components/EnvelopeIntro'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import Families from './components/Families'
import Events from './components/Events'
import RSVPAndBlessings from './components/RSVPAndBlessings'
import Footer from './components/Footer'
import './index.css'

let audioInstance: HTMLAudioElement | null = null

function getAudio() {
  if (!audioInstance) {
    audioInstance = new Audio('/song.mp3')
    audioInstance.loop = true
    audioInstance.volume = 0.5
  }
  return audioInstance
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(true)

  useEffect(() => {
    const handleVisibility = () => {
      const audio = getAudio()
      if (document.hidden && isOpen && isMusicPlaying) {
        audio.pause()
      } else if (!document.hidden && isOpen && isMusicPlaying) {
        audio.play().catch(() => {})
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      getAudio().pause()
    }
  }, [isOpen, isMusicPlaying])

  const handleOpen = () => {
    setIsOpen(true)
    // Start music after a short delay
    setTimeout(() => {
      getAudio().play().catch(() => {})
    }, 500)
  }

  const toggleMusic = () => {
    const audio = getAudio()
    if (isMusicPlaying) {
      audio.pause()
      setIsMusicPlaying(false)
    } else {
      audio.play().catch(() => {})
      setIsMusicPlaying(true)
    }
  }

  return (
    <div
      id="wedding_invitation_app"
      className="min-h-screen select-none text-white antialiased"
      style={{ background: '#320308' }}
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="w-full relative"
          >
            <Hero isMusicPlaying={isMusicPlaying} onToggleMusic={toggleMusic} />
            <Countdown />
            <Families />
            <Events />
            <RSVPAndBlessings />
            <Footer />
          </motion.main>
        ) : (
          <EnvelopeIntro key="intro" onOpen={handleOpen} />
        )}
      </AnimatePresence>
    </div>
  )
}
