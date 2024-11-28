import { isAverageStatistic } from "./average-player-statistic";
import { AverageStatistic } from "./average-statistic";

export interface AverageChampionStatistic extends AverageStatistic {
  readonly championId:           number;
}

export const isAverageChampionStatistic = (data: unknown): data is AverageChampionStatistic => {
  return isAverageStatistic(data) && typeof data.championId === 'number'
}