import React, { useEffect } from "react"
import { usePlayers } from "../hooks/usePlayers"
import { useGlobalStore } from "../stores/store"
import { Player } from "../types/player"
import { useLaneStats } from "../hooks/useLaneStats"
import { LaneLeaderboard } from "../component/LaneLeaderboard"
import { useStats } from "../hooks/useStats"

export const Home: React.FC = () => {
  const showLoading = useGlobalStore((state) => state.showLoading)
  const hideLoading = useGlobalStore((state) => state.hideLoading)
  const showError = useGlobalStore((state) => state.showError)
  const hideError = useGlobalStore((state) => state.hideError)
  const {
    data: allStats,
    isLoading: allStatsLoading,
    isError: error3,
  } = useStats()
  const {
    data: stats,
    isLoading: statsLoading,
    isError: error1,
  } = useLaneStats()
  const {
    data: players,
    isLoading: playersLoading,
    isError: error2,
  } = usePlayers()
  const isGlobalLoading = statsLoading || playersLoading || allStatsLoading
  const isError = error1 || error2 || error3

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

  const playersMap =
    players?.reduce((acc, player) => {
      acc[player.id] = player
      return acc
    }, {} as Record<string, Player>) ?? {}

  return (
    <div className="grid grid-rows-6 grid-cols-1 gap-2">
      <LaneLeaderboard
        playersMap={playersMap}
        stats={stats?.top ?? []}
        title={"Topo"}
      />
      <LaneLeaderboard
        playersMap={playersMap}
        stats={stats?.jungle ?? []}
        title={"Selva"}
      />
      <LaneLeaderboard
        playersMap={playersMap}
        stats={stats?.mid ?? []}
        title={"Meio"}
      />
      <LaneLeaderboard
        playersMap={playersMap}
        stats={stats?.marksman ?? []}
        title={"Atirador"}
      />
      <LaneLeaderboard
        playersMap={playersMap}
        stats={stats?.support ?? []}
        title={"Suporte"}
      />
      <LaneLeaderboard
        playersMap={playersMap}
        stats={allStats ?? []}
        title={"Geral"}
      />
    </div>
  )
}
