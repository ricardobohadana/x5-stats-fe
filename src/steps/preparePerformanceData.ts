import { useGlobalStore } from "../stores/store";
import { Lane } from "../types/lane";
import { Team } from "../types/team";

interface preparePerformanceDataInput {
  players: string[];
  championsIds: number[];
}

export const preparePerformanceData = (preparePerformanceDataInput: preparePerformanceDataInput) => {
  const { players, championsIds } = preparePerformanceDataInput;
  const performances = useGlobalStore.getState().performances;
  const lanes = Object.values(Lane);

  return players.map((player, index) => {
    return {
      ...performances[index],
      playerId: player,
      championId: championsIds[index],
      gameLane: lanes[index % 5],
      team: index < 5 ? Team.BLUE : Team.RED
    }
  })
}