import { useEffect } from "react"
import { usePlayers } from "../hooks/usePlayers"
import { useStats } from "../hooks/useStats"
import { useGlobalStore } from "../stores/store"
import { Player } from "../types/player"

export const Leaderboard: React.FC = () => {
  const showLoading = useGlobalStore((state) => state.showLoading)
  const hideLoading = useGlobalStore((state) => state.hideLoading)
  const showError = useGlobalStore((state) => state.showError)
  const hideError = useGlobalStore((state) => state.hideError)
  const { data: stats, isLoading: statsLoading, isError: error1 } = useStats()
  const {
    data: players,
    isLoading: playersLoading,
    isError: error2,
  } = usePlayers()
  const isGlobalLoading = statsLoading || playersLoading
  const isError = error1 || error2

  useEffect(() => {
    if (isError) {
      showError()
    } else {
      hideError()
    }
  }, [isError, showError, hideError])

  useEffect(() => {
    if (isGlobalLoading) {
      showLoading()
    } else {
      hideLoading()
    }
  }, [isGlobalLoading, showLoading, hideLoading])

  if (error1 || error2) {
    return <div>Erro ao carregar dados:</div>
  }

  const playersMap = players?.reduce((acc, player) => {
    acc[player.id] = player
    return acc
  }, {} as Record<string, Player>)

  const getKdaClass = (kda: number) => {
    if (kda < 3) return ""
    if (kda < 4) return "text-green-500"
    return "text-blue-500"
  }

  return (
    <div className="p-2">
      <h3 className="text-xl font-semibold mt-2 p-2">Estatísticas gerais:</h3>
      <table className="min-w-full divide-y divide-gray-200 p-2">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Jogador
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Abates/jogo
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Mortes/jogo
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Assistências/jogo
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              KDA
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Participação em abates/jogo
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Participação em ouro/jogo
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              CS/min
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Gold/min
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Dano/min
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Taxa de vitória
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Taxa de vitória (lado azul)
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Taxa de vitória (lado vermelho)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stats?.map((stat) => (
            <tr key={stat.playerId}>
              <td className="px-2 py-1 whitespace-nowrap">
                {playersMap?.[stat.playerId]?.gamerTag}
              </td>
              <td className="px-2 py-1 whitespace-nowrap text-right">
                {stat.avgKills.toFixed(2)}
              </td>
              <td className="px-2 py-1 whitespace-nowrap text-right">
                {stat.avgDeaths.toFixed(2)}
              </td>
              <td className="px-2 py-1 whitespace-nowrap text-right">
                {stat.avgAssists.toFixed(2)}
              </td>
              <td
                className={`px-2 py-1 whitespace-nowrap text-right ${getKdaClass(
                  stat.avgKda
                )}`}
              >
                {stat.avgKda.toFixed(2)}
              </td>
              <td className="px-2 py-1 whitespace-nowrap text-right">
                {((stat.avgKillParticipation ?? 0) * 100).toFixed(0)} %
              </td>
              <td className="px-2 py-1 whitespace-nowrap text-right">
                {((stat.avgGoldShare ?? 0) * 100).toFixed(0)} %
              </td>
              <td className="px-2 py-1 whitespace-nowrap text-right">
                {stat.avgCsPerMinute.toFixed(0)}/min
              </td>
              <td className="px-2 py-1 whitespace-nowrap text-right">
                {stat.avgGoldPerMinute.toFixed(0)}/min
              </td>
              <td className="px-2 py-1 whitespace-nowrap text-right">
                {stat.avgDamagePerMinute.toFixed(0)}/min
              </td>
              <td className="px-2 py-1 whitespace-nowrap text-right">
                {(stat.winRate * 100).toFixed(0)}%
              </td>
              <td className="px-2 py-1 whitespace-nowrap text-right">
                {(stat.blueWinRate * 100).toFixed(0)}%
              </td>
              <td className="px-2 py-1 whitespace-nowrap text-right">
                {(stat.redWinRate * 100).toFixed(0)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
