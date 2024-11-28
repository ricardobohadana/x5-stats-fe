import { AverageStatistic } from "./average-statistic";

export interface AveragePlayerStatistic extends AverageStatistic {
  readonly playerId:           string;
}

export const isAveragePlayerStatistic = (data: unknown): data is AveragePlayerStatistic => {
  return isAveragePlayerStatistic(data) && typeof data.playerId === 'string'
}

export const isAverageStatistic = (data: unknown): data is AverageStatistic => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  const obj = data as { [key: string]: unknown };
  return (
    typeof obj.avgKda === "number" &&
    typeof obj.avgGoldPerMinute === "number" &&
    typeof obj.avgVisionScore === "number" &&
    typeof obj.avgDamagePerMinute === "number" &&
    typeof obj.avgCsPerMinute === "number" &&
    typeof obj.avgKills === "number" &&
    typeof obj.avgDeaths === "number" &&
    typeof obj.avgAssists === "number" &&
    typeof obj.avgDuration === "number" &&
    typeof obj.winRate === "number" &&
    typeof obj.blueWinRate === "number" &&
    typeof obj.redWinRate === "number"
  );
}