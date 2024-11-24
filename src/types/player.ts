import { Base } from "./base";
import { Lane } from "./lane";

export interface Player extends Base {
  nickname: string; 
  gamerTag: string;
  lane: Lane;
}

export const isPlayer = (obj: unknown): obj is Player => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  const player = obj as Player;
  return (
    player.id !== undefined &&
    typeof player.id === 'string' &&
    player.nickname !== undefined &&
    typeof player.nickname === 'string' &&
    player.gamerTag !== undefined &&
    typeof player.gamerTag === 'string' &&
    player.lane !== undefined
  );
};