"use client"

import type React from "react"

import type { ElementType } from "@/lib/game-types"
import { Button } from "@/components/ui/button"
import { Zap, Flame, Snowflake, Droplet, Wind, Mountain, Waves } from "lucide-react"

interface ElementSelectorProps {
  selectedElements: ElementType[]
  onElementSelect: (element: ElementType) => void
}

export default function ElementSelector({ selectedElements, onElementSelect }: ElementSelectorProps) {
  const elements: { type: ElementType; icon: React.ReactNode; name: string; description: string }[] = [
    {
      type: "lightning",
      icon: <Zap className="h-6 w-6" />,
      name: "Lightning",
      description: "Fast attacks, medium damage",
    },
    {
      type: "fire",
      icon: <Flame className="h-6 w-6" />,
      name: "Fire",
      description: "High damage, slow cooldown",
    },
    {
      type: "ice",
      icon: <Snowflake className="h-6 w-6" />,
      name: "Ice",
      description: "Freezes enemies, medium damage",
    },
    {
      type: "water",
      icon: <Droplet className="h-6 w-6" />,
      name: "Water",
      description: "Healing abilities, low damage",
    },
    {
      type: "air",
      icon: <Wind className="h-6 w-6" />,
      name: "Air",
      description: "Dodge attacks, medium damage",
    },
    {
      type: "lava",
      icon: <Waves className="h-6 w-6" />,
      name: "Lava",
      description: "Area damage, high cooldown",
    },
    {
      type: "rock",
      icon: <Mountain className="h-6 w-6" />,
      name: "Rock",
      description: "High defense, low damage",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-2">
      {elements.map((element) => (
        <Button
          key={element.type}
          onClick={() => onElementSelect(element.type)}
          className={`flex items-center justify-between p-2 border-2 
            ${
              selectedElements.includes(element.type)
                ? "bg-green-700 border-green-300 text-black"
                : "bg-black border-green-500 text-green-400 hover:bg-green-600 hover:text-black"
            } text-left transition-colors`}
        >
          <div className="flex items-center">
            <div className={`mr-2 ${selectedElements.includes(element.type) ? "text-black" : "text-green-400"}`}>
              {element.icon}
            </div>
            <div>
              <div className="font-bold">{element.name}</div>
              <div className="text-xs">{element.description}</div>
            </div>
          </div>
          {selectedElements.includes(element.type) && (
            <div className="text-xs border border-black px-1 rounded bg-green-300 text-black">Selected</div>
          )}
        </Button>
      ))}

      <div className="mt-2 text-center">
        <p className="text-sm">Selected: {selectedElements.length}/2</p>
      </div>
    </div>
  )
}
