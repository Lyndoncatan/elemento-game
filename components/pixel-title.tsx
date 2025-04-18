"use client"

import { useEffect, useRef } from "react"

interface PixelTitleProps {
  text: string
}

export default function PixelTitle({ text }: PixelTitleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 400
    canvas.height = 80

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Define pixel size
    const pixelSize = 8

    // Define the pixel font
    const pixelFont: Record<string, number[][]> = {
      E: [
        [1, 1, 1, 1],
        [1, 0, 0, 0],
        [1, 1, 1, 0],
        [1, 0, 0, 0],
        [1, 1, 1, 1],
      ],
      L: [
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 1, 1, 1],
      ],
      M: [
        [1, 0, 0, 1],
        [1, 1, 1, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
      ],
      N: [
        [1, 0, 0, 1],
        [1, 1, 0, 1],
        [1, 0, 1, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
      ],
      T: [
        [1, 1, 1, 1],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
      ],
      O: [
        [1, 1, 1, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 1, 1, 1],
      ],
    }

    // Draw the text
    let xOffset = 20
    for (let i = 0; i < text.length; i++) {
      const char = text[i]
      const pixelData = pixelFont[char]

      if (pixelData) {
        for (let y = 0; y < pixelData.length; y++) {
          for (let x = 0; x < pixelData[y].length; x++) {
            if (pixelData[y][x] === 1) {
              // Draw pixel
              ctx.fillStyle = "#00ff00"
              ctx.fillRect(xOffset + x * pixelSize, 20 + y * pixelSize, pixelSize, pixelSize)

              // Add inner detail to pixels for a more textured look
              ctx.fillStyle = "#00dd00"
              ctx.fillRect(xOffset + x * pixelSize + 2, 20 + y * pixelSize + 2, pixelSize - 4, pixelSize - 4)
            }
          }
        }
        xOffset += (pixelData[0].length + 1) * pixelSize
      } else {
        // Space or unknown character
        xOffset += 3 * pixelSize
      }
    }

    // Animation frame
    let frame = 0
    const animate = () => {
      frame++

      // Redraw the canvas for animation effects
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Redraw text with slight animation
      xOffset = 20

      for (let i = 0; i < text.length; i++) {
        const char = text[i]
        const pixelData = pixelFont[char]

        if (pixelData) {
          for (let y = 0; y < pixelData.length; y++) {
            for (let x = 0; x < pixelData[y].length; x++) {
              if (pixelData[y][x] === 1) {
                // Animate color slightly
                const green = 200 + Math.sin(frame / 10 + i) * 55
                ctx.fillStyle = `rgb(0, ${green}, 0)`
                ctx.fillRect(xOffset + x * pixelSize, 20 + y * pixelSize, pixelSize, pixelSize)

                // Add inner detail to pixels
                ctx.fillStyle = `rgb(0, ${green - 30}, 0)`
                ctx.fillRect(xOffset + x * pixelSize + 2, 20 + y * pixelSize + 2, pixelSize - 4, pixelSize - 4)
              }
            }
          }
          xOffset += (pixelData[0].length + 1) * pixelSize
        } else {
          // Space or unknown character
          xOffset += 3 * pixelSize
        }
      }

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [text])

  return (
    <canvas
      ref={canvasRef}
      className="pixel-title-canvas z-10 relative"
      style={{
        width: "100%",
        maxWidth: "400px",
        height: "80px",
        imageRendering: "pixelated",
      }}
    />
  )
}
