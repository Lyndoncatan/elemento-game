"use client"

import type { GameState } from "@/lib/game-types"

interface GameStatsProps {
  gameState: GameState
}

export default function GameStats({ gameState }: GameStatsProps) {
  const { player, enemy } = gameState

  // Calculate XP progress percentage
  const xpNeeded = player.level * 20
  const xpPercentage = Math.min(100, (player.xp / xpNeeded) * 100)

  return (
    <div className="stats-panel">
      {/* Player Stats */}
      <div className="player-stats">
        <h2 className="text-lg font-bold pixel-font">{player.name}</h2>
        <div className="flex items-center mt-1">
          <span className="mr-2 text-sm">HP:</span>
          <div className="w-full bg-black border border-green-500">
            <div className="h-3 bg-green-600" style={{ width: `${(player.health / player.maxHealth) * 100}%` }}></div>
          </div>
          <span className="ml-2 text-xs pixel-font">
            {player.health}/{player.maxHealth}
          </span>
        </div>

        <div className="flex items-center mt-1">
          <span className="mr-2 text-sm">XP:</span>
          <div className="w-full bg-black border border-green-500">
            <div className="h-3 bg-yellow-500" style={{ width: `${xpPercentage}%` }}></div>
          </div>
          <span className="ml-2 text-xs pixel-font">
            {player.xp}/{xpNeeded}
          </span>
        </div>

        <div className="mt-1 text-sm">
          <span>
            Level: <span className="pixel-font">{player.level}</span>
          </span>
        </div>
      </div>

      {/* Enemy Stats */}
      {enemy && (
        <div className="enemy-stats text-right">
          <h2 className="text-lg font-bold text-red-500 pixel-font">{enemy.name}</h2>
          <div className="flex items-center mt-1 justify-end">
            <span className="mr-2 text-sm">HP:</span>
            <div className="w-full bg-black border border-red-500">
              <div className="h-3 bg-red-600" style={{ width: `${(enemy.health / enemy.maxHealth) * 100}%` }}></div>
            </div>
            <span className="ml-2 text-xs pixel-font">
              {enemy.health}/{enemy.maxHealth}
            </span>
          </div>
          <div className="mt-1 text-sm">
            <span>
              Level: <span className="pixel-font">{enemy.level}</span>
            </span>
          </div>
          <div className="mt-1 text-sm">
            <span>
              Elements: <span className="pixel-font">{enemy.elements.join(", ")}</span>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
