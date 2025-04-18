"use client"

import { Button } from "@/components/ui/button"
import type { GameState } from "@/lib/game-types"
import Link from "next/link"

interface GameHUDProps {
  gameState: GameState
  onAttack: (attackType: string) => void
  onRestart: () => void
}

export default function GameHUD({ gameState, onAttack, onRestart }: GameHUDProps) {
  const { player, enemy, gameStatus, turn } = gameState

  // Calculate XP progress percentage
  const xpNeeded = player.level * 20
  const xpPercentage = Math.min(100, (player.xp / xpNeeded) * 100)

  return (
    <div className="game-hud p-4 border-2 border-green-500 h-full flex flex-col">
      {/* Player Stats */}
      <div className="mb-4">
        <h2 className="text-xl font-bold">{player.name}</h2>
        <div className="flex items-center mt-2">
          <span className="mr-2">HP:</span>
          <div className="w-full bg-black border border-green-500">
            <div className="h-4 bg-green-600" style={{ width: `${(player.health / player.maxHealth) * 100}%` }}></div>
          </div>
          <span className="ml-2">
            {player.health}/{player.maxHealth}
          </span>
        </div>

        <div className="flex items-center mt-2">
          <span className="mr-2">XP:</span>
          <div className="w-full bg-black border border-green-500">
            <div className="h-4 bg-yellow-500" style={{ width: `${xpPercentage}%` }}></div>
          </div>
          <span className="ml-2">
            {player.xp}/{xpNeeded}
          </span>
        </div>

        <div className="mt-2">
          <span>Level: {player.level}</span>
        </div>

        <div className="mt-2">
          <span>Elements: {player.elements.join(", ")}</span>
        </div>
      </div>

      {/* Turn Indicator */}
      {gameStatus === "playing" && (
        <div className="mb-4 text-center">
          <div className={`px-3 py-1 rounded ${turn === "player" ? "bg-green-700 text-black" : "bg-red-700"}`}>
            {turn === "player" ? "YOUR TURN" : "ENEMY TURN"}
          </div>
        </div>
      )}

      {/* Enemy Stats */}
      {enemy && (
        <div className="mb-4">
          <h2 className="text-xl font-bold text-red-500">{enemy.name}</h2>
          <div className="flex items-center mt-2">
            <span className="mr-2">HP:</span>
            <div className="w-full bg-black border border-red-500">
              <div className="h-4 bg-red-600" style={{ width: `${(enemy.health / enemy.maxHealth) * 100}%` }}></div>
            </div>
            <span className="ml-2">
              {enemy.health}/{enemy.maxHealth}
            </span>
          </div>
          <div className="mt-2">
            <span>Level: {enemy.level}</span>
          </div>
          <div className="mt-2">
            <span>Elements: {enemy.elements.join(", ")}</span>
          </div>
        </div>
      )}

      {/* Attack Controls */}
      {gameStatus === "playing" && (
        <div className="mt-auto">
          <h3 className="text-lg font-bold mb-2">ATTACKS</h3>
          <div className="space-y-2">
            {player.elements.map((element) => (
              <Button
                key={element}
                onClick={() => onAttack(element)}
                disabled={turn !== "player"}
                className={`w-full ${
                  turn === "player"
                    ? "bg-green-700 hover:bg-green-600 text-black"
                    : "bg-gray-700 text-gray-300 cursor-not-allowed"
                } border-2 border-green-500 pixel-button`}
              >
                {element.toUpperCase()} ATTACK
              </Button>
            ))}

            {player.elements.length === 2 && (
              <Button
                onClick={() => onAttack("combo")}
                disabled={turn !== "player"}
                className={`w-full ${
                  turn === "player"
                    ? "bg-yellow-600 hover:bg-yellow-500 text-black border-2 border-yellow-400"
                    : "bg-gray-700 text-gray-300 cursor-not-allowed border-2 border-gray-500"
                } pixel-button`}
              >
                COMBO ATTACK
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Game Controls */}
      <div className="mt-4">
        {gameStatus === "gameover" ? (
          <Button
            onClick={onRestart}
            className="w-full bg-green-700 hover:bg-green-600 text-black border-2 border-green-500 pixel-button"
          >
            RESTART
          </Button>
        ) : (
          <Link href="/">
            <Button className="w-full bg-black hover:bg-green-900 text-green-500 border-2 border-green-500 pixel-button">
              MAIN MENU
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
