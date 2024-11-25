import React, { useState } from "react"
import { usePlayers } from "../hooks/usePlayers"
import { Player } from "../types/player"
import { NewGamePerformance } from "../types/game-performance"
import { useGlobalStore } from "../stores/store"
import { ThousandInput } from "./ThousandInput"

interface PlayerSelectProps {
  index: number
  unavailableOptionsIds: string[]
  selectPlayer: (player: Player, index: number) => void
}

export const PlayerSelect: React.FC<PlayerSelectProps> = ({
  unavailableOptionsIds,
  selectPlayer,
  index,
}) => {
  const { data: players } = usePlayers()
  const [searchText, setSearchText] = useState("")
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const performance = useGlobalStore((state) => state.performances[index])
  const setPerformance = useGlobalStore((state) => state.setPerformances)

  // Filter options based on search text
  const availableOptions = players?.filter(
    (player) =>
      !unavailableOptionsIds.includes(player.id) ||
      selectedOption === player.gamerTag
  )
  const filteredOptions = availableOptions?.filter((player) =>
    player.gamerTag.toLowerCase().includes(searchText?.toLowerCase())
  )

  const handleSelect = (player: Player) => {
    const option = player.gamerTag
    setSelectedOption(option)
    setSearchText(option) // Set the selected option as the input value
    setIsOpen(false) // Close the dropdown
    selectPlayer(player, index)
  }

  return (
    <div className="relative w-64">
      {/* Input Field */}
      <input
        type="text"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value)
          setIsOpen(true) // Open dropdown when user starts typing
        }}
        placeholder="Nome do jogador"
        onFocus={() => setIsOpen(true)} // Open dropdown on input focus
        onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Close dropdown on input blur
        className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white shadow-lg border border-gray-300 rounded-md max-h-40 overflow-y-auto">
          {filteredOptions && filteredOptions.length > 0 ? (
            filteredOptions.map((player) => (
              <li
                key={player.id}
                className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
                onClick={() => handleSelect(player)}
              >
                {player.gamerTag}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No options found</li>
          )}
        </ul>
      )}
      {selectedOption && (
        <div className="grid grid-cols-4 grid-rows-2 gap-1  ">
          {playerPerformanceProperties.map((property) => (
            <div className={property.colSpan > 1 ? "col-span-2" : ""}>
              <label className="text-xs font-light">{property.label}</label>
              <ThousandInput
                key={property.key}
                placeholder={property.label}
                className="w-full py-1 px-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                value={performance[property.key]}
                onChange={(val) =>
                  setPerformance({ ...performance, [property.key]: val }, index)
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const playerPerformanceProperties: Array<{
  key: keyof NewGamePerformance
  label: string
  colSpan: number
}> = [
  {
    key: "kills",
    label: "Abates",
    colSpan: 1,
  },
  {
    key: "deaths",
    label: "Mortes",
    colSpan: 1,
  },
  {
    key: "assists",
    label: "Assist.",
    colSpan: 1,
  },
  {
    key: "cs",
    label: "Farm",
    colSpan: 1,
  },
  {
    key: "gold",
    label: "Ouro",
    colSpan: 1,
  },
  {
    key: "damageDealt",
    label: "Dano",
    colSpan: 1,
  },
  {
    key: "visionScore",
    label: "Placar de visão",
    colSpan: 2,
  },
]
