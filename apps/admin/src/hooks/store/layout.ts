import { create } from 'zustand';

interface LayoutStore {
  sidebarOpen: boolean;
  sidebarToggle: () => void;
  sidebarClose: () => void;
}

const SIDEBAR_OPEN_KEY = 'SIDEBAR_OPEN';

const sidebarToggleHandler = (state: LayoutStore) => {
  const sidebarOpen = !state.sidebarOpen;

  window.localStorage.setItem(SIDEBAR_OPEN_KEY, sidebarOpen ? 'true' : 'false');

  return { sidebarOpen };
};

const useLayoutStore = create<LayoutStore>((set) => {
  const sidebarOpen = window.localStorage.getItem(SIDEBAR_OPEN_KEY) === 'true';

  return {
    sidebarOpen,
    sidebarToggle: () => set(sidebarToggleHandler),
    sidebarClose: () => set({ sidebarOpen: false }),
  };
});

export default useLayoutStore;
