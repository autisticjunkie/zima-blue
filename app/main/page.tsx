'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function MainPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    // Star properties
    const stars: Array<{
      x: number
      y: number
      size: number
      speed: number
    }> = []
    const numStars = 200

    // Initialize stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1
      })
    }

    // Animation function
    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw stars
      stars.forEach(star => {
        if (!ctx || !canvas) return
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        // Move star
        star.y -= star.speed
        
        // Reset star position if it goes off screen
        if (star.y < 0) {
          star.y = canvas.height
          star.x = Math.random() * canvas.width
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: { 
      scale: 1.1,
      transition: { duration: 0.2 }
    }
  }

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ZIMA1.jpg-12h6irqaiefdgFVLi9xTkpUKycDe7C.jpeg)'
        }}
      />
      
      {/* Darkening Overlay */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Animated Stars */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Navigation Text */}
      {isMounted && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between text-white font-navigation">
            {/* Left */}
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <Link 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg md:text-xl font-bold hover:text-[#5BC2E7] transition-colors nav-glow"
              >
                TWITTER
              </Link>
            </motion.div>

            {/* Center */}
            <div className="flex items-center gap-4 md:gap-8 text-sm md:text-base my-4 md:my-0">
              <span className="text-white/50">consult</span>
              <motion.div
                variants={textVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <Link 
                  href="/buy" 
                  className="text-xl md:text-2xl font-bold hover:text-[#5BC2E7] transition-colors nav-glow"
                >
                  BUY
                </Link>
              </motion.div>
              <span className="text-white/50">with</span>
              <motion.div
                variants={textVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <Link 
                  href="/terminal" 
                  className="text-xl md:text-2xl font-bold hover:text-[#5BC2E7] transition-colors nav-glow"
                >
                  ZIMA
                </Link>
              </motion.div>
            </div>

            {/* Right */}
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <Link
                href="/ZIMA-PROOF-OF-AUTOMATION.pdf.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg md:text-xl font-bold nav-glow"
              >
                PROOF OF AUTOMATION
              </Link>
            </motion.div>
          </div>
        </div>
      )}
    </main>
  )
}
