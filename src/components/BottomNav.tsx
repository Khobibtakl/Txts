import { NavLink } from 'react-router-dom';
import { Home, LayoutGrid, Bookmark, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

export function BottomNav() {
  const navItems = [
    { to: '/', icon: Home, label: 'کور' },
    { to: '/categories', icon: LayoutGrid, label: 'کټګورۍ' },
    { to: '/bookmarks', icon: Bookmark, label: 'خوندي شوي' },
    { to: '/settings', icon: Settings, label: 'تنظیمات' },
  ];

  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 pb-safe z-50 transition-colors">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                  isActive 
                    ? "text-emerald-600 dark:text-emerald-500" 
                    : "text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                )
              }
            >
              <Icon className="w-6 h-6" strokeWidth={2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
