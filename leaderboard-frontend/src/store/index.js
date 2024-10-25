import {create} from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create((set) => ({
  players: [],
  isLoggedIn: false,
  isAdmin: false,
  currentPlayerId: null,
  addPlayer: (player) =>
    set((state) => ({
      players: [...state.players, { ...player, id: Math.random().toString(36).substr(2, 9) }],
    })),
  updateScore: (id, score) =>
    set((state) => ({
      players: state.players.map((p) => (p.id === id ? { ...p, score } : p)),
    })),
  login: (isAdmin) =>
    set({
      isLoggedIn: true,
      isAdmin,
      currentPlayerId: Math.random().toString(36).substr(2, 9),
    }),
  logout: () =>
    set({
      isLoggedIn: false,
      isAdmin: false,
      currentPlayerId: null,
    }),
}));

export default useStore;
