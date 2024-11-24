import { isAveragePlayerStatistic } from '../types/average-player-statistic';
import { InputData } from '../types/input-data';
import { isPlayer, Player } from '../types/player';
import { api } from './axios';


export const playerService = {
  getAll: async () => {
    const response = await api.get('players/');
    if(!Array.isArray(response.data)){
      throw new Error('Invalid player data');
    }

    if(!response.data.every(isPlayer)){
      throw new Error('Invalid player data');
    }

    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`players/${id}/`);
    return response.data;
  },

  create: async (playerData: InputData<Player>) => {
    const response = await api.post('players/', playerData);
    return response.data;
  },

  update: async (id: string, playerData: Partial<Player>) => {
    const response = await api.put(`players/${id}/`, playerData);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`players/${id}/`);
    return response.data;
  },

  getAllStats: async () => {
    const response = await api.get('stats');
    if(!Array.isArray(response.data)){
      throw new Error('Invalid player stats array');
    }

    if(!response.data.every(isAveragePlayerStatistic)){
      throw new Error('Invalid player stats data');
    }

    return response.data;
  }
};