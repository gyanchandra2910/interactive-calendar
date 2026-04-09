'use client';

import { useState, useEffect, useCallback } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { ThemeProvider } from '../ui/ThemeProvider';
import HeroImage from './HeroImage';
import MonthHeader from './MonthHeader';
import Grid from './Grid';
import Notes, { type Note } from './Notes';
import { type DateRange } from './DayCell';

const STORAGE_KEY = 'interactive-calendar-notes';

function loadNotes(): Note[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Note[]) : [];
  } catch {
    return [];
  }
}

function saveNotes(notes: Note[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // silent fail
  }
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [notes, setNotes] = useState<Note[]>([]);
  const [direction, setDirection] = useState(1); // 1=forward, -1=back
  const [mounted, setMounted] = useState(false);

  // Load notes from localStorage on mount
  useEffect(() => {
    setNotes(loadNotes());
    setMounted(true);
  }, []);

  // Persist notes whenever they change
  useEffect(() => {
    if (mounted) saveNotes(notes);
  }, [notes, mounted]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentDate((d) => subMonths(d, 1));
  }, []);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentDate((d) => addMonths(d, 1));
  }, []);

  const handleNotesChange = useCallback((newNotes: Note[]) => {
    setNotes(newNotes);
  }, []);

  if (!mounted) {
    // Skeleton to avoid hydration mismatch
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-pulse w-8 h-8 rounded-full bg-white/20" />
      </div>
    );
  }

  return (
    <ThemeProvider monthIndex={currentDate.getMonth()}>
      {/* ─── WALL CALENDAR CARD ─────────────────────────────────────────── */}
      <div
        className="
          w-full max-w-5xl mx-auto
          flex flex-col lg:flex-row
          rounded-2xl overflow-hidden
          shadow-2xl
        "
        style={{
          backgroundColor: '#1e293b',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        {/* ── LEFT / TOP — Hero Image ────────────────────────────────────── */}
        <div className="lg:w-2/5 xl:w-[42%] shrink-0 min-h-[220px] lg:min-h-0">
          <HeroImage currentDate={currentDate} direction={direction} />
        </div>

        {/* ── RIGHT / BOTTOM — Calendar Panel ───────────────────────────── */}
        <div className="flex flex-col lg:flex-row flex-1 min-h-0 divide-y lg:divide-y-0 lg:divide-x divide-white/8">
          {/* Month + Grid */}
          <div
            className="flex flex-col flex-1 min-h-0"
            style={{ backgroundColor: '#0f172a' }}
          >
            <MonthHeader
              currentDate={currentDate}
              onPrev={goToPrev}
              onNext={goToNext}
            />
            <Grid
              currentDate={currentDate}
              range={range}
              onRangeChange={setRange}
              direction={direction}
            />
          </div>

          {/* Notes Panel */}
          <div
            className="flex flex-col w-full lg:w-72 xl:w-80 shrink-0 min-h-0 max-h-[400px] lg:max-h-none"
            style={{ backgroundColor: '#111827' }}
          >
            <Notes
              notes={notes}
              onNotesChange={handleNotesChange}
              selectedRange={range}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
