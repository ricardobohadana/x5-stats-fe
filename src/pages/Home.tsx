import React, { useEffect } from "react"
import { useGlobalStore } from "../stores/store"
import { useStats } from "../hooks/useStats"
import { usePlayers } from "../hooks/usePlayers"
import { Player } from "../types/player"

export const Home: React.FC = () => {
  const showLoading = useGlobalStore((state) => state.showLoading)
  const hideLoading = useGlobalStore((state) => state.hideLoading)
  const {
    data: stats,
    isLoading: statsLoading,
    isError: error1,
    error,
  } = useStats()
  const {
    data: players,
    isLoading: playersLoading,
    isError: error2,
  } = usePlayers()
  const isGlobalLoading = statsLoading || playersLoading

  useEffect(() => {
    if (isGlobalLoading) {
      showLoading()
    } else {
      hideLoading()
    }
  }, [isGlobalLoading, showLoading, hideLoading])

  if (error1 || error2) {
    console.log(error)
    return <div>Erro ao carregar dados:</div>
  }

  const playersMap = players?.reduce((acc, player) => {
    acc[player.id] = player
    return acc
  }, {} as Record<string, Player>)

  return (
    <div>
      <pre>
        {stats?.map((stat, index) => (
          <pre key={index}>
            {JSON.stringify({ ...playersMap?.[stat.playerId], ...stat })}
          </pre>
        ))}
      </pre>
      <h1> Under development... :)</h1>
    </div>
  )
}
