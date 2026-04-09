'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { useTheme } from '../ui/ThemeProvider';

interface MonthHeaderProps {
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
}

export default function MonthHeader({ currentDate, onPrev, onNext }: MonthHeaderProps) {
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
      {/* Prev arrow */}
      <motion.button
        id="prev-month-btn"
        aria-label="Previous month"
        onClick={onPrev}
        whileHover={{ scale: 1.15, x: -2 }}
        whileTap={{ scale: 0.9 }}
        className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
        style={{
          backgroundColor: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        <ChevronLeft size={18} className="text-white/80" />
      </motion.button>

      {/* Month / Year */}
      <div className="text-center">
        <motion.div
          key={format(currentDate, 'MMMM-yyyy')}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center"
        >
          <h1
            className="text-xl font-black tracking-widest uppercase Leading-none"
            style={{ color: theme.accent }}
          >
            {format(currentDate, 'MMMM')}
          </h1>
          <span className="text-xs font-semibold text-white/50 tracking-[0.2em] mt-0.5">
            {format(currentDate, 'yyyy')}
          </span>
        </motion.div>
      </div>

      {/* Next arrow */}
      <motion.button
        id="next-month-btn"
        aria-label="Next month"
        onClick={onNext}
        whileHover={{ scale: 1.15, x: 2 }}
        whileTap={{ scale: 0.9 }}
        className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
        style={{
          backgroundColor: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        <ChevronRight size={18} className="text-white/80" />
      </motion.button>
    </div>
  );
}
