import { TopBar } from '../components/TopBar';
import { ArticleCard } from '../components/ArticleCard';
import { useAppStore } from '../store/useStore';
import { ARTICLES } from '../data/mockData';
import { motion } from 'framer-motion';

export function Bookmarks() {
  const { bookmarks } = useAppStore();
  const bookmarkedArticles = ARTICLES.filter(a => bookmarks.includes(a.id));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <TopBar title="خوندي شوي" />
      
      <div className="p-4">
        {bookmarkedArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
            <p className="text-lg mb-2">تراوسه هیڅ لیکنه نه ده خوندي شوې.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {bookmarkedArticles.map(article => (
               <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
