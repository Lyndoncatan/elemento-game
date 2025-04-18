import type { Enemy, ElementType } from "./game-types"

const enemyTypes = ["Slime", "Goblin", "Skeleton", "Ghost", "Orc", "Troll", "Dragon", "Demon", "Elemental", "Golem"]

const elementColors: Record<ElementType, string> = {
  lightning: "#ffff00",
  fire: "#ff0000",
  ice: "#00ffff",
  water: "#0000ff",
  air: "#ffffff",
  lava: "#ff6600",
  rock: "#996633",
}

export function generateEnemy(level: number): Enemy {
  // Select enemy type based on level
  const typeIndex = Math.min(enemyTypes.length - 1, Math.floor(level / 2))
  const enemyType = enemyTypes[typeIndex]

  // Generate random elements
  const allElements: ElementType[] = ["lightning", "fire", "ice", "water", "air", "lava", "rock"]
  const shuffled = [...allElements].sort(() => 0.5 - Math.random())
  const enemyElements = shuffled.slice(0, Math.min(2, Math.ceil(level / 3))) as ElementType[]

  // Calculate health based on level
  const baseHealth = 50
  const healthPerLevel = 20
  const maxHealth = baseHealth + level * healthPerLevel

  return {
    name: `${enemyType} Lv.${level}`,
    type: enemyType.toLowerCase(),
    health: maxHealth,
    maxHealth,
    level,
    elements: enemyElements,
    position: { x: 600, y: 250 },
  }
}

export function calculateDamage(attackerLevel: number, attackType: string, defenderElements: ElementType[]): number {
  const baseDamage = 5 + attackerLevel * 2

  // Element effectiveness multipliers
  const effectiveness: Record<ElementType, ElementType[]> = {
    lightning: ["water", "air"],
    fire: ["ice", "rock"],
    ice: ["water", "fire"],
    water: ["fire", "lava"],
    air: ["rock", "lightning"],
    lava: ["ice", "water"],
    rock: ["lightning", "lava"],
  }

  // Check if attack is super effective
  let multiplier = 1.0
  if (attackType in effectiveness) {
    const attackElement = attackType as ElementType
    defenderElements.forEach((element) => {
      if (effectiveness[attackElement].includes(element)) {
        multiplier *= 1.5 // Super effective
      } else if (effectiveness[element].includes(attackElement)) {
        multiplier *= 0.5 // Not very effective
      }
    })
  }

  // Add randomness
  const randomFactor = 0.8 + Math.random() * 0.4 // 0.8 to 1.2

  return Math.floor(baseDamage * multiplier * randomFactor)
}

export function calculateXpToNextLevel(currentLevel: number): number {
  return currentLevel * 20
}
