// src/api/gameService.js

import { AxiosError } from "axios";
import { Game, isGame } from "../types/game";
import { InputData } from "../types/input-data";
import { api } from "./axios";
import { notify } from "./notify";

export const gameService = {
  getAll: async () => {
    const response = await api.get('games/');
    if(!Array.isArray(response.data)){
      throw new Error('Invalid player data');
    }

    if(!response.data.every(isGame)){
      throw new Error('Invalid player data');
    }

    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`games/${id}/`);
    return response.data;
  },

  create: async (gameData: InputData<Game>) => {
    try {
      const response = await api.post('games/', gameData);
      const createdGame = response.data;
      if (!isGame(createdGame)) {
        throw new Error('Invalid game data');
      }
      return createdGame;
    } catch (error) {
      if (error instanceof AxiosError) {
        notify(`${error.response?.statusText} - ${error.response?.data}`, 'error');
      }
      throw new Error('Invalid game') 
    }
  },

  update: async (id: string, gameData: Partial<Game>) => {
    const response = await api.put(`games/${id}/`, gameData);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`games/${id}/`);
    return response.data;
  },
};
