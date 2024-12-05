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
    <div className="min-h-screen bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src="https://zima-blue.vercel.app/loading.mp4"
        muted
        playsInline
      />
    </div>
  )
}
