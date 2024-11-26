export interface AveragePlayerStatistic extends Record<string, unknown> {
  readonly playerId:           string;
  readonly gameLane:           string;
  readonly avgKda:             number;
  readonly avgGoldPerMinute:   number;
  readonly avgVisionScore:     number;
  readonly avgVisionScorePerMinute: number;
  readonly avgDamagePerMinute: number;
  readonly avgCsPerMinute:     number;
  readonly avgKills:           number;
  readonly avgDeaths:          number;
  readonly avgAssists:         number;
  readonly avgDuration:        number;
  readonly winRate:            number;
  readonly blueWinRate:        number;
  readonly redWinRate:         number;
  readonly avgKillParticipation: number | null;
  readonly avgGoldShare: number | null;
  readonly avgDamageShare?: number

}


export const isAveragePlayerStatistic = (data: unknown): data is AveragePlayerStatistic => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  const obj = data as { [key: string]: unknown };
  return (
    typeof obj.playerId === "string" &&
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