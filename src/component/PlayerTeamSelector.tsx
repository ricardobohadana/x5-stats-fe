import { getChampionIconUrl } from "../api/cdn"
import { Player } from "../types/player"
import { PlayerSelect } from "./PlayerSelect"

const prefix =
  "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-"
const suffix = ".png"
const positions = ["top", "jungle", "middle", "bottom", "utility"]
const positionUrlBuilder = (index: number) =>
  index < 5
    ? `${prefix}${positions[index]}${suffix}`
    : `${prefix}${positions[index - 5]}${suffix}`

interface PlayerTeamSelectorProps {
  selectedChampions: (number | null)[]
  selectedPlayers: string[]
  selectPlayer: (players: Player, index: number) => void
  selectedIndex: number
  setSelectedIndex: (index: number) => void
  blue: boolean
  unselectChampion: (selectedIndex: number, index: number) => void
}

export const PlayerTeamSelector: React.FC<PlayerTeamSelectorProps> = ({
  selectedChampions,
  selectedIndex,
  selectedPlayers,
  blue,
  setSelectedIndex,
  selectPlayer,
  unselectChampion,
}) => {
  const condition = (index: number) => (blue ? index < 5 : index >= 5)
  return (
    <div className="grid grid-cols-1 gap-4">
      {selectedChampions.map(
        (championId, index) =>
          condition(index) && (
            <div
              key={index}
              className={`cursor-pointer flex flex-row justify-around p-2 items-center gap-2 ${
                selectedIndex === index && "bg-slate-300"
              }`}
              onClick={() => setSelectedIndex(index)}
            >
              <PlayerSelect
                key={index}
                unavailableOptionsIds={selectedPlayers}
                selectPlayer={selectPlayer}
                index={index}
              />
              <img src={positionUrlBuilder(index)} className="w-16 h-16" />
              <img
                src={getChampionIconUrl(championId)}
                className="w-16 h-16"
                onClick={() => unselectChampion(selectedIndex, index)}
              />
            </div>
          )
      )}
    </div>
  )
}
