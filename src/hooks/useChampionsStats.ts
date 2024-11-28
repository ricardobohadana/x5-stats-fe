import { useQuery } from "@tanstack/react-query"
import { gamePerformanceService } from "../api/game-performance"

export const useChampionsStats = () => {
  return useQuery({
    queryKey: ['champions-stats'],
    queryFn: () => gamePerformanceService.getAllChampionsStats(),
  })
}
export const useChampionsLaneStats = () => {
  return useQuery({
    queryKey: ['champions-lane-stats'],
    queryFn: () => gamePerformanceService.getAllChampionsLaneStats(),
  })
}