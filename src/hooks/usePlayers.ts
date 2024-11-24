import { useQuery } from "@tanstack/react-query"
import { playerService } from "../api/players"

export const usePlayers = () => {
  return useQuery({
    queryKey: ['players'],
    queryFn: () => playerService.getAll(),
  })
}