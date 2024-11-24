// src/api/axiosInstance.js
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Django API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export enum Services {
  PLAYER = 'PlayerService',
  GAME = 'GameService',
  PERFORMANCE = 'GamePerformanceService',
}

