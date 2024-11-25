// src/api/gamePerformanceService.js
import { GamePerformance } from '../types/game-performance';
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
};

