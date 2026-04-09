'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  format,
} from 'date-fns';
import DayCell, { type DateRange } from './DayCell';
import { useState } from 'react';
import { useTheme } from '../ui/ThemeProvider';

const DAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface GridProps {
  currentDate: Date;
  range: DateRange;
  onRangeChange: (range: DateRange) => void;
  direction: number;
}

export default function Grid({ currentDate, range, onRangeChange, direction }: GridProps) {
  const { theme } = useTheme();
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  // Build the grid: from start of the week of month-start to end of week of month-end
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calStart, end: calEnd });

  // Pad to always have 6 rows (42 cells)
  while (days.length < 42) {
    const last = days[days.length - 1];
    const next = new Date(last);
    next.setDate(next.getDate() + 1);
    days.push(next);
  }

  function handleDaySelect(date: Date) {
    // Clicking logic: no range → set start; start set → set end; both set → reset
    if (!range.start || (range.start && range.end)) {
      onRangeChange({ start: date, end: null });
    } else {
      // start is set, end is not
      if (date.getTime() === range.start.getTime()) {
        // click same day = clear
        onRangeChange({ start: null, end: null });
      } else {
        onRangeChange({ start: range.start, end: date });
      }
    }
  }

  return (
    <div className="flex flex-col flex-1 px-3 pb-3 pt-2">
      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_HEADERS.map((d, i) => (
          <div
            key={d}
            className="text-center text-[10px] font-bold tracking-widest uppercase py-1"
            style={{
              color: i === 0 || i === 6 ? theme.accentLight : 'rgba(148,163,184,0.8)',
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Date grid with slide animation on month change */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={format(currentDate, 'MMMM-yyyy')}
          custom={direction}
          initial={{ x: direction * 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction * -60, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-7 gap-y-0.5 flex-1"
        >
          {days.map((day, idx) => (
            <DayCell
              key={idx}
              date={day}
              dayOfMonth={day.getDate()}
              range={range}
              hoveredDate={hoveredDate}
              onSelect={handleDaySelect}
              onHover={setHoveredDate}
              isCurrentMonth={isSameMonth(day, currentDate)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Selection status bar */}
      <motion.div
        layout
        className="mt-2 rounded-xl px-3 py-2 text-xs font-medium transition-all"
        style={{
          backgroundColor: 'rgba(255,255,255,0.04)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          color: 'rgba(148,163,184,0.9)',
        }}
      >
        {!range.start && !range.end && (
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30 inline-block" />
            Click a date to start your selection
          </span>
        )}
        {range.start && !range.end && (
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: theme.accent }} />
            <strong className="text-white/80">Start:</strong>&nbsp;
            {format(range.start, 'MMM d, yyyy')} — click another date to set end
          </span>
        )}
        {range.start && range.end && (
          <span className="flex items-center gap-1.5 flex-wrap">
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: theme.accent }} />
            <strong className="text-white/80">{format(range.start, 'MMM d')}</strong>
            <span className="text-white/40">→</span>
            <strong className="text-white/80">{format(range.end, 'MMM d, yyyy')}</strong>
            <span className="text-white/50 ml-auto">
              {Math.abs(
                Math.round(
                  (range.end.getTime() - range.start.getTime()) / (1000 * 60 * 60 * 24)
                )
              ) + 1}{' '}
              days
            </span>
          </span>
        )}
      </motion.div>
    </div>
  );
}
