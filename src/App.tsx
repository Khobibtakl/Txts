import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppLayout } from './components/AppLayout';
import { Splash } from './components/Splash';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { Categories } from './pages/Categories';
import { CategoryDetail } from './pages/CategoryDetail';
import { Bookmarks } from './pages/Bookmarks';
import { Settings } from './pages/Settings';
import { Search } from './pages/Search';
import { ArticleDetail } from './pages/ArticleDetail';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:id" element={<CategoryDetail />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/search" element={<Search />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Splash />
      <AppLayout>
        <AnimatedRoutes />
      </AppLayout>
    </Router>
  );
}
