import { create } from 'zustand';

interface LoaderState {
  isLoading: number;
  showLoader: () => void;
  hideLoader: () => void;
}

const useLoader = create<LoaderState>(set => ({
  isLoading: 0,
  showLoader: () =>
    set(state => ({
      isLoading: state.isLoading + 1,
    })),
  hideLoader: () =>
    set(state => ({
      isLoading: state.isLoading - 1,
    })),
}));

export default useLoader;
