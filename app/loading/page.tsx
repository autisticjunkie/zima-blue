'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function LoadingPage() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/main')
    }, 5000)

    const video = videoRef.current
    if (video) {
      video.play().catch(error => {
        console.error('Error playing video:', error)
      })
    }

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/animation.gif%20(1)-hpZGbcWJKQgPMWBVM6PIRBTHL8bc7J.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  )
}
