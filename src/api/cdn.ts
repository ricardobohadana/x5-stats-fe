import { useQuery } from "@tanstack/react-query"
import { assertIsChampionArray } from "../types/champions"

const CDN_URL = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/'
const CHAMPIONS_DATA_URL = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json'

export const getChampionIconUrl = (championId: number | null) => championId ? `${CDN_URL}${championId}.png` : `${CDN_URL}-1.png`

export const getAllChampionsData = async () => {
  const response = await fetch(CHAMPIONS_DATA_URL)
  const data = await response.json()
  if (!assertIsChampionArray(data)){
    throw new Error('Invalid data')
  }
  return data
}

export const useChampions = () => {
  return useQuery({ queryKey: ['champions'], queryFn: getAllChampionsData});
};
