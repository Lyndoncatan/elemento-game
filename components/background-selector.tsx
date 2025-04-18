"use client"

import Image from "next/image"
import type { Background } from "@/lib/game-types"

interface BackgroundSelectorProps {
  selectedBackground: Background
  onBackgroundSelect: (background: Background) => void
}

export default function BackgroundSelector({ selectedBackground, onBackgroundSelect }: BackgroundSelectorProps) {
  const backgrounds: { type: Background; name: string; description: string }[] = [
    {
      type: "cave",
      name: "Lava Cave",
      description: "A dangerous cave with flowing lava",
    },
    {
      type: "desert",
      name: "Desert Plains",
      description: "A hot desert with cacti and sand dunes",
    },
    {
      type: "snow",
      name: "Frozen Mountain",
      description: "A cold, snowy mountain landscape",
    },
    {
      type: "temple",
      name: "Cherry Blossom Temple",
      description: "A serene temple with cherry blossoms",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-2">
      {backgrounds.map((background) => (
        <div
          key={background.type}
          onClick={() => onBackgroundSelect(background.type)}
          className={`cursor-pointer border-2 ${
            selectedBackground === background.type ? "border-green-300" : "border-green-500"
          } p-1 transition-all hover:scale-105 ${
            selectedBackground === background.type ? "ring-2 ring-green-500" : ""
          }`}
        >
          <div className="relative h-24 w-full overflow-hidden">
            <Image
              src={`/backgrounds/${background.type}.png`}
              alt={background.name}
              fill
              className="object-cover"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
          <div className="p-1 text-center">
            <h3 className="text-xs font-bold">{background.name}</h3>
          </div>
        </div>
      ))}
    </div>
  )
}
