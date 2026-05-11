import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
import { cn } from '../lib/utils';

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  rightAction?: ReactNode;
  transparent?: boolean;
}

export function TopBar({ title, showBack, showSearch, rightAction, transparent = false }: TopBarProps) {
  const navigate = useNavigate();

  return (
    <header 
      className={cn(
        "sticky top-0 w-full z-40 transition-colors h-14 flex items-center justify-between px-4",
        transparent 
          ? "bg-gradient-to-b from-black/60 to-transparent text-white" 
          : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
      )}
    >
      <div className="flex items-center space-x-reverse space-x-2 w-1/3">
        {showBack && (
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -mr-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      <div className="flex-1 text-center truncate px-2 font-bold text-lg">
        {title}
      </div>

      <div className="flex items-center justify-end space-x-reverse space-x-2 w-1/3">
        {showSearch && (
          <button 
            onClick={() => navigate('/search')}
            className="p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        )}
        {rightAction}
      </div>
    </header>
  );
}
