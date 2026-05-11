import { TopBar } from '../components/TopBar';
import { CATEGORIES } from '../data/mockData';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { BookOpen, Type, History, Quote, GraduationCap } from 'lucide-react';

const iconMap: Record<string, any> = {
  'islamic': BookOpen,
  'education': GraduationCap,
  'literature': Type,
  'history': History,
  'quotes': Quote,
};

export function Categories() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <TopBar title="کټګورۍ" showSearch />
      
      <div className="p-4 grid grid-cols-2 gap-4">
        {CATEGORIES.map((category, index) => {
          const Icon = iconMap[category.id] || BookOpen;
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={category.id}
            >
              <Link 
                to={`/category/${category.id}`}
                className={cn(
                  "flex flex-col items-center justify-center p-6 text-white rounded-3xl shadow-lg hover:opacity-90 transition-opacity aspect-square",
                  category.color
                )}
              >
                <Icon className="w-10 h-10 mb-3" />
                <h3 className="text-lg font-bold text-center">{category.name}</h3>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
