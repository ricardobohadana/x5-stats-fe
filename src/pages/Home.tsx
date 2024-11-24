import React from "react"

import { KdaLeaderboard } from "../component/KdaLeaderboard"

export const Home: React.FC = () => {
  return (
    <div className="grid grid-rows-2 grid-cols-1 gap-2">
      <KdaLeaderboard />
      <KdaLeaderboard />
    </div>
  )
}
