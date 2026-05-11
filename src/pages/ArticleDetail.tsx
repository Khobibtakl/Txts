import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TopBar } from '../components/TopBar';
import { useAppStore } from '../store/useStore';
import { ARTICLES, CATEGORIES } from '../data/mockData';
import { motion } from 'framer-motion';
import { Bookmark, Share2 } from 'lucide-react';
import { cn } from '../lib/utils';

const fontSizeClasses = {
  sm: 'text-sm leading-relaxed',
  base: 'text-base leading-relaxed',
  lg: 'text-lg leading-loose',
  xl: 'text-xl leading-loose',
  '2xl': 'text-2xl leading-loose',
  '3xl': 'text-3xl leading-loose',
};

export function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { bookmarks, toggleBookmark, addToHistory, fontSize } = useAppStore();
  
  const article = ARTICLES.find(a => a.id === id);
  const isBookmarked = article ? bookmarks.includes(article.id) : false;

  useEffect(() => {
    if (article) {
      addToHistory(article.id);
    }
  }, [article, addToHistory]);

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-500">لیکنه ونه موندل شوه!</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-emerald-500">شاته</button>
      </div>
    );
  }

  const category = CATEGORIES.find(c => c.id === article.categoryId);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  const RightActions = () => (
    <div className="flex items-center space-x-reverse space-x-2">
      <button 
        onClick={handleShare}
        className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      >
        <Share2 className="w-5 h-5" />
      </button>
      <button 
        onClick={() => toggleBookmark(article.id)}
        className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      >
        <Bookmark className={cn("w-5 h-5", isBookmarked && "fill-emerald-500 text-emerald-500")} />
      </button>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="bg-white dark:bg-gray-900 min-h-screen"
    >
      <TopBar showBack rightAction={<RightActions />} transparent />
      
      <div className="relative -mt-14 h-72 w-full">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 to-transparent flex items-end">
        </div>
      </div>

      <div className="px-5 -mt-6 relative z-10 pb-12">
        {category && (
           <span className={cn("text-xs text-white px-3 py-1 rounded-full w-fit mb-3 inline-block", category.color)}>
              {category.name}
           </span>
        )}
        
        <h1 className="text-2xl md:text-3xl font-bold font-sans text-gray-900 dark:text-gray-50 leading-snug mb-4">
          {article.title}
        </h1>
        
        <div className="flex items-center justify-between border-y border-gray-100 dark:border-gray-800 py-3 mb-6">
          <div className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400">
            <span>لیکوال: {article.author}</span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-500">
            {article.publishedAt}
          </div>
        </div>

        <div 
          className={cn(
            "prose prose-emerald dark:prose-invert max-w-none font-sans font-medium text-justify",
            fontSizeClasses[fontSize]
          )}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </motion.div>
  );
}
