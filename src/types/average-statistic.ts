
export interface AverageStatistic extends Record<string, unknown> {
  readonly gameLane: string;
  readonly avgKda: number;
  readonly avgGoldPerMinute: number;
  readonly avgVisionScore: number;
  readonly avgVisionScorePerMinute: number;
  readonly avgDamagePerMinute: number;
  readonly avgCsPerMinute: number;
  readonly avgKills: number;
  readonly avgDeaths: number;
  readonly avgAssists: number;
  readonly avgDuration: number;
  readonly winRate: number;
  readonly blueWinRate: number;
  readonly redWinRate: number;
  readonly avgKillParticipation: number | null;
  readonly avgGoldShare: number | null;
  readonly avgDamageShare?: number;
  readonly appearances: number;
}
