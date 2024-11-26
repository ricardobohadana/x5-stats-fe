import { useQuery } from "@tanstack/react-query"
import { playerService } from "../api/players"

export const useLaneStats = () => {
  return useQuery({
    queryKey: ['lane-stats'],
    queryFn: playerService.getAllLaneStats,
  })
}