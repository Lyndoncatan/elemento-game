"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import CharacterCustomizer from "@/components/character-customizer"
import ElementSelector from "@/components/element-selector"
import BackgroundSelector from "@/components/background-selector"
import type { Character, ElementType, Background } from "@/lib/game-types"

export default function CharacterSelectPage() {
  const router = useRouter()
  const [character, setCharacter] = useState<Character>({
    hairColor: "#00ff00",
    skinColor: "#ffd29b",
    outfitColor: "#ff0000",
    name: "Player",
    elements: [],
  })

  const [selectedElements, setSelectedElements] = useState<ElementType[]>([])
  const [selectedBackground, setSelectedBackground] = useState<Background>("temple")

  const handleElementSelect = (element: ElementType) => {
    if (selectedElements.includes(element)) {
      setSelectedElements(selectedElements.filter((e) => e !== element))
    } else if (selectedElements.length < 2) {
      setSelectedElements([...selectedElements, element])
    }
  }

  const handleBackgroundSelect = (background: Background) => {
    setSelectedBackground(background)
  }

  const handleStartGame = () => {
    if (selectedElements.length === 2) {
      const finalCharacter = {
        ...character,
        elements: selectedElements,
      }
      // In a real app, we'd use context or localStorage to persist this
      localStorage.setItem("playerCharacter", JSON.stringify(finalCharacter))
      localStorage.setItem("gameBackground", selectedBackground)
      router.push("/game")
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-500 flex flex-col items-center justify-center p-4 pixel-font">
      <div className="pixel-container p-6 border-4 border-green-500 bg-black max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6">CHARACTER CUSTOMIZATION</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <CharacterCustomizer character={character} onChange={setCharacter} />

            <div className="mt-4 w-full">
              <label className="block mb-2">Character Name:</label>
              <input
                type="text"
                value={character.name}
                onChange={(e) => setCharacter({ ...character, name: e.target.value })}
                className="w-full p-2 bg-black border-2 border-green-500 text-green-500 pixel-input"
                maxLength={12}
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">SELECT 2 ELEMENTS</h2>
            <ElementSelector selectedElements={selectedElements} onElementSelect={handleElementSelect} />

            <h2 className="text-xl font-bold mb-4 mt-6">SELECT BATTLE LOCATION</h2>
            <BackgroundSelector selectedBackground={selectedBackground} onBackgroundSelect={handleBackgroundSelect} />

            <div className="mt-8 space-y-4">
              <Button
                onClick={handleStartGame}
                disabled={selectedElements.length !== 2}
                className={`w-full bg-green-700 hover:bg-green-600 text-black border-2 border-green-500 pixel-button ${
                  selectedElements.length !== 2 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                START ADVENTURE
              </Button>

              <Link href="/" className="block">
                <Button className="w-full bg-black hover:bg-green-900 text-green-500 border-2 border-green-500 pixel-button">
                  BACK
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
