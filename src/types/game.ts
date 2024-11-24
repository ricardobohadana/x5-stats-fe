import { Base } from "./base";
import { Team } from "./team";



export interface Game extends Base {
  date: string; // without time
  winningTeam: Team;
  duration: number; // in seconds
  goldBlue?: number;
  goldRed?: number;
  players?: string[]; // 10 players
}

export const isGame = (obj: unknown): obj is Game => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  const game = obj as Game;
  return (
    game.id !== undefined &&
    typeof game.id === 'string' &&
    game.date !== undefined &&
    game.winningTeam !== undefined &&
    game.duration !== undefined
  );
}