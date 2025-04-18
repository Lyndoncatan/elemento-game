import type { Character, Enemy, Background } from "./game-types"

// Draw a pixel art character on the canvas
export function drawCharacter(ctx: CanvasRenderingContext2D, character: Character, x: number, y: number) {
  // Draw character body
  ctx.fillStyle = character.outfitColor
  ctx.fillRect(x - 20, y - 40, 40, 60)

  // Draw character head
  ctx.fillStyle = character.skinColor
  ctx.fillRect(x - 15, y - 70, 30, 30)

  // Draw character hair
  ctx.fillStyle = character.hairColor
  ctx.fillRect(x - 15, y - 80, 30, 15)

  // Draw character eyes
  ctx.fillStyle = "#000000"
  ctx.fillRect(x - 10, y - 60, 5, 5)
  ctx.fillRect(x + 5, y - 60, 5, 5)

  // Draw character mouth
  ctx.fillRect(x - 5, y - 50, 10, 3)

  // Draw character arms
  ctx.fillStyle = character.outfitColor
  ctx.fillRect(x - 30, y - 30, 10, 30)
  ctx.fillRect(x + 20, y - 30, 10, 30)

  // Draw character legs
  ctx.fillRect(x - 15, y + 20, 10, 30)
  ctx.fillRect(x + 5, y + 20, 10, 30)

  // Draw elemental effects
  if (character.elements && character.elements.length > 0) {
    // First element effect
    drawElementalEffect(ctx, character.elements[0], x - 40, y - 60)

    // Second element effect if exists
    if (character.elements.length > 1) {
      drawElementalEffect(ctx, character.elements[1], x + 40, y - 60)
    }
  }
}

// Draw a pixel art enemy on the canvas
export function drawEnemy(ctx: CanvasRenderingContext2D, enemy: Enemy, x: number, y: number) {
  switch (enemy.type.toLowerCase()) {
    case "slime":
      drawSlime(ctx, x, y, enemy.level)
      break
    case "goblin":
      drawGoblin(ctx, x, y, enemy.level)
      break
    case "skeleton":
      drawSkeleton(ctx, x, y, enemy.level)
      break
    case "ghost":
      drawGhost(ctx, x, y, enemy.level)
      break
    case "orc":
      drawOrc(ctx, x, y, enemy.level)
      break
    case "dragon":
      drawDragon(ctx, x, y, enemy.level)
      break
    case "elemental":
      drawElemental(ctx, x, y, enemy.level, enemy.elements[0] || "fire")
      break
    default:
      drawGenericEnemy(ctx, x, y, enemy)
      break
  }

  // Draw elemental effects
  if (enemy.elements && enemy.elements.length > 0) {
    // First element effect
    drawElementalEffect(ctx, enemy.elements[0], x - 40, y - 60)

    // Second element effect if exists
    if (enemy.elements.length > 1) {
      drawElementalEffect(ctx, enemy.elements[1], x + 40, y - 60)
    }
  }
}

// Draw the game background
export function drawBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  background: Background = "temple",
) {
  // We'll add some background-specific elements based on the type
  // but the main background image will be handled in the game-canvas.tsx

  // Add some background elements based on the background type
  for (let i = 0; i < 15; i++) {
    const starX = Math.random() * width
    const starY = Math.random() * (height - 100)
    const starSize = 2 + Math.random() * 3

    switch (background) {
      case "cave":
        // Add lava particles
        ctx.fillStyle = `rgba(255, ${Math.floor(100 + Math.random() * 100)}, 0, ${0.5 + Math.random() * 0.5})`
        break
      case "desert":
        // Add sand particles
        ctx.fillStyle = `rgba(255, ${Math.floor(200 + Math.random() * 55)}, ${Math.floor(100 + Math.random() * 100)}, ${0.5 + Math.random() * 0.5})`
        break
      case "snow":
        // Add snow particles
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        break
      case "temple":
        // Add cherry blossom particles
        ctx.fillStyle = `rgba(255, ${Math.floor(150 + Math.random() * 50)}, ${Math.floor(200 + Math.random() * 55)}, ${0.5 + Math.random() * 0.5})`
        break
      default:
        ctx.fillStyle = "#00ff00"
    }

    ctx.beginPath()
    ctx.arc(starX, starY, starSize, 0, Math.PI * 2)
    ctx.fill()
  }

  // Draw ground based on background type
  switch (background) {
    case "cave":
      ctx.fillStyle = "#442244"
      break
    case "desert":
      ctx.fillStyle = "#ddaa55"
      break
    case "snow":
      ctx.fillStyle = "#ccddff"
      break
    case "temple":
      ctx.fillStyle = "#556677"
      break
    default:
      ctx.fillStyle = "#004400"
  }

  // Draw ground at the bottom
  ctx.fillRect(0, height - 50, width, 50)
}

