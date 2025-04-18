"use client"

import { useEffect, useState } from "react"

export default function SilentGame() {
  const [audioSupported, setAudioSupported] = useState(true)

  useEffect(() => {
    // Check if audio is supported
    try {
      const audio = new Audio()
      audio.volume = 0

      // Try to play a silent audio
      audio
        .play()
        .then(() => {
          audio.pause()
          setAudioSupported(true)
        })
        .catch(() => {
          setAudioSupported(false)
        })
    } catch (e) {
      setAudioSupported(false)
    }
  }, [])

  if (!audioSupported) {
    return (
      <div className="fixed bottom-4 left-4 z-50 text-xs text-green-500 bg-black bg-opacity-70 p-2 rounded">
        <p>Audio not available in this browser</p>
      </div>
    )
  }

  return null
}
