// src/api/axiosInstance.js
import axios from 'axios';

const env = import.meta.env.VITE_ENVIRONMENT;

type Environment = 'development' | 'production';

const isDevOrProd = (env: unknown): env is Environment => {
  if (!env || (env !== 'development' && env !== 'production')) {
    return false;
  }
  return true;
}

if(!isDevOrProd(env)) {
  throw new Error('Invalid environment');
}


let apiUrl = 'http://localhost:8000'
if(env === 'development') {
  console.log('Development environment');
} else if(env === 'production') {
  console.log('Production environment');
  apiUrl = 'https://lumosx5.pythonanywhere.com'
}

export const api = axios.create({
  baseURL: apiUrl + '/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export enum Services {
  PLAYER = 'PlayerService',
  GAME = 'GameService',
  PERFORMANCE = 'GamePerformanceService',
}

