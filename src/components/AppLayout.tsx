import { ReactNode, useEffect } from 'react';
import { useAppStore } from '../store/useStore';
import { BottomNav } from './BottomNav';

export function AppLayout({ children }: { children: ReactNode }) {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // Listen to system changes if theme is 'system'
  useEffect(() => {
    if (theme !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors flex justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl relative flex flex-col min-h-screen overflow-hidden">
        <main className="flex-1 overflow-y-auto no-scrollbar pb-20">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
