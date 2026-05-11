import { useState, useMemo } from 'react';
import { TopBar } from '../components/TopBar';
import { ArticleCard } from '../components/ArticleCard';
import { ARTICLES, CATEGORIES } from '../data/mockData';
import { motion } from 'framer-motion';

export function Search() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter(article => {
      const matchesSearch = article.title.includes(query) || article.excerpt.includes(query);
      const matchesCategory = activeCategory ? article.categoryId === activeCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-950"
    >
      <TopBar title="لټون" showBack />
      
      <div className="p-4 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="د لیکني سرلیک یا متن ولټوئ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
          />
        </div>

        {/* Category Filters */}
        <div className="flex overflow-x-auto space-x-reverse space-x-2 pb-2 no-scrollbar">
          <button
            onClick={() => setActiveCategory(null)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === null 
                ? 'bg-emerald-500 text-white' 
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
            }`}
          >
            ټول
          </button>
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id 
                  ? `${category.color} text-white border-transparent` 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="mt-4 pb-20">
          <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-3">
            پایلې: {filteredArticles.length}
          </h3>
          {filteredArticles.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              هیڅ لیکنه پیدا نشوه. بله کلمه وکاروئ.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
