"use client"

import { useRef, useEffect, useState } from "react"
import type { GameState } from "@/lib/game-types"
import { drawCharacter, drawEnemy, drawElementalEffect } from "@/lib/canvas-utils"

interface GameCanvasProps {
  gameState: GameState
}

export default function GameCanvas({ gameState }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [attackAnimation, setAttackAnimation] = useState<{
    active: boolean
    element: string
    targetX: number
    targetY: number
    progress: number
  } | null>(null)

  // Store background image
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null)

  // Preload background image
  useEffect(() => {
    if (gameState.background) {
      const img = new Image()
      img.src = `/backgrounds/${gameState.background}.png`
      img.crossOrigin = "anonymous"
      img.onload = () => setBackgroundImage(img)
    }
  }, [gameState.background])

  // Listen for attack events
  useEffect(() => {
    const handleAttackEvent = (event: CustomEvent) => {
      const { element, targetX, targetY } = event.detail

      setAttackAnimation({
        active: true,
        element,
        targetX,
        targetY,
        progress: 0,
      })

      // Reset animation after it completes
      setTimeout(() => {
        setAttackAnimation(null)
      }, 1000)
    }

    window.addEventListener("elemento-attack" as any, handleAttackEvent as EventListener)

    return () => {
      window.removeEventListener("elemento-attack" as any, handleAttackEvent as EventListener)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 800
    canvas.height = 400

    // Animation frame handler
    let animationFrameId: number

    const render = () => {
      // Clear canvas
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw the actual background image first
      if (backgroundImage) {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
      }

      // Draw grid background on top with transparency
      drawGridBackground(ctx, canvas.width, canvas.height)

      // Draw player
      if (gameState.player) {
        drawCharacter(ctx, gameState.player, 200, 250)
      }

      // Draw enemy
      if (gameState.enemy) {
        drawEnemy(ctx, gameState.enemy, 600, 250)
      }

      // Draw attack animations if active
      if (attackAnimation && attackAnimation.active) {
        // Update progress
        attackAnimation.progress += 0.05

        // Draw the elemental effect moving toward the target
        const startX = 200 // Player position
        const startY = 250

        // Calculate current position based on progress
        const currentX = startX + (attackAnimation.targetX - startX) * attackAnimation.progress
        const currentY = startY + (attackAnimation.targetY - startY) * attackAnimation.progress

        // Draw multiple effects for a more impressive attack
        for (let i = 0; i < 5; i++) {
          const offsetX = Math.random() * 40 - 20
          const offsetY = Math.random() * 40 - 20
          drawElementalEffect(ctx, attackAnimation.element, currentX + offsetX, currentY + offsetY)
        }

        // If we've reached the target, show impact effect
        if (attackAnimation.progress >= 1) {
          // Draw impact effect
          ctx.fillStyle = "#ffffff"
          ctx.beginPath()
          ctx.arc(attackAnimation.targetX, attackAnimation.targetY, 30, 0, Math.PI * 2)
          ctx.fill()

          // Draw text damage indicator
          ctx.fillStyle = "#ff0000"
          ctx.font = "bold 24px CyberAlert, PixelGaming"
          ctx.fillText("HIT!", attackAnimation.targetX - 20, attackAnimation.targetY - 40)
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [gameState, attackAnimation, backgroundImage])

  // Function to draw the grid background
  const drawGridBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw grid lines
    ctx.strokeStyle = "#00ff00"
    ctx.lineWidth = 1
    ctx.globalAlpha = 0.2

    // Vertical lines
    for (let x = 0; x < width; x += 20) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    // Horizontal lines
    for (let y = 0; y < height; y += 20) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Draw ground
    ctx.globalAlpha = 0.7
    ctx.fillStyle = "#8B4513" // Brown color for ground
    ctx.fillRect(0, height - 50, width, 50)

    // Draw top layer of ground (tan/gold)
    ctx.fillStyle = "#DAA520" // Golden color for top layer
    ctx.fillRect(0, height - 50, width, 10)

    // Reset alpha
    ctx.globalAlpha = 1
  }

  return (
    <div className="game-canvas-container border-2 border-green-500 relative">
      <canvas ref={canvasRef} className="pixel-canvas w-full h-auto bg-black" style={{ imageRendering: "pixelated" }} />

      {/* Game message overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 text-center">
        <p className="text-green-500 pixel-font text-xs">{gameState.message}</p>
      </div>
    </div>
  )
}
