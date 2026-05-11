import { Link } from 'react-router-dom';
import { Bookmark, Clock } from 'lucide-react';
import { Article } from '../types/article';
import { useAppStore } from '../store/useStore';
import { cn } from '../lib/utils';
import { CATEGORIES } from '../data/mockData';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const { bookmarks, toggleBookmark } = useAppStore();
  const isBookmarked = bookmarks.includes(article.id);
  const category = CATEGORIES.find(c => c.id === article.categoryId);

  if (featured) {
    return (
      <Link 
        to={`/article/${article.id}`} 
        className="block relative h-64 w-full rounded-3xl overflow-hidden group shadow-lg"
      >
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent flex flex-col justify-end p-5">
          {category && (
            <span className={cn("text-xs text-white px-3 py-1 rounded-full w-fit mb-3", category.color)}>
              {category.name}
            </span>
          )}
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
            {article.title}
          </h2>
          <div className="flex items-center text-gray-300 text-xs space-x-reverse space-x-4">
             <span className="flex items-center">
              <Clock className="w-3 h-3 ml-1" />
              {article.readTime} دقیقې
            </span>
            <span>{article.publishedAt}</span>
          </div>
        </div>
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleBookmark(article.id);
          }}
          className="absolute top-4 left-4 p-2.5 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition"
        >
          <Bookmark className={cn("w-5 h-5", isBookmarked && "fill-current text-emerald-400")} />
        </button>
      </Link>
    );
  }

  return (
    <Link 
      to={`/article/${article.id}`}
      className="flex gap-4 p-3 rounded-2xl bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm border border-gray-100 dark:border-gray-800 group"
    >
      <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-between py-1 flex-1">
        <div>
          {category && (
            <span className={cn("text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-md mb-1.5 inline-block")}>
               {category.name}
            </span>
          )}
          <h3 className="font-bold text-gray-900 dark:text-gray-100 leading-snug line-clamp-2 text-sm">
            {article.title}
          </h3>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
           <span className="flex items-center">
              <Clock className="w-3 h-3 ml-1" />
              {article.readTime} دقیقې
           </span>
           <button 
             onClick={(e) => {
               e.preventDefault();
               toggleBookmark(article.id);
             }}
             className="p-1 -m-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
           >
             <Bookmark className={cn("w-4 h-4", isBookmarked && "fill-emerald-500 text-emerald-500")} />
           </button>
        </div>
      </div>
    </Link>
  );
}
