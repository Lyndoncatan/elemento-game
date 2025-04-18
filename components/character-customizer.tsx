"use client"

import { useState } from "react"
import type { Character } from "@/lib/game-types"
import { HexColorPicker } from "react-colorful"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CharacterCustomizerProps {
  character: Character
  onChange: (character: Character) => void
}

export default function CharacterCustomizer({ character, onChange }: CharacterCustomizerProps) {
  const [activeTab, setActiveTab] = useState("hair")

  const handleColorChange = (color: string, type: "hairColor" | "skinColor" | "outfitColor") => {
    onChange({
      ...character,
      [type]: color,
    })
  }

  const hairColors = ["#00ff00", "#ff0000", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ffffff"]
  const skinColors = ["#ffd29b", "#f5c181", "#d3a56a", "#a67c52", "#7c5c3c", "#5c4033", "#3c2a21"]
  const outfitColors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ffffff"]

  return (
    <div className="w-full">
      <div className="character-preview mb-4 flex justify-center">
        <div className="pixel-character w-32 h-32 relative">
          {/* Character preview - simplified for this example */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Hair */}
            <div className="w-16 h-8 rounded-t-lg" style={{ backgroundColor: character.hairColor }}></div>
            {/* Face */}
            <div
              className="w-16 h-16 flex items-center justify-center"
              style={{ backgroundColor: character.skinColor }}
            >
              <div className="w-8 h-2 bg-black"></div>
            </div>
            {/* Body */}
            <div className="w-12 h-8" style={{ backgroundColor: character.outfitColor }}></div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="hair" className="pixel-tab">
            Hair
          </TabsTrigger>
          <TabsTrigger value="skin" className="pixel-tab">
            Skin
          </TabsTrigger>
          <TabsTrigger value="outfit" className="pixel-tab">
            Outfit
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hair" className="space-y-4">
          <div className="color-picker-container">
            <HexColorPicker color={character.hairColor} onChange={(color) => handleColorChange(color, "hairColor")} />
          </div>
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {hairColors.map((color) => (
              <button
                key={color}
                className="w-8 h-8 border-2 border-green-500"
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color, "hairColor")}
                aria-label={`Select ${color} hair color`}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="skin" className="space-y-4">
          <div className="color-picker-container">
            <HexColorPicker color={character.skinColor} onChange={(color) => handleColorChange(color, "skinColor")} />
          </div>
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {skinColors.map((color) => (
              <button
                key={color}
                className="w-8 h-8 border-2 border-green-500"
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color, "skinColor")}
                aria-label={`Select ${color} skin color`}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="outfit" className="space-y-4">
          <div className="color-picker-container">
            <HexColorPicker
              color={character.outfitColor}
              onChange={(color) => handleColorChange(color, "outfitColor")}
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {outfitColors.map((color) => (
              <button
                key={color}
                className="w-8 h-8 border-2 border-green-500"
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color, "outfitColor")}
                aria-label={`Select ${color} outfit color`}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
