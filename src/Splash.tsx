import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Splash() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex justify-center bg-gray-50 dark:bg-gray-950">
          <motion.div
             initial={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.5 }}
             className="w-full max-w-md h-full bg-emerald-600 flex flex-col items-center justify-center text-white shadow-2xl relative"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-24 h-24 bg-white rounded-3xl mb-6 flex items-center justify-center shadow-2xl"
            >
              <span className="text-emerald-600 text-4xl font-black">پ</span>
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-3xl font-black mb-2"
            >
              پښتو لوستونکی
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-emerald-100 font-medium"
            >
              خپلې د خوښې لیکنې دلته ولولئ
            </motion.p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
