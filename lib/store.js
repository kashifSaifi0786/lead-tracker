import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  login: (data) => set(data),
  logout: () => set({ user: null, token: null }),
}));
