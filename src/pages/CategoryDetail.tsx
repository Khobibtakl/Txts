import { useParams } from 'react-router-dom';
import { TopBar } from '../components/TopBar';
import { ArticleCard } from '../components/ArticleCard';
import { ARTICLES, CATEGORIES } from '../data/mockData';
import { motion } from 'framer-motion';

export function CategoryDetail() {
  const { id } = useParams<{ id: string }>();
  const category = CATEGORIES.find(c => c.id === id);
  const categoryArticles = ARTICLES.filter(a => a.categoryId === id);

  if (!category) {
    return <div>کټګوري ونه موندل شوه</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <TopBar title={category.name} showBack />
      
      <div className="p-4">
        {categoryArticles.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            پدې کټګورۍ کې هیڅ لیکنه شتون نلري.
          </div>
        ) : (
          <div className="space-y-3">
            {categoryArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
