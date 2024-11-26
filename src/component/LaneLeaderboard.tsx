import { useEffect, useState } from "react"
import { AveragePlayerStatistic } from "../types/average-player-statistic"
import { Player } from "../types/player"

interface LaneLeaderboardProps {
  playersMap: Record<string, Player>
  stats: AveragePlayerStatistic[]
  title: string
}

export const LaneLeaderboard: React.FC<LaneLeaderboardProps> = ({
  playersMap,
  stats,
  title,
}) => {
  const [sortedStats, setSortedStats] = useState<AveragePlayerStatistic[]>([])
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Omit<AveragePlayerStatistic, "gameLane" | "playerId">
    direction: "asc" | "desc"
  } | null>(null)

  useEffect(() => {
    setSortedStats(stats)
  }, [stats])

  const sortData = (
    key: keyof Omit<AveragePlayerStatistic, "gameLane" | "playerId">
  ) => {
    let direction: "asc" | "desc" = "desc"
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "desc"
    ) {
      direction = "asc"
    }

    const sortedArray = [...sortedStats].sort((a, b) => {
      if (typeof a[key] !== "number" || typeof b[key] !== "number")
        throw new Error("Invalid key")

      return direction === "asc" ? a[key] - b[key] : b[key] - a[key]
    })

    setSortedStats(sortedArray)
    setSortConfig({ key, direction })
  }

  const getKdaClass = (kda: number) => {
    if (kda < 3) return ""
    if (kda < 4) return "text-green-500"
    return "text-blue-500"
  }

  const renderSortArrow = (
    key: keyof Omit<AveragePlayerStatistic, "gameLane" | "playerId">
  ) => {
    if (!sortConfig || sortConfig.key !== key) return null
    return sortConfig.direction === "asc" ? "↑" : "↓"
  }

  return (
    <div className="p-2">
      <h3 className="text-xl font-semibold mt-2 p-2">{title}</h3>
      <table className="min-w-full divide-y divide-gray-200 p-2">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Jogador
            </th>
            {[
              { key: "avgKills", label: "Abates/jogo" },
              { key: "avgDeaths", label: "Mortes/jogo" },
              { key: "avgAssists", label: "Assistências/jogo" },
              { key: "avgKda", label: "K D A" },
              { key: "avgDamageShare", label: "% Dano time" },
              { key: "avgKillParticipation", label: "% Abates time/jogo" },
              { key: "avgGoldShare", label: "% Ouro do time/jogo" },
              { key: "avgCsPerMinute", label: "CS/min" },
              { key: "avgGoldPerMinute", label: "Ouro/min" },
              { key: "avgDamagePerMinute", label: "Dano/min" },
              { key: "winRate", label: "% Vitória" },
              { key: "blueWinRate", label: "% Vit. - Azul" },
              { key: "redWinRate", label: "% Vit. - Verm." },
            ].map(({ key, label }) => (
              <th
                key={key}
                scope="col"
                className={`text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer ${
                  sortConfig?.key === key ? "font-bold" : ""
                }`}
                onClick={() =>
                  sortData(
                    key as keyof Omit<
                      AveragePlayerStatistic,
                      "gameLane" | "playerId"
                    >
                  )
                }
              >
                {label}{" "}
                {renderSortArrow(
                  key as keyof Omit<
                    AveragePlayerStatistic,
                    "gameLane" | "playerId"
                  >
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedStats?.slice(0, 5).map((stat) => (
            <tr key={stat.playerId}>
              <td className="whitespace-nowrap">
                {playersMap?.[stat.playerId]?.gamerTag}
              </td>
              <td className="whitespace-nowrap text-right">
                {stat.avgKills.toFixed(2)}
              </td>
              <td className="whitespace-nowrap text-right">
                {stat.avgDeaths.toFixed(2)}
              </td>
              <td className="whitespace-nowrap text-right">
                {stat.avgAssists.toFixed(2)}
              </td>
              <td
                className={`whitespace-nowrap text-right ${getKdaClass(
                  stat.avgKda
                )}`}
              >
                {stat.avgKda.toFixed(2)}
              </td>
              <td className="whitespace-nowrap text-right">
                {((stat.avgDamageShare ?? 0) * 100).toFixed(0)} %
              </td>
              <td className="whitespace-nowrap text-right">
                {((stat.avgKillParticipation ?? 0) * 100).toFixed(0)} %
              </td>
              <td className="whitespace-nowrap text-right">
                {((stat.avgGoldShare ?? 0) * 100).toFixed(0)} %
              </td>
              <td className="whitespace-nowrap text-right">
                {stat.avgCsPerMinute.toFixed(2)}/min
              </td>
              <td className="whitespace-nowrap text-right">
                {stat.avgGoldPerMinute.toFixed(0)}/min
              </td>
              <td className="whitespace-nowrap text-right">
                {stat.avgDamagePerMinute.toFixed(0)}/min
              </td>
              <td className="whitespace-nowrap text-right">
                {(stat.winRate * 100).toFixed(0)}%
              </td>
              <td className="whitespace-nowrap text-right">
                {(stat.blueWinRate * 100).toFixed(0)}%
              </td>
              <td className="whitespace-nowrap text-right">
                {(stat.redWinRate * 100).toFixed(0)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
