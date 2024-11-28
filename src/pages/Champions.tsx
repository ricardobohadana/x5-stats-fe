import React, { useEffect } from "react"
import { useGlobalStore } from "../stores/store"
import { ChampionLeaderboard } from "../component/ChampionLeaderboard"
import {
  useChampionsStats,
  useChampionsLaneStats,
} from "../hooks/useChampionsStats"
import { useChampions } from "../api/cdn"
import { Champion } from "../types/champions"

export const Champions: React.FC = () => {
  const showLoading = useGlobalStore((state) => state.showLoading)
  const hideLoading = useGlobalStore((state) => state.hideLoading)
  const showError = useGlobalStore((state) => state.showError)
  const hideError = useGlobalStore((state) => state.hideError)
  const {
    data: allStats,
    isLoading: allStatsLoading,
    isError: error3,
  } = useChampionsStats()
  const {
    data: stats,
    isLoading: statsLoading,
    isError: error1,
  } = useChampionsLaneStats()
  const {
    data: champions,
    isLoading: championsLoading,
    isError: error2,
  } = useChampions()
  const isGlobalLoading = statsLoading || allStatsLoading || championsLoading
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

  const championsMap =
    champions?.reduce((acc, champion) => {
      acc[champion.id] = champion
      return acc
    }, {} as Record<number, Champion>) ?? ({} as Record<number, Champion>)

  return (
    <div className="grid grid-rows-6 grid-cols-1 gap-2">
      <ChampionLeaderboard
        championsMap={championsMap}
        stats={stats?.top ?? []}
        title={"Topo"}
      />
      <ChampionLeaderboard
        championsMap={championsMap}
        stats={stats?.jungle ?? []}
        title={"Selva"}
      />
      <ChampionLeaderboard
        championsMap={championsMap}
        stats={stats?.mid ?? []}
        title={"Meio"}
      />
      <ChampionLeaderboard
        championsMap={championsMap}
        stats={stats?.marksman ?? []}
        title={"Atirador"}
      />
      <ChampionLeaderboard
        championsMap={championsMap}
        stats={stats?.support ?? []}
        title={"Suporte"}
      />
      <ChampionLeaderboard
        championsMap={championsMap}
        stats={allStats ?? []}
        title={"Geral"}
      />
    </div>
  )
}