// Helper functions for drawing enemies
function drawSlime(ctx: CanvasRenderingContext2D, x: number, y: number, level: number) {
  const size = 30 + level * 2

  // Slime body - more detailed with gradient
  const gradient = ctx.createRadialGradient(x, y, 5, x, y, size)
  gradient.addColorStop(0, "#00ff00")
  gradient.addColorStop(1, "#008800")

  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.ellipse(x, y, size, size / 1.5, 0, 0, Math.PI * 2)
  ctx.fill()

  // Slime highlights
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
  ctx.beginPath()
  ctx.ellipse(x - 10, y - 10, size / 3, size / 6, Math.PI / 4, 0, Math.PI * 2)
  ctx.fill()

  // Slime eyes - more expressive
  ctx.fillStyle = "#000000"
  ctx.beginPath()
  ctx.arc(x - 10, y - 5, 4, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(x + 10, y - 5, 4, 0, Math.PI * 2)
  ctx.fill()

  // Eye highlights
  ctx.fillStyle = "#ffffff"
  ctx.beginPath()
  ctx.arc(x - 11, y - 6, 1.5, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(x + 9, y - 6, 1.5, 0, Math.PI * 2)
  ctx.fill()

  // Slime mouth - cute smile
  ctx.strokeStyle = "#000000"
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(x, y + 5, 8, 0.2, Math.PI - 0.2)
  ctx.stroke()

  // Slime crown (for higher levels)
  if (level > 3) {
    ctx.fillStyle = "#ffff00"
    ctx.beginPath()
    ctx.moveTo(x - 15, y - 20)
    ctx.lineTo(x - 10, y - 30)
    ctx.lineTo(x, y - 20)
    ctx.lineTo(x + 10, y - 30)
    ctx.lineTo(x + 15, y - 20)
    ctx.fill()
  }

  // Slime bubbles (for higher levels)
  if (level > 2) {
    for (let i = 0; i < level; i++) {
      const bubbleX = x - size / 2 + Math.random() * size
      const bubbleY = y - size / 4 + Math.random() * (size / 2)
      const bubbleSize = 2 + Math.random() * 4

      ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
      ctx.beginPath()
      ctx.arc(bubbleX, bubbleY, bubbleSize, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Level indicator
  ctx.fillStyle = "#ffffff"
  ctx.font = "12px CyberAlert, PixelGaming"
  ctx.fillText(`Lv.${level}`, x - 10, y - 30)
}

function drawGoblin(ctx: CanvasRenderingContext2D, x: number, y: number, level: number) {
  // Goblin body
  ctx.fillStyle = "#00aa00"
  ctx.fillRect(x - 20, y - 40, 40, 60)

  // Goblin head - more detailed
  ctx.fillStyle = "#00aa00"
  ctx.beginPath()
  ctx.ellipse(x, y - 55, 20, 25, 0, 0, Math.PI * 2)
  ctx.fill()

  // Goblin eyes - more expressive
  ctx.fillStyle = "#ff0000"
  ctx.beginPath()
  ctx.arc(x - 8, y - 60, 4, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(x + 8, y - 60, 4, 0, Math.PI * 2)
  ctx.fill()

  // Eye pupils
  ctx.fillStyle = "#000000"
  ctx.beginPath()
  ctx.arc(x - 8, y - 60, 2, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(x + 8, y - 60, 2, 0, Math.PI * 2)
  ctx.fill()

  // Goblin mouth - jagged teeth
  ctx.fillStyle = "#000000"
  ctx.beginPath()
  ctx.moveTo(x - 10, y - 50)
  ctx.lineTo(x - 5, y - 45)
  ctx.lineTo(x, y - 50)
  ctx.lineTo(x + 5, y - 45)
  ctx.lineTo(x + 10, y - 50)
  ctx.fill()

  // Goblin ears - pointy
  ctx.fillStyle = "#00aa00"
  ctx.beginPath()
  ctx.moveTo(x - 20, y - 65)
  ctx.lineTo(x - 30, y - 75)
  ctx.lineTo(x - 25, y - 55)
  ctx.closePath()
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(x + 20, y - 65)
  ctx.lineTo(x + 30, y - 75)
  ctx.lineTo(x + 25, y - 55)
  ctx.closePath()
  ctx.fill()

  // Goblin arms
  ctx.fillStyle = "#00aa00"
  ctx.fillRect(x - 30, y - 30, 10, 30)
  ctx.fillRect(x + 20, y - 30, 10, 30)

  // Goblin hands - clawed
  ctx.fillStyle = "#008800"
  ctx.beginPath()
  ctx.moveTo(x - 35, y - 5)
  ctx.lineTo(x - 40, y)
  ctx.lineTo(x - 35, y + 5)
  ctx.lineTo(x - 25, y + 5)
  ctx.lineTo(x - 20, y)
  ctx.lineTo(x - 25, y - 5)
  ctx.closePath()
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(x + 35, y - 5)
  ctx.lineTo(x + 40, y)
  ctx.lineTo(x + 35, y + 5)
  ctx.lineTo(x + 25, y + 5)
  ctx.lineTo(x + 20, y)
  ctx.lineTo(x + 25, y - 5)
  ctx.closePath()
  ctx.fill()

  // Goblin legs
  ctx.fillStyle = "#00aa00"
  ctx.fillRect(x - 15, y + 20, 10, 30)
  ctx.fillRect(x + 5, y + 20, 10, 30)

  // Goblin feet - clawed
  ctx.fillStyle = "#008800"
  ctx.beginPath()
  ctx.moveTo(x - 20, y + 50)
  ctx.lineTo(x - 25, y + 55)
  ctx.lineTo(x - 5, y + 55)
  ctx.lineTo(x, y + 50)
  ctx.closePath()
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(x + 20, y + 50)
  ctx.lineTo(x + 25, y + 55)
  ctx.lineTo(x + 5, y + 55)
  ctx.lineTo(x, y + 50)
  ctx.closePath()
  ctx.fill()

  // Weapon for higher levels
  if (level > 3) {
    // Club
    ctx.fillStyle = "#aa5500"
    ctx.fillRect(x - 45, y - 20, 10, 40)

    // Spikes
    ctx.fillStyle = "#aaaaaa"
    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      ctx.moveTo(x - 45, y - 15 + i * 10)
      ctx.lineTo(x - 55, y - 10 + i * 10)
      ctx.lineTo(x - 45, y - 5 + i * 10)
      ctx.closePath()
      ctx.fill()
    }
  }

  // Level indicator
  ctx.fillStyle = "#ffffff"
  ctx.font = "12px CyberAlert, PixelGaming"
  ctx.fillText(`Lv.${level}`, x - 10, y - 80)
}

function drawSkeleton(ctx: CanvasRenderingContext2D, x: number, y: number, level: number) {
  // Skeleton body - ribcage with glow effect
  ctx.strokeStyle = "#ffffff"
  ctx.fillStyle = "#ffffff"
  ctx.lineWidth = 2

  // Add glow effect for higher levels
  if (level > 3) {
    ctx.shadowColor = "#00ffff"
    ctx.shadowBlur = 10
  }

  // Ribcage
  for (let i = 0; i < 4; i++) {
    ctx.beginPath()
    ctx.ellipse(x, y - 30 + i * 10, 15, 5, 0, 0, Math.PI * 2)
    ctx.stroke()
  }

  // Spine
  ctx.beginPath()
  ctx.moveTo(x, y - 40)
  ctx.lineTo(x, y + 20)
  ctx.stroke()

  // Arms with hands
  ctx.beginPath()
  ctx.moveTo(x - 20, y - 20)
  ctx.lineTo(x, y - 30)
  ctx.lineTo(x + 20, y - 20)
  ctx.stroke()

  // Left hand - more detailed
  ctx.beginPath()
  ctx.moveTo(x - 20, y - 20)
  ctx.lineTo(x - 25, y - 15)
  ctx.moveTo(x - 20, y - 20)
  ctx.lineTo(x - 25, y - 25)
  ctx.moveTo(x - 20, y - 20)
  ctx.lineTo(x - 15, y - 15)
  ctx.stroke()

  // Right hand - more detailed
  ctx.beginPath()
  ctx.moveTo(x + 20, y - 20)
  ctx.lineTo(x + 25, y - 15)
  ctx.moveTo(x + 20, y - 20)
  ctx.lineTo(x + 25, y - 25)
  ctx.moveTo(x + 20, y - 20)
  ctx.lineTo(x + 15, y - 15)
  ctx.stroke()

  // Legs with feet
  ctx.beginPath()
  ctx.moveTo(x, y + 20)
  ctx.lineTo(x - 15, y + 50)
  ctx.moveTo(x, y + 20)
  ctx.lineTo(x + 15, y + 50)
  ctx.stroke()

  // Feet - more detailed
  ctx.beginPath()
  ctx.moveTo(x - 15, y + 50)
  ctx.lineTo(x - 25, y + 50)
  ctx.lineTo(x - 30, y + 55)
  ctx.moveTo(x + 15, y + 50)
  ctx.lineTo(x + 25, y + 50)
  ctx.lineTo(x + 30, y + 55)
  ctx.stroke()

  // Skull - more detailed
  ctx.beginPath()
  ctx.arc(x, y - 55, 15, 0, Math.PI * 2)
  ctx.fill()

  // Eyes - glowing for higher levels
  if (level > 3) {
    ctx.fillStyle = "#00ffff"
  } else {
    ctx.fillStyle = "#000000"
  }
  ctx.beginPath()
  ctx.arc(x - 7, y - 60, 3, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(x + 7, y - 60, 3, 0, Math.PI * 2)
  ctx.fill()

  // Teeth
  ctx.fillStyle = "#ffffff"
  ctx.strokeStyle = "#000000"
  ctx.lineWidth = 1
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(x - 8 + i * 4, y - 50, 3, 5)
    ctx.strokeRect(x - 8 + i * 4, y - 50, 3, 5)
  }

  // Weapon for higher levels
  if (level > 3) {
    // Scythe
    ctx.strokeStyle = "#aaaaaa"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(x + 30, y - 60)
    ctx.lineTo(x + 30, y)
    ctx.stroke()

    // Blade
    ctx.fillStyle = "#aaaaaa"
    ctx.beginPath()
    ctx.moveTo(x + 30, y - 60)
    ctx.quadraticCurveTo(x + 50, y - 80, x + 60, y - 60)
    ctx.quadraticCurveTo(x + 50, y - 50, x + 30, y - 50)
    ctx.closePath()
    ctx.fill()
  }

  // Reset shadow
  ctx.shadowColor = "transparent"
  ctx.shadowBlur = 0

  // Level indicator
  ctx.fillStyle = "#ffffff"
  ctx.font = "12px CyberAlert, PixelGaming"
  ctx.fillText(`Lv.${level}`, x - 10, y - 80)
}

function drawGhost(ctx: CanvasRenderingContext2D, x: number, y: number, level: number) {
  // Ghost body with transparency
  ctx.globalAlpha = 0.7

  // Create gradient for ghost body
  const gradient = ctx.createLinearGradient(x, y - 60, x, y + 30)
  gradient.addColorStop(0, "#aaaaff")
  gradient.addColorStop(1, "#6666cc")
  ctx.fillStyle = gradient

  // Main body
  ctx.beginPath()
  ctx.moveTo(x - 25, y - 40)
  ctx.quadraticCurveTo(x - 25, y + 30, x, y + 20)
  ctx.quadraticCurveTo(x + 25, y + 30, x + 25, y - 40)
  ctx.quadraticCurveTo(x, y - 60, x - 25, y - 40)
  ctx.fill()

  // Wavy bottom
  ctx.strokeStyle = "#ffffff"
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(x - 25, y + 10)
  ctx.quadraticCurveTo(x - 15, y + 20, x - 10, y + 10)
  ctx.quadraticCurveTo(x, y + 20, x + 10, y + 10)
  ctx.quadraticCurveTo(x + 20, y + 20, x + 25, y + 10)
  ctx.stroke()

  // Ghost eyes - more expressive
  ctx.globalAlpha = 1.0
  ctx.fillStyle = "#000000"
  ctx.beginPath()
  ctx.arc(x - 10, y - 30, 5, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(x + 10, y - 30, 5, 0, Math.PI * 2)
  ctx.fill()

  // Eye highlights
  ctx.fillStyle = "#ffffff"
  ctx.beginPath()
  ctx.arc(x - 12, y - 32, 2, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(x + 8, y - 32, 2, 0, Math.PI * 2)
  ctx.fill()

  // Ghost mouth - spooky
  ctx.strokeStyle = "#000000"
  if (level > 3) {
    // Scary mouth for higher levels
    ctx.fillStyle = "#000000"
    ctx.beginPath()
    ctx.moveTo(x - 10, y - 15)
    ctx.lineTo(x - 5, y - 10)
    ctx.lineTo(x, y - 15)
    ctx.lineTo(x + 5, y - 10)
    ctx.lineTo(x + 10, y - 15)
    ctx.closePath()
    ctx.fill()
  } else {
    // Simple mouth for lower levels
    ctx.beginPath()
    ctx.arc(x, y - 15, 8, 0, Math.PI)
    ctx.stroke()
  }

  // Ghostly arms
  ctx.globalAlpha = 0.7
  ctx.strokeStyle = "#aaaaff"
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(x - 25, y - 20)
  ctx.quadraticCurveTo(x - 40, y - 10, x - 35, y)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(x + 25, y - 20)
  ctx.quadraticCurveTo(x + 40, y - 10, x + 35, y)
  ctx.stroke()

  // Ghostly glow for higher levels
  if (level > 3) {
    ctx.globalAlpha = 0.3
    ctx.fillStyle = "#aaaaff"
    ctx.beginPath()
    ctx.arc(x, y - 20, 40, 0, Math.PI * 2)
    ctx.fill()

    // Add particles
    for (let i = 0; i < 10; i++) {
      const particleX = x - 40 + Math.random() * 80
      const particleY = y - 60 + Math.random() * 80
      const particleSize = 1 + Math.random() * 3

      ctx.globalAlpha = Math.random() * 0.5
      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Reset alpha
  ctx.globalAlpha = 1.0

  // Level indicator
  ctx.fillStyle = "#ffffff"
  ctx.font = "12px CyberAlert, PixelGaming"
  ctx.fillText(`Lv.${level}`, x - 10, y - 60)
}

function drawOrc(ctx: CanvasRenderingContext2D, x: number, y: number, level: number) {
  // Orc body
  ctx.fillStyle = "#557733"
  ctx.fillRect(x - 25, y - 40, 50, 60)

  // Orc head - more detailed
  ctx.fillStyle = "#557733"
  ctx.beginPath()
  ctx.arc(x, y - 55, 25, 0, Math.PI * 2)
  ctx.fill()

  // Orc eyes - angry
  ctx.fillStyle = "#ff0000"
  ctx.beginPath()
  ctx.arc(x - 10, y - 60, 5, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(x + 10, y - 60, 5, 0, Math.PI * 2)
  ctx.fill()

  // Eye pupils
  ctx.fillStyle = "#000000"
  ctx.beginPath()
  ctx.arc(x - 10, y - 60, 2, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(x + 10, y - 60, 2, 0, Math.PI * 2)
  ctx.fill()

  // Orc mouth with tusks
  ctx.fillStyle = "#000000"
  ctx.fillRect(x - 15, y - 45, 30, 5)

  // Tusks - larger
  ctx.fillStyle = "#ffffff"
  ctx.beginPath()
  ctx.moveTo(x - 15, y - 45)
  ctx.lineTo(x - 20, y - 35)
  ctx.lineTo(x - 10, y - 45)
  ctx.closePath()
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(x + 15, y - 45)
  ctx.lineTo(x + 20, y - 35)
  ctx.lineTo(x + 10, y - 45)
  ctx.closePath()
  ctx.fill()

  // Orc ears - pointed
  ctx.fillStyle = "#557733"
  ctx.beginPath()
  ctx.moveTo(x - 25, y - 65)
  ctx.lineTo(x - 40, y - 75)
  ctx.lineTo(x - 35, y - 55)
  ctx.closePath()
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(x + 25, y - 65)
  ctx.lineTo(x + 40, y - 75)
  ctx.lineTo(x + 35, y - 55)
  ctx.closePath()
  ctx.fill()

  // Orc arms - muscular
  ctx.fillStyle = "#557733"
  ctx.beginPath()
  ctx.ellipse(x - 30, y - 10, 10, 20, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(x + 30, y - 10, 10, 20, 0, 0, Math.PI * 2)
  ctx.fill()

  // Orc hands
  ctx.fillStyle = "#446622"
  ctx.beginPath()
  ctx.arc(x - 35, y + 15, 10, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(x + 35, y + 15, 10, 0, Math.PI * 2)
  ctx.fill()

  // Fingers
  ctx.fillStyle = "#557733"
  for (let i = 0; i < 3; i++) {
    ctx.beginPath()
    ctx.arc(x - 40 + i * 5, y + 20, 3, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(x + 30 + i * 5, y + 20, 3, 0, Math.PI * 2)
    ctx.fill()
  }

  // Orc legs
  ctx.fillStyle = "#557733"
  ctx.fillRect(x - 20, y + 20, 15, 30)
  ctx.fillRect(x + 5, y + 20, 15, 30)

  // Orc feet
  ctx.fillStyle = "#446622"
  ctx.beginPath()
  ctx.ellipse(x - 12, y + 55, 15, 8, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(x + 12, y + 55, 15, 8, 0, 0, Math.PI * 2)
  ctx.fill()

  // Armor for higher levels
  if (level > 3) {
    ctx.fillStyle = "#aaaaaa"
    ctx.fillRect(x - 25, y - 40, 50, 15)

    // Shoulder pads
    ctx.beginPath()
    ctx.arc(x - 25, y - 30, 10, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(x + 25, y - 30, 10, 0, Math.PI * 2)
    ctx.fill()

    // Helmet
    ctx.beginPath()
    ctx.arc(x, y - 70, 15, 0, Math.PI, true)
    ctx.fill()

    // Helmet spike
    ctx.beginPath()
    ctx.moveTo(x - 5, y - 85)
    ctx.lineTo(x, y - 95)
    ctx.lineTo(x + 5, y - 85)
    ctx.closePath()
    ctx.fill()
  }

  // Weapon for higher levels
  if (level > 5) {
    // Axe handle
    ctx.fillStyle = "#aa5500"
    ctx.fillRect(x - 50, y - 20, 10, 60)

    // Axe head
    ctx.fillStyle = "#aaaaaa"
    ctx.beginPath()
    ctx.moveTo(x - 50, y - 30)
    ctx.lineTo(x - 70, y - 40)
    ctx.lineTo(x - 70, y - 10)
    ctx.lineTo(x - 50, y - 20)
    ctx.closePath()
    ctx.fill()
  }

  // Level indicator
  ctx.fillStyle = "#ffffff"
  ctx.font = "12px CyberAlert, PixelGaming"
  ctx.fillText(`Lv.${level}`, x - 10, y - 85)
}

function drawDragon(ctx: CanvasRenderingContext2D, x: number, y: number, level: number) {
  // Dragon body color based on level
  let bodyColor = "#ff0000"
  if (level > 5) {
    bodyColor = "#aa00aa" // Purple for high levels
  } else if (level > 3) {
    bodyColor = "#ff6600" // Orange for medium levels
  }

  // Dragon body
  ctx.fillStyle = bodyColor
  ctx.beginPath()
  ctx.ellipse(x, y, 40, 25, 0, 0, Math.PI * 2)
  ctx.fill()

  // Dragon neck
  ctx.beginPath()
  ctx.moveTo(x - 20, y - 15)
  ctx.quadraticCurveTo(x - 30, y - 40, x - 40, y - 50)
  ctx.lineTo(x - 30, y - 60)
  ctx.quadraticCurveTo(x - 20, y - 50, x - 10, y - 30)
  ctx.closePath()
  ctx.fill()

  // Dragon head
  ctx.beginPath()
  ctx.ellipse(x - 35, y - 65, 15, 10, -Math.PI / 4, 0, Math.PI * 2)
  ctx.fill()

  // Dragon eye
  ctx.fillStyle = "#ffff00"
  ctx.beginPath()
  ctx.arc(x - 40, y - 68, 3, 0, Math.PI * 2)
  ctx.fill()

  // Dragon pupil
  ctx.fillStyle = "#000000"
  ctx.beginPath()
  ctx.arc(x - 41, y - 68, 1, 0, Math.PI * 2)
  ctx.fill()

  // Dragon mouth
  ctx.beginPath()
  ctx.moveTo(x - 50, y - 65)
  ctx.lineTo(x - 45, y - 60)
  ctx.lineTo(x - 30, y - 60)
  ctx.stroke()

  // Dragon teeth
  ctx.fillStyle = "#ffffff"
  for (let i = 0; i < 3; i++) {
    ctx.beginPath()
    ctx.moveTo(x - 48 + i * 6, y - 60)
    ctx.lineTo(x - 45 + i * 6, y - 55)
    ctx.lineTo(x - 42 + i * 6, y - 60)
    ctx.closePath()
    ctx.fill()
  }

  // Dragon tail
  ctx.fillStyle = bodyColor
  ctx.beginPath()
  ctx.moveTo(x + 30, y)
  ctx.quadraticCurveTo(x + 50, y - 10, x + 70, y - 20)
  ctx.lineTo(x + 75, y - 15)
  ctx.quadraticCurveTo(x + 60, y, x + 40, y + 10)
  ctx.closePath()
  ctx.fill()

  // Dragon wings
  ctx.beginPath()
  ctx.moveTo(x, y - 20)
  ctx.quadraticCurveTo(x + 20, y - 60, x + 50, y - 40)
  ctx.quadraticCurveTo(x + 30, y - 30, x + 10, y - 10)
  ctx.closePath()
  ctx.fill()

  // Wing details
  ctx.strokeStyle = "#000000"
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(x + 10, y - 40)
  ctx.lineTo(x + 30, y - 35)
  ctx.moveTo(x + 15, y - 30)
  ctx.lineTo(x + 35, y - 25)
  ctx.stroke()

  // Dragon legs
  ctx.fillStyle = bodyColor
  // Front leg
  ctx.beginPath()
  ctx.moveTo(x - 20, y + 10)
  ctx.lineTo(x - 30, y + 30)
  ctx.lineTo(x - 15, y + 30)
  ctx.closePath()
  ctx.fill()

  // Back leg
  ctx.beginPath()
  ctx.moveTo(x + 20, y + 10)
  ctx.lineTo(x + 30, y + 30)
  ctx.lineTo(x + 15, y + 30)
  ctx.closePath()
  ctx.fill()

  // Dragon claws
  ctx.fillStyle = "#000000"
  for (let i = 0; i < 3; i++) {
    ctx.beginPath()
    ctx.moveTo(x - 30 + i * 5, y + 30)
    ctx.lineTo(x - 28 + i * 5, y + 35)
    ctx.lineTo(x - 26 + i * 5, y + 30)
    ctx.closePath()
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(x + 15 + i * 5, y + 30)
    ctx.lineTo(x + 17 + i * 5, y + 35)
    ctx.lineTo(x + 19 + i * 5, y + 30)
    ctx.closePath()
    ctx.fill()
  }

  // Fire breath for higher levels
  if (level > 4) {
    const gradient = ctx.createLinearGradient(x - 70, y - 65, x - 120, y - 65)
    gradient.addColorStop(0, "#ff0000")
    gradient.addColorStop(0.5, "#ffff00")
    gradient.addColorStop(1, "rgba(255, 255, 0, 0)")

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.moveTo(x - 50, y - 65)
    ctx.lineTo(x - 120, y - 80)
    ctx.lineTo(x - 100, y - 65)
    ctx.lineTo(x - 120, y - 50)
    ctx.closePath()
    ctx.fill()
  }

  // Level indicator
  ctx.fillStyle = "#ffffff"
  ctx.font = "12px CyberAlert, PixelGaming"
  ctx.fillText(`Lv.${level}`, x - 10, y - 90)
}

function drawElemental(ctx: CanvasRenderingContext2D, x: number, y: number, level: number, elementType: string) {
  // Determine color based on element type
  let elementColor = "#ff0000" // Default fire
  let secondaryColor = "#ffff00"

  switch (elementType) {
    case "fire":
      elementColor = "#ff0000"
      secondaryColor = "#ffff00"
      break
    case "water":
      elementColor = "#0000ff"
      secondaryColor = "#00ffff"
      break
    case "ice":
      elementColor = "#00ffff"
      secondaryColor = "#ffffff"
      break
    case "lightning":
      elementColor = "#ffff00"
      secondaryColor = "#ffffff"
      break
    case "air":
      elementColor = "#ffffff"
      secondaryColor = "#ccccff"
      break
    case "lava":
      elementColor = "#ff6600"
      secondaryColor = "#ff0000"
      break
    case "rock":
      elementColor = "#996633"
      secondaryColor = "#ccaa66"
      break
  }

  // Create elemental core
  const gradient = ctx.createRadialGradient(x, y, 5, x, y, 30)
  gradient.addColorStop(0, secondaryColor)
  gradient.addColorStop(0.6, elementColor)
  gradient.addColorStop(1, "rgba(0, 0, 0, 0.5)")

  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(x, y, 30, 0, Math.PI * 2)
  ctx.fill()

  // Add elemental particles
  for (let i = 0; i < 20; i++) {
    const angle = Math.random() * Math.PI * 2
    const distance = 15 + Math.random() * 25
    const size = 2 + Math.random() * 5

    const particleX = x + Math.cos(angle) * distance
    const particleY = y + Math.sin(angle) * distance

    ctx.fillStyle = secondaryColor
    ctx.globalAlpha = 0.2 + Math.random() * 0.8
    ctx.beginPath()
    ctx.arc(particleX, particleY, size, 0, Math.PI * 2)
    ctx.fill()
  }

  // Reset alpha
  ctx.globalAlpha = 1.0

  // Add element-specific details
  switch (elementType) {
    case "fire":
      drawFireDetails(ctx, x, y)
      break
    case "water":
      drawWaterDetails(ctx, x, y)
      break
    case "ice":
      drawIceDetails(ctx, x, y)
      break
    case "lightning":
      drawLightningDetails(ctx, x, y)
      break
    case "air":
      drawAirDetails(ctx, x, y)
      break
    case "lava":
      drawLavaDetails(ctx, x, y)
      break
    case "rock":
      drawRockDetails(ctx, x, y)
      break
  }

  // Add eyes
  ctx.fillStyle = "#ffffff"
  ctx.beginPath()
  ctx.arc(x - 10, y - 5, 5, 0, Math.PI * 2)
  ctx.arc(x + 10, y - 5, 5, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = "#000000"
  ctx.beginPath()
  ctx.arc(x - 10, y - 5, 2, 0, Math.PI * 2)
  ctx.arc(x + 10, y - 5, 2, 0, Math.PI * 2)
  ctx.fill()

  // Add mouth based on level
  if (level > 4) {
    // Angry mouth for higher levels
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(x, y + 10, 10, 0.1, Math.PI - 0.1, true)
    ctx.stroke()
  } else {
    // Simple mouth for lower levels
    ctx.fillStyle = "#000000"
    ctx.beginPath()
    ctx.arc(x, y + 10, 5, 0, Math.PI)
    ctx.fill()
  }

  // Level indicator
  ctx.fillStyle = "#ffffff"
  ctx.font = "12px CyberAlert, PixelGaming"
  ctx.fillText(`Lv.${level}`, x - 10, y - 40)
}

// Helper functions for elemental details
function drawFireDetails(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Flame tendrils
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2
    const length = 20 + Math.random() * 15

    ctx.strokeStyle = "#ffff00"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.quadraticCurveTo(
      x + Math.cos(angle) * length * 0.6,
      y + Math.sin(angle) * length * 0.6,
      x + Math.cos(angle) * length,
      y + Math.sin(angle) * length,
    )
    ctx.stroke()
  }
}

function drawWaterDetails(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Water droplets
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2
    const distance = 25 + Math.random() * 15

    ctx.fillStyle = "#00ffff"
    ctx.beginPath()
    ctx.arc(x + Math.cos(angle) * distance, y + Math.sin(angle) * distance, 3 + Math.random() * 3, 0, Math.PI * 2)
    ctx.fill()
  }
}

function drawIceDetails(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Ice crystals
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2
    const distance = 30

    ctx.fillStyle = "#ffffff"
    ctx.beginPath()
    ctx.moveTo(x + Math.cos(angle) * distance, y + Math.sin(angle) * distance)
    ctx.lineTo(x + Math.cos(angle + 0.2) * (distance - 10), y + Math.sin(angle + 0.2) * (distance - 10))
    ctx.lineTo(x + Math.cos(angle) * (distance + 10), y + Math.sin(angle) * (distance + 10))
    ctx.lineTo(x + Math.cos(angle - 0.2) * (distance - 10), y + Math.sin(angle - 0.2) * (distance - 10))
    ctx.closePath()
    ctx.fill()
  }
}

function drawLightningDetails(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Lightning bolts
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2
    const startX = x + Math.cos(angle) * 20
    const startY = y + Math.sin(angle) * 20
    const endX = x + Math.cos(angle) * 40
    const endY = y + Math.sin(angle) * 40

    ctx.strokeStyle = "#ffff00"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(startX + Math.cos(angle + Math.PI / 2) * 5, startY + Math.sin(angle + Math.PI / 2) * 5)
    ctx.lineTo(startX + Math.cos(angle) * 10, startY + Math.sin(angle) * 10)
    ctx.lineTo(startX + Math.cos(angle - Math.PI / 2) * 5, startY + Math.sin(angle - Math.PI / 2) * 5)
    ctx.lineTo(endX, endY)
    ctx.stroke()
  }
}

function drawAirDetails(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Air swirls
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2
    const centerX = x + Math.cos(angle) * 20
    const centerY = y + Math.sin(angle) * 20

    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(centerX, centerY, 10, 0, Math.PI * 1.5)
    ctx.stroke()
  }
}

function drawLavaDetails(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Lava drips
  for (let i = 0; i < 5; i++) {
    const angle = Math.PI / 2 + (i - 2) * 0.2
    const length = 20 + Math.random() * 15

    ctx.fillStyle = "#ff6600"
    ctx.beginPath()
    ctx.moveTo(x + Math.cos(angle) * 20, y + Math.sin(angle) * 20)
    ctx.quadraticCurveTo(
      x + Math.cos(angle) * (length / 2),
      y + Math.sin(angle) * (length / 2) + 10,
      x + Math.cos(angle) * length,
      y + Math.sin(angle) * length,
    )
    ctx.quadraticCurveTo(
      x + Math.cos(angle) * (length / 2) + 5,
      y + Math.sin(angle) * (length / 2) + 5,
      x + Math.cos(angle) * 20 + 5,
      y + Math.sin(angle) * 20,
    )
    ctx.closePath()
    ctx.fill()
  }
}

function drawRockDetails(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Rock fragments
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2
    const distance = 25 + Math.random() * 10

    ctx.fillStyle = "#996633"
    ctx.beginPath()
    ctx.moveTo(x + Math.cos(angle) * distance, y + Math.sin(angle) * distance)

    // Create irregular rock shape
    for (let j = 0; j < 5; j++) {
      const subAngle = angle + ((j / 5) * Math.PI) / 4
      const subDistance = distance + Math.random() * 5
      ctx.lineTo(x + Math.cos(subAngle) * subDistance, y + Math.sin(subAngle) * subDistance)
    }

    ctx.closePath()
    ctx.fill()
  }
}

function drawGenericEnemy(ctx: CanvasRenderingContext2D, x: number, y: number, enemy: Enemy) {
  // Generic enemy shape - more detailed
  ctx.fillStyle = "#aa0000"

  // Body
  ctx.beginPath()
  ctx.ellipse(x, y - 15, 30, 40, 0, 0, Math.PI * 2)
  ctx.fill()

  // Head
  ctx.beginPath()
  ctx.arc(x, y - 65, 20, 0, Math.PI * 2)
  ctx.fill()

  // Eyes - glowing
  ctx.fillStyle = "#ffff00"
  ctx.beginPath()
  ctx.arc(x - 10, y - 70, 5, 0, Math.PI * 2)
  ctx.arc(x + 10, y - 70, 5, 0, Math.PI * 2)
  ctx.fill()

  // Eye pupils
  ctx.fillStyle = "#000000"
  ctx.beginPath()
  ctx.arc(x - 10, y - 70, 2, 0, Math.PI * 2)
  ctx.arc(x + 10, y - 70, 2, 0, Math.PI * 2)
  ctx.fill()

  // Mouth with teeth
  ctx.fillStyle = "#000000"
  ctx.beginPath()
  ctx.ellipse(x, y - 55, 10, 5, 0, 0, Math.PI * 2)
  ctx.fill()

  // Teeth
  ctx.fillStyle = "#ffffff"
  for (let i = 0; i < 4; i++) {
    ctx.beginPath()
    ctx.moveTo(x - 8 + i * 5, y - 55)
    ctx.lineTo(x - 6 + i * 5, y - 50)
    ctx.lineTo(x - 4 + i * 5, y - 55)
    ctx.closePath()
    ctx.fill()
  }

  // Arms with claws
  ctx.fillStyle = "#aa0000"
  ctx.beginPath()
  ctx.ellipse(x - 30, y - 20, 10, 25, Math.PI / 4, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(x + 30, y - 20, 10, 25, -Math.PI / 4, 0, Math.PI * 2)
  ctx.fill()

  // Claws
  ctx.fillStyle = "#880000"
  for (let i = 0; i < 3; i++) {
    // Left claws
    ctx.beginPath()
    ctx.moveTo(x - 40 + i * 5, y)
    ctx.lineTo(x - 45 + i * 5, y + 10)
    ctx.lineTo(x - 35 + i * 5, y + 5)
    ctx.closePath()
    ctx.fill()

    // Right claws
    ctx.beginPath()
    ctx.moveTo(x + 40 - i * 5, y)
    ctx.lineTo(x + 45 - i * 5, y + 10)
    ctx.lineTo(x + 35 - i * 5, y + 5)
    ctx.closePath()
    ctx.fill()
  }

  // Legs
  ctx.fillStyle = "#aa0000"
  ctx.beginPath()
  ctx.ellipse(x - 15, y + 30, 10, 25, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(x + 15, y + 30, 10, 25, 0, 0, Math.PI * 2)
  ctx.fill()

  // Feet with claws
  ctx.fillStyle = "#880000"
  for (let i = 0; i < 3; i++) {
    // Left foot claws
    ctx.beginPath()
    ctx.moveTo(x - 20 + i * 5, y + 50)
    ctx.lineTo(x - 25 + i * 5, y + 60)
    ctx.lineTo(x - 15 + i * 5, y + 55)
    ctx.closePath()
    ctx.fill()

    // Right foot claws
    ctx.beginPath()
    ctx.moveTo(x + 20 - i * 5, y + 50)
    ctx.lineTo(x + 25 - i * 5, y + 60)
    ctx.lineTo(x + 15 - i * 5, y + 55)
    ctx.closePath()
    ctx.fill()
  }

  // Level indicator
  ctx.fillStyle = "#ffffff"
  ctx.font = "12px CyberAlert, PixelGaming"
  ctx.fillText(`Lv.${enemy.level}`, x - 10, y - 90)
}

// Draw elemental effects
export function drawElementalEffect(ctx: CanvasRenderingContext2D, element: string, x: number, y: number) {
  switch (element) {
    case "lightning":
      drawLightningEffect(ctx, x, y)
      break
    case "fire":
      drawFireEffect(ctx, x, y)
      break
    case "ice":
      drawIceEffect(ctx, x, y)
      break
    case "water":
      drawWaterEffect(ctx, x, y)
      break
    case "air":
      drawAirEffect(ctx, x, y)
      break
    case "lava":
      drawLavaEffect(ctx, x, y)
      break
    case "rock":
      drawRockEffect(ctx, x, y)
      break
  }
}

function drawLightningEffect(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = "#ffff00"
  ctx.beginPath()
  ctx.moveTo(x, y - 10)
  ctx.lineTo(x + 5, y)
  ctx.lineTo(x, y + 5)
  ctx.lineTo(x + 10, y + 15)
  ctx.lineTo(x + 5, y + 5)
  ctx.lineTo(x + 10, y - 5)
  ctx.closePath()
  ctx.fill()
}

function drawFireEffect(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = "#ff0000"

  // Draw flame shape
  ctx.beginPath()
  ctx.moveTo(x, y + 15)
  ctx.quadraticCurveTo(x - 5, y, x, y - 10)
  ctx.quadraticCurveTo(x + 5, y - 5, x + 10, y - 15)
  ctx.quadraticCurveTo(x + 15, y, x + 10, y + 15)
  ctx.closePath()
  ctx.fill()

  // Inner flame
  ctx.fillStyle = "#ffff00"
  ctx.beginPath()
  ctx.moveTo(x + 5, y + 10)
  ctx.quadraticCurveTo(x, y, x + 5, y - 5)
  ctx.quadraticCurveTo(x + 10, y, x + 5, y + 10)
  ctx.closePath()
  ctx.fill()
}

function drawIceEffect(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = "#00ffff"

  // Draw ice crystal
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x - 5, y - 10)
  ctx.lineTo(x, y - 15)
  ctx.lineTo(x + 5, y - 10)
  ctx.closePath()
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x - 5, y + 10)
  ctx.lineTo(x, y + 15)
  ctx.lineTo(x + 5, y + 10)
  ctx.closePath()
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x - 10, y - 5)
  ctx.lineTo(x - 15, y)
  ctx.lineTo(x - 10, y + 5)
  ctx.closePath()
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + 10, y - 5)
  ctx.lineTo(x + 15, y)
  ctx.lineTo(x + 10, y + 5)
  ctx.closePath()
  ctx.fill()
}

function drawWaterEffect(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = "#0000ff"

  // Draw water droplets
  ctx.beginPath()
  ctx.arc(x, y, 8, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(x - 10, y + 5, 5, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(x + 10, y + 5, 5, 0, Math.PI * 2)
  ctx.fill()
}

function drawAirEffect(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.strokeStyle = "#ffffff"
  ctx.lineWidth = 2

  // Draw wind swirls
  ctx.beginPath()
  ctx.arc(x, y, 10, 0, Math.PI * 1.5)
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(x + 5, y - 5, 5, 0, Math.PI * 1.5)
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(x - 5, y + 5, 5, 0, Math.PI * 1.5)
  ctx.stroke()
}

function drawLavaEffect(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Draw lava blob
  ctx.fillStyle = "#ff6600"
  ctx.beginPath()
  ctx.arc(x, y, 10, 0, Math.PI * 2)
  ctx.fill()

  // Draw lava drips
  ctx.beginPath()
  ctx.moveTo(x - 5, y + 10)
  ctx.lineTo(x - 5, y + 20)
  ctx.lineTo(x, y + 15)
  ctx.closePath()
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(x + 5, y + 10)
  ctx.lineTo(x + 5, y + 15)
  ctx.lineTo(x + 10, y + 10)
  ctx.closePath()
  ctx.fill()
}

function drawRockEffect(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = "#996633"

  // Draw rock shapes
  ctx.beginPath()
  ctx.moveTo(x - 10, y)
  ctx.lineTo(x - 5, y - 10)
  ctx.lineTo(x + 5, y - 10)
  ctx.lineTo(x + 10, y)
  ctx.lineTo(x + 5, y + 10)
  ctx.lineTo(x - 5, y + 10)
  ctx.closePath()
  ctx.fill()

  // Rock details
  ctx.fillStyle = "#664422"
  ctx.beginPath()
  ctx.arc(x - 2, y - 2, 2, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(x + 3, y + 4, 2, 0, Math.PI * 2)
  ctx.fill()
}
