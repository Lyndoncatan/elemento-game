import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Zap, Flame, Snowflake, Droplet, Wind, Mountain, Waves } from "lucide-react"

export default function HowToPlayPage() {
  const elements = [
    {
      type: "lightning",
      icon: <Zap className="h-8 w-8" />,
      name: "Lightning",
      description: "Fast attacks, medium damage",
      color: "#ffff00",
    },
    {
      type: "fire",
      icon: <Flame className="h-8 w-8" />,
      name: "Fire",
      description: "High damage, slow cooldown",
      color: "#ff0000",
    },
    {
      type: "ice",
      icon: <Snowflake className="h-8 w-8" />,
      name: "Ice",
      description: "Freezes enemies, medium damage",
      color: "#00ffff",
    },
    {
      type: "water",
      icon: <Droplet className="h-8 w-8" />,
      name: "Water",
      description: "Healing abilities, low damage",
      color: "#0000ff",
    },
    {
      type: "air",
      icon: <Wind className="h-8 w-8" />,
      name: "Air",
      description: "Dodge attacks, medium damage",
      color: "#ffffff",
    },
    {
      type: "lava",
      icon: <Waves className="h-8 w-8" />,
      name: "Lava",
      description: "Area damage, high cooldown",
      color: "#ff6600",
    },
    {
      type: "rock",
      icon: <Mountain className="h-8 w-8" />,
      name: "Rock",
      description: "High defense, low damage",
      color: "#996633",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-green-500 flex flex-col items-center justify-center p-4 pixel-font">
      <div className="pixel-container p-6 border-4 border-green-500 bg-black max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6 pixel-title">HOW TO PLAY</h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-bold mb-2 pixel-subtitle">CHARACTER CREATION</h2>
            <p>Customize your character's appearance and select 2 elemental powers:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {elements.map((element) => (
                <div
                  key={element.type}
                  className="border-2 border-green-500 p-3 rounded-lg flex items-center space-x-3"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                  <div
                    className="p-2 rounded-full"
                    style={{
                      backgroundColor: element.color,
                      color: element.color === "#ffffff" ? "#000000" : "#ffffff",
                    }}
                  >
                    {element.icon}
                  </div>
                  <div>
                    <h3 className="font-bold">{element.name}</h3>
                    <p className="text-xs">{element.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2 pixel-subtitle">COMBAT</h2>
            <p>Use your elemental powers to defeat enemies. Each level increases difficulty.</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li className="pixel-list-item">Gain XP by defeating enemies</li>
              <li className="pixel-list-item">Level up to unlock new weapons</li>
              <li className="pixel-list-item">Monitor your health during battle</li>
              <li className="pixel-list-item">Use elemental combinations for special attacks</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2 pixel-subtitle">CONTROLS</h2>
            <div className="border-2 border-green-500 p-4 rounded-lg">
              <p className="mb-2">Use the attack buttons to unleash your elemental powers.</p>
              <div className="flex justify-center mt-4">
                <div className="inline-block border-2 border-green-500 px-4 py-2 text-center">
                  <span className="block text-xs mb-1">Example:</span>
                  <span className="block font-bold">FIRE ATTACK</span>
                </div>
              </div>
              <p className="mt-4">Combine elements for special attacks.</p>
            </div>
          </section>
        </div>

        <div className="mt-8">
          <Link href="/">
            <Button className="w-full bg-green-700 hover:bg-green-600 text-black border-2 border-green-500 pixel-button">
              BACK TO MENU
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
