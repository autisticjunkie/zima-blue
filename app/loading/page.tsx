'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function LoadingPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/main')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch((error: Error) => {
        console.error('Error playing video:', error.message)
      })
    }
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full">
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
