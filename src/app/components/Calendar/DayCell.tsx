'use client';

import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { isToday, isSameDay, isWithinInterval, isBefore } from 'date-fns';
import { useTheme } from '../ui/ThemeProvider';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface DayCellProps {
  date: Date | null; // null = empty filler cell
  dayOfMonth: number;
  range: DateRange;
  hoveredDate: Date | null;
  onSelect: (date: Date) => void;
  onHover: (date: Date | null) => void;
  isCurrentMonth: boolean;
}

export default function DayCell({
  date,
  dayOfMonth,
  range,
  hoveredDate,
  onSelect,
  onHover,
  isCurrentMonth,
}: DayCellProps) {
  const { theme } = useTheme();

  if (!date) {
    return <div className="aspect-square" aria-hidden="true" />;
  }

  const today = isToday(date);
  const isStart = range.start ? isSameDay(date, range.start) : false;
  const isEnd = range.end ? isSameDay(date, range.end) : false;

  // Preview range (hover state when start selected but no end yet)
  const previewEnd = !range.end && range.start && hoveredDate ? hoveredDate : null;
  const previewRange =
    previewEnd && range.start
      ? isBefore(range.start, previewEnd)
        ? { start: range.start, end: previewEnd }
        : { start: previewEnd, end: range.start }
      : null;

  const confirmedRange =
    range.start && range.end
      ? isBefore(range.start, range.end)
        ? { start: range.start, end: range.end }
        : { start: range.end, end: range.start }
      : null;

  const isInRange = confirmedRange
    ? isWithinInterval(date, { start: confirmedRange.start, end: confirmedRange.end }) &&
      !isStart &&
      !isEnd
    : false;

  const isInPreview =
    !isInRange && previewRange
      ? isWithinInterval(date, { start: previewRange.start, end: previewRange.end })
      : false;

  const isPreviewStart = previewRange ? isSameDay(date, previewRange.start) : false;
  const isPreviewEnd = previewRange ? isSameDay(date, previewRange.end) : false;

  const isSelected = isStart || isEnd;

  // Determine rounding for range capsule shape
  const rangePosition = (() => {
    if (!isInRange && !isInPreview) return 'none';
    const activeRange = confirmedRange || previewRange;
    if (!activeRange) return 'none';
    if (isSameDay(date, activeRange.start)) return 'left';
    if (isSameDay(date, activeRange.end)) return 'right';
    return 'middle';
  })();

  return (
    <div
      className="relative aspect-square select-none"
      onMouseEnter={() => onHover(date)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Range background strip */}
      {(isInRange || isInPreview || isStart || isEnd || isPreviewStart || isPreviewEnd) && (
        <div
          className={clsx('absolute inset-y-1 pointer-events-none', {
            'inset-x-0': rangePosition === 'middle',
            'left-1/2 right-0': rangePosition === 'left' || isStart || isPreviewStart,
            'left-0 right-1/2': rangePosition === 'right' || isEnd || isPreviewEnd,
          })}
          style={{
            backgroundColor: isInRange
              ? theme.accentLight + '55'
              : isInPreview
              ? theme.accentLight + '33'
              : 'transparent',
          }}
        />
      )}

      {/* Day number button */}
      <motion.button
        id={`day-cell-${date.toISOString().split('T')[0]}`}
        aria-label={`Select ${date.toLocaleDateString()}`}
        aria-pressed={isSelected}
        onClick={() => onSelect(date)}
        whileTap={{ scale: 0.85 }}
        whileHover={!isSelected ? { scale: 1.12 } : {}}
        className={clsx(
          'relative z-10 w-full h-full flex items-center justify-center',
          'text-sm font-semibold rounded-full transition-colors duration-150',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
          {
            'opacity-35': !isCurrentMonth,
            'cursor-pointer': true,
          }
        )}
        style={
          isSelected
            ? {
                backgroundColor: theme.accent,
                color: theme.accentText,
                boxShadow: `0 0 0 2px ${theme.accentDark}, 0 4px 12px ${theme.accent}66`,
              }
            : isInRange || isInPreview
            ? {
                color: theme.accentText,
                backgroundColor: 'transparent',
              }
            : today
            ? {
                color: theme.accent,
                fontWeight: 900,
              }
            : {
                color: isCurrentMonth ? 'rgba(248,250,252,0.9)' : 'rgba(148,163,184,0.5)',
              }
        }
      >
        {dayOfMonth}

        {/* Today indicator dot */}
        {today && !isSelected && (
          <span
            className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
            style={{ backgroundColor: theme.accent }}
          />
        )}
      </motion.button>
    </div>
  );
}
