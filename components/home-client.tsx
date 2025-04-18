"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"

// Dynamically import BackgroundMusic with no SSR
const BackgroundMusic = dynamic(() => import("@/components/music-player"), {
  ssr: false,
})

export default function HomeClient() {
  return (
    <div className="min-h-screen bg-black text-green-500 flex flex-col items-center justify-center pixel-font">
      <div className="pixel-container p-8 border-4 border-green-500 bg-black max-w-2xl w-full relative overflow-hidden">
        <div className="flex justify-center mb-10">
          <h1 className="text-5xl font-bold text-center pixel-title">ELEMENTO</h1>
        </div>

        <div className="space-y-6 text-center mt-16">
          <Link href="/character-select" className="block">
            <Button className="w-full h-14 bg-green-700 hover:bg-green-600 text-black border-2 border-green-500 pixel-button text-lg">
              START GAME
            </Button>
          </Link>

          <Link href="/how-to-play" className="block">
            <Button className="w-full h-14 bg-black hover:bg-green-900 text-green-500 border-2 border-green-500 pixel-button text-lg">
              HOW TO PLAY
            </Button>
          </Link>
        </div>

        <div className="mt-12 text-center text-green-400 pixel-dev-credit border-t-2 border-dashed border-green-700 pt-4">
          <p>Developed by</p>
          <p className="text-xl mt-1">Catan Lyndon</p>
        </div>
      </div>

      {/* Silent music player */}
      <BackgroundMusic />
    </div>
  )
}
