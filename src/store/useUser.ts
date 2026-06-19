import { create } from 'zustand';

interface UserState {
  userId: string;
  setUserId: (id: string) => void;
}

const useUser = create<UserState>((set) => ({
  userId: '',
  setUserId: (id: string) => set({ userId: id }),
}));

export default useUser;
