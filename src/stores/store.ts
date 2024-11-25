import {create} from 'zustand';
import { Champion } from '../types/champions';
import { NewGamePerformance } from '../types/game-performance';

interface GlobalState {
  champions: Champion[];
  setChampions: (champions: Champion[]) => void;
  performances: NewGamePerformance[];
  resetPerformances: () => void;
  setPerformances: (performances: NewGamePerformance, index: number) => void;
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
  hasError: boolean;
  errorMessage?: string;
  showError: (message?: string) => void;
  hideError: () => void;
}

const initialPerformancesState: NewGamePerformance[] = Array(10).fill({
  kills: 0,
  deaths: 0,
  assists: 0,
  gold: 0,
  cs: 0,
  damageDealt: 0,
  visionScore: 0,
});

export const useGlobalStore = create<GlobalState>((set) => ({
  champions: [],
  setChampions: (champions) => set(() => ({ champions })),
  performances: initialPerformancesState,
  resetPerformances: () => set(() => ({ performances: initialPerformancesState })),
  setPerformances: (performances, index) => set((state) => {
    const newPerformances = [...state.performances];
    newPerformances[index] = performances;
    return { performances: newPerformances };
    }),
  isLoading: false,
  showLoading: () => set(() => ({ isLoading: true })),
  hideLoading: () => set(() => ({ isLoading: false })),
  hasError: false,
  errorMessage: 'Desculpe pela inconveniência, tente novamente em alguns instantes.',
  showError: (message) => set(() => ({ hasError: true, isLoading: false, errorMessage: message })),
  hideError: () => set(() => ({ hasError: false })),
}));
