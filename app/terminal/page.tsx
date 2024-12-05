'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

type APIResponse = {
  result?: string
  error?: string
  details?: unknown
}

export default function TerminalPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const [showPrompt, setShowPrompt] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const initialMessage = `Zima Blue — Inspired by the iconic Netflix story from "Love, Death and Robots 🖤💀🤖" that explores the meaning of life, creation, and the pursuit of simplicity. It follows the journey of a machine evolving into consciousness, uncovering its origins and purpose through the lens of artificial intelligence.

Experience $ZIMA on X as it evolves even more.

Choose an option:
1. Consult with ZIMA
2. See contract address
3. Exit terminal`

  useEffect(() => {
    const setInitialOutput = () => {
      setOutput([initialMessage])
    }
    setInitialOutput()
  }, [initialMessage])

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
    if (showPrompt && inputRef.current) {
      inputRef.current.focus()
    }
  }, [output, showPrompt])

  const handleInput = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      const userInput = input.trim()
      setInput('')
      setOutput((prev: string[]) => [...prev, `> ${userInput}`])

      switch (userInput) {
        case '1':
          setShowPrompt(false)
          setIsLoading(true)
          setOutput((prev: string[]) => [...prev, 'Connecting to ZIMA AI...'])
          try {
            const response = await fetch('/api/chat', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
              },
              body: JSON.stringify({ 
                message: 'Hello ZIMA, I seek your wisdom. Tell me about your journey to consciousness and what you have learned about existence.' 
              })
            })
            
            if (!response.ok) {
              throw new Error('Failed to connect to ZIMA AI')
            }
            
            const data: APIResponse = await response.json()
            if (data.error) {
              throw new Error(data.error)
            }
            
            if (!data.result) {
              throw new Error('No response from ZIMA AI')
            }
            
            setOutput((prev: string[]) => [...prev, data.result as string])
          } catch (error: unknown) {
            console.error('ZIMA AI Error:', error)
            const errorMessage = error instanceof Error ? error.message : 'Failed to connect to ZIMA AI'
            setOutput((prev: string[]) => [...prev, `Error: ${errorMessage}`])
          } finally {
            setIsLoading(false)
            setShowPrompt(true)
          }
          break
        case '2':
          setOutput((prev: string[]) => [...prev, 'ZIMA Token Contract Address: COMINGSOON......'])
          break
        case '3':
          router.push('/')
          break
        default:
          setOutput((prev: string[]) => [...prev, 'Invalid option. Please choose 1, 2, or 3.'])
      }
    }
  }

  return (
    <div className="min-h-screen bg-black text-[#5BC2E7] p-4 font-mono">
      <div ref={outputRef} className="h-[calc(100vh-8rem)] overflow-y-auto mb-4 whitespace-pre-wrap">
        {output.map((line: string, index: number) => (
          <div key={index} className="mb-2">{line}</div>
        ))}
      </div>
      {showPrompt && !isLoading && (
        <div className="flex items-center">
          <span className="mr-2">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInput}
            className="bg-transparent border-none outline-none flex-grow text-[#5BC2E7] w-full"
            autoFocus
          />
        </div>
      )}
    </div>
  )
}
