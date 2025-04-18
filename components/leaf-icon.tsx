"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

interface LeafIconProps {
  size?: number
}

export default function LeafIcon({ size = 64 }: LeafIconProps) {
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)
  const [isHovering, setIsHovering] = useState(false)
  const animationRef = useRef<number | null>(null)

  // Handle hover animation
  useEffect(() => {
    if (isHovering) {
      let frame = 0

      const animate = () => {
        frame++
        setRotation(Math.sin(frame / 20) * 15)
        setScale(1 + Math.sin(frame / 15) * 0.1)

        animationRef.current = requestAnimationFrame(animate)
      }

      animationRef.current = requestAnimationFrame(animate)
    } else {
      // Reset when not hovering
      setRotation(0)
      setScale(1)

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovering])

  // Random gentle floating animation
  useEffect(() => {
    let frame = 0

    const floatAnimate = () => {
      frame++
      if (!isHovering) {
        setRotation(Math.sin(frame / 60) * 5)
        setScale(1 + Math.sin(frame / 80) * 0.05)
      }

      animationRef.current = requestAnimationFrame(floatAnimate)
    }

    animationRef.current = requestAnimationFrame(floatAnimate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovering])

  return (
    <div
      className="cursor-pointer transition-all duration-300 ease-in-out"
      style={{
        transform: `rotate(${rotation}deg) scale(${scale})`,
        filter: isHovering ? "brightness(1.2) drop-shadow(0 0 5px #00ff00)" : "none",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => {
        // Add a fun click effect
        setScale(0.8)
        setTimeout(() => setScale(1.2), 100)
        setTimeout(() => setScale(1), 200)
      }}
    >
      <Image
        src="/images/leaf-icon.png"
        alt="Leaf Icon"
        width={size}
        height={size}
        className="pixel-art"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  )
}
