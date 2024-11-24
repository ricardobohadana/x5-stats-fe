import { useEffect, useState } from "react"
import { getChampionIconUrl, useChampions } from "../api/cdn"
import { Player } from "../types/player"
import { PlayerTeamSelector } from "./PlayerTeamSelector"
import { Team } from "../types/team"
import { prepareGameData } from "../steps/prepareGameData"
import { preparePerformanceData } from "../steps/preparePerformanceData"
import { ThousandInput } from "./ThousandInput"
import { notify } from "../api/notify"
import { gameService } from "../api/games"
import { gamePerformanceService } from "../api/game-performance"
import { useGlobalStore } from "../stores/store"

export const ChampionSelector: React.FC = () => {
  const showLoading = useGlobalStore((state) => state.showLoading)
  const hideLoading = useGlobalStore((state) => state.hideLoading)

  const { data: champions } = useChampions()
  const [goldBlue, setGoldBlue] = useState<number>(0)
  const [goldRed, setGoldRed] = useState<number>(0)
  const [killsBlue, setKillsBlue] = useState<number>(0)
  const [killsRed, setKillsRed] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [winningTeam, setWinningTeam] = useState<Team>(Team.BLUE)
  const [filteredChampions, setFilteredChampions] = useState(champions)
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [selectedChampions, setSelectedChampions] = useState<(number | null)[]>(
    Array(10).fill(null)
  )
  useEffect(() => {
    if (champions) setFilteredChampions(champions.slice(1))
  }, [champions])

  const [date, setDate] = useState("")
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value)
  }

  const isSelected = (championId: number) =>
    selectedChampions.includes(championId)

  const handleSelectChampion = (id: number) => {
    setSelectedChampions((current) => {
      const newPlayers = [...current]
      newPlayers[selectedIndex] = id
      return newPlayers
    })
    clearChampionsSearch()
  }

  const handleUnselectChampion = (selectedIndex: number, index: number) => {
    if (selectedIndex !== index) return
    setSelectedChampions((current) => {
      const newChampions = [...current]
      newChampions[index] = null
      return newChampions
    })
  }

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    const [hours, minutes, seconds] = newValue.split(":")
    const totalSeconds =
      parseInt(hours) * 60 * 60 + parseInt(minutes) * 60 + parseInt(seconds)
    setDuration(totalSeconds)
  }

  const clearChampionsSearch = () => {
    setFilteredChampions(champions?.slice(1))
  }
  const handleChampionNameSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const search = event.target.value.toLowerCase()
    const filteredChampions = champions
      ?.slice(1)
      .filter((champion) => champion.name.toLowerCase().includes(search))
    setFilteredChampions(filteredChampions)
  }
  const selectPlayer = (player: Player, index: number) => {
    setSelectedPlayers((current) => {
      const newPlayers = [...current]
      newPlayers[index] = player.id
      return newPlayers
    })
  }

  const handleSubmitGame = async () => {
    try {
      showLoading()
      const game = prepareGameData({
        date,
        players: selectedPlayers,
        duration,
        winningTeam,
        goldBlue,
        goldRed,
        killsBlue,
        killsRed,
      })
      const response = await gameService.create(game)
      const gameId = response.id
      const performances = preparePerformanceData({
        gameId,
        players: selectedPlayers,
        championsIds: selectedChampions.map((id) => id ?? -1),
      })
      performances.forEach(async (performance) => {
        console.log(performance)
        await gamePerformanceService.create(performance)
      })
      notify("Partida salva com sucesso", "success")
    } catch {
      notify("Erro ao salvar a partida", "error")
    } finally {
      hideLoading()
    }
  }

  return (
    champions && (
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Dados da partida</h2>
        <div className="flex flex-row items-center space-x-2 w-full">
          <label htmlFor="date" className="text-sm font-medium text-gray-700">
            Data da partida:
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange}
            className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />

          <label
            htmlFor="duration"
            className="text-sm font-medium text-gray-700"
          >
            Duração:
          </label>
          <input
            type="time"
            id="duration"
            step="1"
            defaultValue={"00:00:00"}
            onChange={handleDurationChange}
            className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-32"
          />

          <label
            htmlFor="winningTeam"
            className="text-sm font-medium text-gray-700"
          >
            Time Vencedor:
          </label>
          <select
            id="winningTeam"
            value={winningTeam}
            onChange={(e) => setWinningTeam(e.target.value as Team)}
            className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-24"
          >
            <option value={Team.BLUE}>Azul</option>
            <option value={Team.RED}>Vermelho</option>
          </select>
          <div className="grid grid-cols-3 gap-4 items-center">
            <div></div>
            <div className="text-sm font-medium text-gray-700">Ouro</div>
            <div className="text-sm font-medium text-gray-700">Kills</div>

            <div className="text-sm font-medium text-gray-700">Time Azul</div>
            <ThousandInput
              value={goldBlue}
              onChange={setGoldBlue}
              className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-24"
            />
            <ThousandInput
              value={killsBlue}
              onChange={setKillsBlue}
              className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-24"
            />

            <div className="text-sm font-medium text-gray-700">
              Time Vermelho
            </div>
            <ThousandInput
              value={goldRed}
              onChange={setGoldRed}
              className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-24"
            />
            <ThousandInput
              value={killsRed}
              onChange={setKillsRed}
              className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-24"
            />
          </div>
          <div className="flex-grow"></div>
          <button
            onClick={handleSubmitGame}
            className="py-2 px-4 border border-transparent text-sm font-medium rounded-md w-[200px] text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Salvar
          </button>
        </div>
        <div>
          <h2 className="text-xl font-semibold mt-4">Dados dos jogadores</h2>
        </div>
        <div
          className="mt-4 grid grid-cols-[auto,1fr,auto] gap-4 items-start"
          style={{ minHeight: "350px" }}
        >
          {/* First Column */}
          <PlayerTeamSelector
            selectedChampions={selectedChampions}
            selectedPlayers={selectedPlayers}
            selectPlayer={selectPlayer}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            blue={true}
            unselectChampion={handleUnselectChampion}
          />

          {/* Middle Column */}
          <div>
            <div>
              <input
                id="champion"
                name="champion"
                type="text"
                required
                placeholder="nome do campeão"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-4"
                onChange={handleChampionNameSearch}
              />
            </div>
            <div className="grid grid-cols-10 gap-2 overflow-auto max-h-[700px] grow min-w-[350px]">
              {filteredChampions?.map((champion, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center"
                  onClick={() => handleSelectChampion(champion.id)}
                >
                  <img
                    src={getChampionIconUrl(champion.id)}
                    className={`w-20   ${
                      isSelected(champion.id)
                        ? "grayscale"
                        : "cursor-pointer transform transition duration-300 hover:scale-110"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Last Column */}
          <PlayerTeamSelector
            selectedChampions={selectedChampions}
            selectedPlayers={selectedPlayers}
            selectPlayer={selectPlayer}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            blue={false}
            unselectChampion={handleUnselectChampion}
          />
        </div>
      </div>
    )
  )
}
