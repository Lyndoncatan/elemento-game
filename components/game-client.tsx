"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import GameCanvas from "@/components/game-canvas"
import GameStats from "@/components/game-stats"
import AttackButtons from "@/components/attack-buttons"
import type { Character, GameState, Background } from "@/lib/game-types"
import { generateEnemy, calculateDamage } from "@/lib/game-utils"
import dynamic from "next/dynamic"

// Dynamically import BackgroundMusic with no SSR
const BackgroundMusic = dynamic(() => import("@/components/music-player"), {
  ssr: false,
})

export default function GameClient() {
  const [gameState, setGameState] = useState<GameState>({
    player: {
      hairColor: "#00ff00",
      skinColor: "#ffd29b",
      outfitColor: "#ff0000",
      name: "Player",
      elements: ["fire", "water"],
      health: 100,
      maxHealth: 100,
      xp: 0,
      level: 1,
      weapons: ["basic"],
      position: { x: 100, y: 200 },
    },
    enemy: null,
    currentLevel: 1,
    gameStatus: "starting",
    message: "Prepare for battle!",
    turn: "player",
    background: "temple",
  })

  useEffect(() => {
    // Load character from localStorage
    const savedCharacter = localStorage.getItem("playerCharacter")
    const savedBackground = localStorage.getItem("gameBackground") as Background | null

    if (savedCharacter) {
      try {
        const character = JSON.parse(savedCharacter) as Character
        setGameState((prev) => ({
          ...prev,
          player: {
            ...character,
            health: 100,
            maxHealth: 100,
            xp: 0,
            level: 1,
            weapons: ["basic"],
            position: { x: 100, y: 200 },
          },
          background: savedBackground || "temple",
        }))
      } catch (e) {
        console.error("Failed to parse saved character")
      }
    }

    // Generate first enemy
    const firstEnemy = generateEnemy(1)
    setGameState((prev) => ({
      ...prev,
      enemy: firstEnemy,
      gameStatus: "playing",
      turn: "player",
    }))
  }, [])

  const handleAttack = (attackType: string) => {
    if (gameState.gameStatus !== "playing" || !gameState.enemy || gameState.turn !== "player") return

    // Trigger attack animation
    const attackEvent = new CustomEvent("elemento-attack", {
      detail: {
        element: attackType,
        targetX: 600, // Enemy position X
        targetY: 250, // Enemy position Y
      },
    })
    window.dispatchEvent(attackEvent)

    // Simple combat logic
    const playerDamage = calculateDamage(gameState.player.level, attackType, gameState.enemy.elements)
    const updatedEnemyHealth = Math.max(0, gameState.enemy.health - playerDamage)

    let message = `You dealt ${playerDamage} damage with ${attackType}!`
    const updatedGameStatus = gameState.gameStatus
    let updatedXp = gameState.player.xp
    let updatedLevel = gameState.player.level
    const updatedWeapons = [...gameState.player.weapons]
    let updatedEnemy = { ...gameState.enemy, health: updatedEnemyHealth }
    let updatedTurn = "enemy" // Switch to enemy turn

    // Check if enemy is defeated
    if (updatedEnemyHealth <= 0) {
      const xpGain = gameState.enemy.level * 10
      updatedXp += xpGain
      message = `Victory! Gained ${xpGain} XP!`
      updatedTurn = "player" // Player gets to go first in next battle

      // Level up check
      if (updatedXp >= updatedLevel * 20) {
        updatedLevel += 1
        message += ` LEVEL UP! You are now level ${updatedLevel}!`

        // New weapon on level up
        if (updatedLevel % 2 === 0 && updatedLevel <= 10) {
          const newWeapon = `level${updatedLevel}_weapon`
          updatedWeapons.push(newWeapon)
          message += ` Gained new weapon!`
        }
      }

      // Generate new enemy for next battle
      const nextEnemy = generateEnemy(Math.min(10, gameState.currentLevel + 1))
      updatedEnemy = nextEnemy

      setGameState((prev) => ({
        ...prev,
        player: {
          ...prev.player,
          xp: updatedXp,
          level: updatedLevel,
          weapons: updatedWeapons,
        },
        enemy: updatedEnemy,
        currentLevel: Math.min(10, prev.currentLevel + 1),
        gameStatus: "playing",
        message,
        turn: updatedTurn,
      }))
    } else {
      // Update state with player's attack results
      setGameState((prev) => ({
        ...prev,
        enemy: updatedEnemy,
        message,
        turn: updatedTurn,
      }))

      // Enemy's turn after a short delay
      setTimeout(() => {
        if (updatedEnemy && updatedTurn === "enemy") {
          // Enemy attack logic
          const enemyAttackType = updatedEnemy.elements[Math.floor(Math.random() * updatedEnemy.elements.length)]
          const enemyDamage = calculateDamage(updatedEnemy.level, enemyAttackType, gameState.player.elements)
          const updatedPlayerHealth = Math.max(0, gameState.player.health - enemyDamage)

          // Trigger enemy attack animation
          const enemyAttackEvent = new CustomEvent("elemento-attack", {
            detail: {
              element: enemyAttackType,
              targetX: 200, // Player position X
              targetY: 250, // Player position Y
            },
          })
          window.dispatchEvent(enemyAttackEvent)

          const enemyMessage = `Enemy used ${enemyAttackType} and dealt ${enemyDamage} damage!`

          if (updatedPlayerHealth <= 0) {
            // Player defeated
            setGameState((prev) => ({
              ...prev,
              player: {
                ...prev.player,
                health: 0,
              },
              gameStatus: "gameover",
              message: "Game Over! You were defeated!",
              turn: "player",
            }))
          } else {
            // Continue battle, back to player's turn
            setGameState((prev) => ({
              ...prev,
              player: {
                ...prev.player,
                health: updatedPlayerHealth,
              },
              message: enemyMessage,
              turn: "player",
            }))
          }
        }
      }, 1500) // Delay enemy attack for 1.5 seconds
    }
  }

  const restartGame = () => {
    // Reset game state
    const savedCharacter = localStorage.getItem("playerCharacter")
    const savedBackground = localStorage.getItem("gameBackground") as Background | null

    if (savedCharacter) {
      try {
        const character = JSON.parse(savedCharacter) as Character
        const firstEnemy = generateEnemy(1)

        setGameState({
          player: {
            ...character,
            health: 100,
            maxHealth: 100,
            xp: 0,
            level: 1,
            weapons: ["basic"],
            position: { x: 100, y: 200 },
          },
          enemy: firstEnemy,
          currentLevel: 1,
          gameStatus: "playing",
          message: "Prepare for battle!",
          turn: "player",
          background: savedBackground || "temple",
        })
      } catch (e) {
        console.error("Failed to parse saved character")
      }
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-500 flex flex-col items-center justify-center p-4 pixel-font">
      <div className="pixel-container p-4 border-4 border-green-500 bg-black max-w-6xl w-full">
        {/* Turn indicator */}
        {gameState.gameStatus === "playing" && (
          <div
            className={`turn-indicator ${
              gameState.turn === "player" ? "bg-green-700 text-black" : "bg-red-700 text-white"
            }`}
          >
            {gameState.turn === "player" ? "YOUR TURN" : "ENEMY TURN"}
          </div>
        )}

        {/* Stats panel at the top */}
        <GameStats gameState={gameState} />

        {/* Main battle area */}
        <div className="relative mt-2">
          <div className="relative z-10">
            <GameCanvas gameState={gameState} />
          </div>
        </div>

        {/* Attack buttons below battle area */}
        {gameState.gameStatus === "playing" && (
          <AttackButtons player={gameState.player} onAttack={handleAttack} disabled={gameState.turn !== "player"} />
        )}

        {/* Game over message and buttons */}
        <div className="mt-4 text-center">
          {gameState.gameStatus === "gameover" && (
            <div className="space-y-4">
              <p className="text-xl text-red-500">{gameState.message}</p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={restartGame}
                  className="bg-green-700 hover:bg-green-600 text-black border-2 border-green-500 pixel-button"
                >
                  TRY AGAIN
                </Button>
                <Link href="/">
                  <Button className="bg-black hover:bg-green-900 text-green-500 border-2 border-green-500 pixel-button">
                    MAIN MENU
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Silent music player */}
      <BackgroundMusic />
    </div>
  )
}
