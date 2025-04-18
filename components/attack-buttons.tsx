"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import type { Character } from "@/lib/game-types"
import { Zap, Flame, Snowflake, Droplet, Wind, Mountain, Waves } from "lucide-react"

interface AttackButtonsProps {
  player: Character
  onAttack: (attackType: string) => void
  disabled: boolean
}

export default function AttackButtons({ player, onAttack, disabled }: AttackButtonsProps) {
  // Element icons mapping
  const elementIcons: Record<string, React.ReactNode> = {
    lightning: <Zap className="h-4 w-4" />,
    fire: <Flame className="h-4 w-4" />,
    ice: <Snowflake className="h-4 w-4" />,
    water: <Droplet className="h-4 w-4" />,
    air: <Wind className="h-4 w-4" />,
    lava: <Waves className="h-4 w-4" />,
    rock: <Mountain className="h-4 w-4" />,
  }

  return (
    <div className="attack-buttons-container">
      {player.elements.map((element) => (
        <Button
          key={element}
          onClick={() => onAttack(element)}
          disabled={disabled}
          className={`attack-button ${
            !disabled ? "bg-green-700 hover:bg-green-600 text-black" : "bg-gray-700 text-gray-300 cursor-not-allowed"
          } border-2 border-green-500 pixel-button`}
        >
          <span className="flex items-center justify-center">
            {elementIcons[element]}
            <span className="ml-1">{element.toUpperCase()}</span>
          </span>
        </Button>
      ))}

      {player.elements.length === 2 && (
        <Button
          onClick={() => onAttack("combo")}
          disabled={disabled}
          className={`combo-attack-button ${
            !disabled
              ? "bg-yellow-600 hover:bg-yellow-500 text-black border-2 border-yellow-400"
              : "bg-gray-700 text-gray-300 cursor-not-allowed border-2 border-gray-500"
          } pixel-button`}
        >
          COMBO ATTACK
        </Button>
      )}
    </div>
  )
}
