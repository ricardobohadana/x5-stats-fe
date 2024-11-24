import { notify } from "../api/notify";
import { Game } from "../types/game";
import { InputData } from "../types/input-data";
import { Team } from "../types/team";

interface PrepareGameDataInput {
  players: string[];
  date: string;
  duration: number;
  winningTeam: string;
  goldBlue?: number;
  goldRed?: number;
  killsBlue?: number;
  killsRed?: number;
}
export const prepareGameData = ({date, players, duration, winningTeam, goldBlue, goldRed, killsBlue, killsRed}: PrepareGameDataInput) => {

  let message = '';

  if (players.length !== 10) {
    message = 'O jogo deve conter exatamente 10 jogadores!';
  } else if (duration < 0) {
    message = 'A duração do jogo não pode ser negativa!';
  } else if (goldBlue && goldBlue < 0) {
    message = 'O ouro do time azul não pode ser negativo!';
  } else if (goldRed && goldRed < 0) {
    message = 'O ouro do time vermelho não pode ser negativo!';
  }

  if (message) {
    notify(message, 'error');
    throw new Error(message);
  }


  const gameData: InputData<Game> = {
    date: date.slice(0, 10), // YYYY-MM-DD,
    winningTeam: winningTeam === 'blue' ? Team.BLUE : Team.RED,
    duration,
    goldBlue,
    goldRed,
    killsBlue,
    killsRed,
    players
  }
  return gameData;
}