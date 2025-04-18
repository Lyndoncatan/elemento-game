"use client"

import { useState } from "react"

// This is a silent music player that doesn't actually play audio
// but maintains the interface as if it were working
export default function BackgroundMusic() {
  const [audioEnabled, setAudioEnabled] = useState(false)

  // This function would normally toggle audio playback
  // but now just updates the state for UI purposes
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled)
  }

  // Render a small audio control in the corner
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black bg-opacity-70 p-2 rounded border border-green-500">
      <button onClick={toggleAudio} className="flex items-center text-xs pixel-font hover:text-green-400">
        <span className="mr-2">{audioEnabled ? "🔊" : "🔇"}</span>
        <span>{audioEnabled ? "MUSIC ON" : "MUSIC OFF"}</span>
      </button>
    </div>
  )
}
