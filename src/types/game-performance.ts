import { Base } from "./base";
import { Lane } from "./lane";
import { Team } from "./team";

export interface GamePerformance extends Base {
  gameId: string; // uuid
  playerId: string; // uuid
  championId: number;
  gameLane: Lane;
  team: Team;
  kills: number;
  deaths: number;
  assists: number;
  damageDealt?: number;
  gold?: number;
  cs?: number;
  visionScore?: number;
}

export type NewGamePerformance = Omit<GamePerformance, 'id' | 'gameId' | 'playerId' | 'championId' | 'gameLane' | 'team'>;

export const isGamePerformance = (obj: unknown): obj is GamePerformance => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  const gamePerformance = obj as GamePerformance;
  return (
    gamePerformance.id !== undefined &&
    typeof gamePerformance.id === 'string' &&
    gamePerformance.gameId !== undefined &&
    typeof gamePerformance.gameId === 'string' &&
    gamePerformance.playerId !== undefined &&
    typeof gamePerformance.playerId === 'string' &&
    gamePerformance.championId !== undefined &&
    typeof gamePerformance.championId === 'number' &&
    gamePerformance.gameLane !== undefined &&
    gamePerformance.team !== undefined &&
    gamePerformance.kills !== undefined &&
    gamePerformance.deaths !== undefined &&
    gamePerformance.assists !== undefined
  );
};