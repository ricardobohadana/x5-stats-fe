// src/api/gamePerformanceService.js
import { AverageChampionStatistic, isAverageChampionStatistic } from '../types/average-champion-statistic';
import { GamePerformance } from '../types/game-performance';
import { Lane } from '../types/lane';
import { api } from './axios';

export const gamePerformanceService = {
  getAll: async () => {
    const response = await api.get('performances/');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`performances/${id}/`);
    return response.data;
  },

  update: async (id: string, performanceData: Partial<GamePerformance>) => {
    const response = await api.put(`performances/${id}/`, performanceData);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`performances/${id}/`);
    return response.data;
  },

  getAllChampionsStats: async () => {
    const response = await api.get('champions-stats');
    if(!Array.isArray(response.data)){
      throw new Error('Invalid player stats array');
    }

    if(!response.data.every(isAverageChampionStatistic)){
      throw new Error('Invalid player stats data');
    }
    return response.data;
  },

  getAllChampionsLaneStats: async () => {
    const response = await api.get('champions-lane-stats');
    if (typeof response.data !== 'object')
      throw new Error('Invalid player stats array');

    if(!Object.values(Lane).every((role) => Array.isArray(response.data[role]) && response.data[role].every(isAverageChampionStatistic)))
      throw new Error('Invalid player stats data');

    return response.data as Record<Lane, AverageChampionStatistic[]>;
  }
};

