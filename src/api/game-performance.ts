// src/api/gamePerformanceService.js
import { AxiosError } from 'axios';
import { GamePerformance, isGamePerformance } from '../types/game-performance';
import { InputData } from '../types/input-data';
import { api } from './axios';
import { notify } from './notify';

export const gamePerformanceService = {
  getAll: async () => {
    const response = await api.get('performances/');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`performances/${id}/`);
    return response.data;
  },

  create: async (performanceData: InputData<GamePerformance>) => {
    try{
      const response = await api.post('performances/', performanceData);
      if(!isGamePerformance(response.data)){
        throw new Error('Invalid performance data');
      }
      return response.data;

    } catch (error) {
      if (error instanceof AxiosError) {
        notify(`${error.response?.statusText} - ${error.response?.data}`, 'error');
      }
      throw new Error('Invalid performance data');
    }
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

