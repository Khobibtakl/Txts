import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';
type FontSize = 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';

interface AppState {
  bookmarks: string[];
  history: string[];
  theme: Theme;
  fontSize: FontSize;
  
  toggleBookmark: (articleId: string) => void;
  addToHistory: (articleId: string) => void;
  clearHistory: () => void;
  setTheme: (theme: Theme) => void;
  setFontSize: (size: FontSize) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      bookmarks: [],
      history: [],
      theme: 'system',
      fontSize: 'lg', // default to slightly larger for Arabic script
      
      toggleBookmark: (id) => set((state) => ({
        bookmarks: state.bookmarks.includes(id) 
          ? state.bookmarks.filter(b => b !== id)
          : [...state.bookmarks, id]
      })),
      
      addToHistory: (id) => set((state) => {
        const filtered = state.history.filter(h => h !== id);
        // keep latest 50
        return { history: [id, ...filtered].slice(0, 50) };
      }),
      
      clearHistory: () => set({ history: [] }),
      
      setTheme: (theme) => set({ theme }),
      
      setFontSize: (fontSize) => set({ fontSize })
    }),
    {
      name: 'pashto-reader-storage',
    }
  )
);
