import { useQuery } from "@tanstack/react-query"
import { gameService } from "../api/games"

export const useGames = () => {
  return useQuery({
    queryKey: ['games'],
    queryFn: () => gameService.getAll(),
  })
}