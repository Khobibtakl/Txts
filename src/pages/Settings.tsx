import { TopBar } from '../components/TopBar';
import { useAppStore } from '../store/useStore';
import { motion } from 'framer-motion';
import { Monitor, Moon, Sun, Type, Trash2, Info } from 'lucide-react';

export function Settings() {
  const { theme, setTheme, fontSize, setFontSize, clearHistory } = useAppStore();

  const themes = [
    { id: 'light', label: 'روښانه', icon: Sun },
    { id: 'dark', label: 'تیاره', icon: Moon },
    { id: 'system', label: 'د سیسټم مطابق', icon: Monitor },
  ];

  const fontSizes = [
    { id: 'sm', label: 'کوچنی' },
    { id: 'base', label: 'منځنی' },
    { id: 'lg', label: 'لوی' },
    { id: 'xl', label: 'ډېر لوی' },
    { id: '2xl', label: 'ستر' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-6"
    >
      <TopBar title="تنظیمات" />
      
      <div className="p-4 space-y-8">
        
        {/* Theme Settings */}
        <section>
          <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">بڼه (Theme)</h3>
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
            {themes.map((t, idx) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as any)}
                  className={`w-full flex items-center justify-between p-4 ${idx !== themes.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}
                >
                  <div className="flex items-center">
                    <Icon className="w-5 h-5 ml-3 text-gray-500" />
                    <span className="text-gray-900 dark:text-gray-100">{t.label}</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${theme === t.id ? 'border-emerald-500' : 'border-gray-300 dark:border-gray-600'}`}>
                    {theme === t.id && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Font Size Settings */}
        <section>
          <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">د لیکني اندازه</h3>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <Type className="w-4 h-4 text-gray-400" />
              <Type className="w-6 h-6 text-gray-400" />
            </div>
            <input 
              type="range" 
              min="0" 
              max={fontSizes.length - 1} 
              value={fontSizes.findIndex(f => f.id === fontSize)}
              onChange={(e) => setFontSize(fontSizes[parseInt(e.target.value)].id as any)}
              className="w-full accent-emerald-500"
              dir="ltr"
            />
            <div className="text-center mt-3 text-emerald-600 dark:text-emerald-400 font-medium text-sm">
              {fontSizes.find(f => f.id === fontSize)?.label}
            </div>
          </div>
        </section>

        {/* Data Settings */}
        <section>
          <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">ډیټا او معلومات</h3>
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
            <button
              onClick={() => {
                if(window.confirm('ایا غواړئ چې د لوستلو تاریخچه مو پاکه شي؟')) {
                  clearHistory();
                }
              }}
              className="w-full flex items-center p-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition"
            >
              <Trash2 className="w-5 h-5 ml-3" />
              <span>د لوستلو تاریخچه پاکول</span>
            </button>
            <div className="border-t border-gray-100 dark:border-gray-700"></div>
            <div className="w-full flex items-center p-4 text-gray-900 dark:text-gray-100">
              <Info className="w-5 h-5 ml-3 text-gray-500" />
              <div className="text-right flex-1">
                <div className="font-medium">د اپلیکیشن نسخه</div>
                <div className="text-xs text-gray-500">v1.0.0 (Premium)</div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </motion.div>
  );
}
