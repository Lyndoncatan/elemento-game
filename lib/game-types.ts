export type ElementType = "lightning" | "fire" | "ice" | "water" | "air" | "lava" | "rock"
export type Background = "cave" | "desert" | "snow" | "temple"

export interface Character {
  hairColor: string
  skinColor: string
  outfitColor: string
  name: string
  elements: ElementType[]
  health?: number
  maxHealth?: number
  xp?: number
  level?: number
  weapons?: string[]
  position?: { x: number; y: number }
}

export interface Enemy {
  name: string
  type: string
  health: number
  maxHealth: number
  level: number
  elements: ElementType[]
  position?: { x: number; y: number }
}

export interface GameState {
  player: Character & {
    health: number
    maxHealth: number
    xp: number
    level: number
    weapons: string[]
    position: { x: number; y: number }
  }
  enemy: Enemy | null
  currentLevel: number
  gameStatus: "starting" | "playing" | "paused" | "gameover"
  message: string
  turn?: "player" | "enemy"
  background?: Background
}
