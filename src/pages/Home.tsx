import React from "react"

import { Leaderboard } from "../component/Leaderboard"

export const Home: React.FC = () => {
  return (
    <div className="grid grid-rows-2 grid-cols-1 gap-2">
      <Leaderboard />
    </div>
  )
}
