import { TopBar } from '../components/TopBar';
import { ArticleCard } from '../components/ArticleCard';
import { ARTICLES } from '../data/mockData';
import { useAppStore } from '../store/useStore';
import { motion } from 'framer-motion';

export function Home() {
  const featuredArticles = ARTICLES.filter(a => a.isFeatured);
  const latestArticles = ARTICLES.filter(a => !a.isFeatured);
  const { history } = useAppStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="pb-6"
    >
      <TopBar title="پښتو لوستونکی" showSearch />
      
      <div className="px-4 pt-4 space-y-6">
        {/* Featured Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">ځانګړې لیکنې</h2>
          </div>
          <div className="space-y-4">
            {featuredArticles.map(article => (
              <ArticleCard key={article.id} article={article} featured />
            ))}
          </div>
        </section>

        {/* Recently Read Logic (Optional - only show if there is history) */}
        {history.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">وروستي لوستل شوي</h2>
            </div>
            <div className="flex overflow-x-auto space-x-reverse space-x-4 pb-4 no-scrollbar snap-x">
              {history.slice(0, 5).map(id => {
                const article = ARTICLES.find(a => a.id === id);
                if (!article) return null;
                return (
                  <div key={id} className="snap-start shrink-0 w-48">
                    <ArticleCard article={article} />
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Latest Articles Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-lg font-bold text-gray-900 dark:text-white">تازه لیکنې</h2>
          </div>
          <div className="space-y-3">
             {latestArticles.map(article => (
               <ArticleCard key={article.id} article={article} />
             ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
