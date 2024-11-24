import { useQuery } from "@tanstack/react-query"
import { playerService } from "../api/players"

export const useStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: playerService.getAllStats,
  })
}