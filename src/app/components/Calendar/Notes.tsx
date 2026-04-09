'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, isBefore } from 'date-fns';
import { Trash2, Plus, StickyNote, Tag } from 'lucide-react';
import { clsx } from 'clsx';
import { useTheme } from '../ui/ThemeProvider';
import { type DateRange } from './DayCell';

export interface Note {
  id: string;
  text: string;
  createdAt: string;
  rangeLabel: string | null; // e.g. "Apr 5 → Apr 10"
  color: string;
}

// Pastel color palette for note tags
const NOTE_COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
  '#8b5cf6', '#06b6d4', '#f97316', '#84cc16',
];

interface NotesProps {
  notes: Note[];
  onNotesChange: (notes: Note[]) => void;
  selectedRange: DateRange;
}

export default function Notes({ notes, onNotesChange, selectedRange }: NotesProps) {
  const { theme } = useTheme();
  const [inputText, setInputText] = useState('');
  const [colorIndex, setColorIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function getRangeLabel(range: DateRange): string | null {
    if (!range.start) return null;
    const start = range.start;
    const end = range.end;
    if (!end) return format(start, 'MMM d, yyyy');
    const ordered = isBefore(start, end) ? { s: start, e: end } : { s: end, e: start };
    if (ordered.s.getTime() === ordered.e.getTime()) return format(ordered.s, 'MMM d, yyyy');
    return `${format(ordered.s, 'MMM d')} → ${format(ordered.e, 'MMM d, yyyy')}`;
  }

  function addNote() {
    const text = inputText.trim();
    if (!text) return;

    const newNote: Note = {
      id: `note-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      text,
      createdAt: new Date().toISOString(),
      rangeLabel: getRangeLabel(selectedRange),
      color: NOTE_COLORS[colorIndex % NOTE_COLORS.length],
    };

    onNotesChange([newNote, ...notes]);
    setInputText('');
    setColorIndex((c) => c + 1);
  }

  function deleteNote(id: string) {
    onNotesChange(notes.filter((n) => n.id !== id));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      addNote();
    }
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Notes header */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <StickyNote size={15} style={{ color: theme.accent }} />
        <h2 className="text-sm font-bold text-white/90 tracking-wide"> Notes</h2>
        {notes.length > 0 && (
          <span
            className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: theme.accent + '33', color: theme.accent }}
          >
            {notes.length}
          </span>
        )}
      </div>

      {/* Input area */}
      <div className="p-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        {/* Range badge */}
        {selectedRange.start && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 mb-2"
          >
            <Tag size={11} style={{ color: theme.accentLight }} />
            <span className="text-xs font-semibold" style={{ color: theme.accentLight }}>
              {getRangeLabel(selectedRange)}
            </span>
          </motion.div>
        )}

        <textarea
          ref={textareaRef}
          id="note-textarea"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            selectedRange.start
              ? `Add a note for ${getRangeLabel(selectedRange)}…`
              : 'Select dates then add a note… (Ctrl+Enter to save)'
          }
          rows={3}
          className="w-full text-sm resize-none rounded-xl px-3 py-2.5 placeholder-white/25 text-white/90 transition-all outline-none focus:ring-1"
          style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            lineHeight: '1.5',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = theme.accent + '88';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          }}
        />

        <div className="flex items-center gap-2 mt-2">
          {/* Color picker */}
          <div className="flex gap-1.5 flex-wrap">
            {NOTE_COLORS.slice(0, 6).map((color, i) => (
              <button
                key={color}
                id={`note-color-${i}`}
                onClick={() => setColorIndex(i)}
                aria-label={`Note color ${i + 1}`}
                className="w-4 h-4 rounded-full transition-transform hover:scale-125"
                style={{
                  backgroundColor: color,
                  outline: colorIndex % NOTE_COLORS.length === i ? `2px solid white` : 'none',
                  outlineOffset: '1px',
                }}
              />
            ))}
          </div>

          {/* Save button */}
          <motion.button
            id="add-note-btn"
            onClick={addNote}
            disabled={!inputText.trim()}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            className={clsx(
              'ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold',
              'transition-opacity disabled:opacity-40 disabled:cursor-not-allowed'
            )}
            style={{ backgroundColor: theme.accent, color: theme.accentText }}
          >
            <Plus size={13} />
            Add Note
          </motion.button>
        </div>
      </div>

      {/* Notes list */}
      <div className="flex-1 overflow-y-auto min-h-0 p-3 space-y-2">
        <AnimatePresence initial={false}>
          {notes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full text-center py-10"
            >
              <StickyNote size={32} className="mb-3 opacity-20" />
              <p className="text-sm text-white/30 font-medium">No notes yet</p>
              <p className="text-xs text-white/20 mt-1">
                Select a date range and add your first note
              </p>
            </motion.div>
          ) : (
            notes.map((note) => (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0, y: -12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 30, scale: 0.9 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="group relative rounded-xl p-3 transition-colors"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${note.color}22`,
                  borderLeft: `3px solid ${note.color}`,
                }}
              >
                {/* Range tag */}
                {note.rangeLabel && (
                  <div className="flex items-center gap-1 mb-1.5">
                    <Tag size={10} style={{ color: note.color }} className="shrink-0" />
                    <span className="text-xs font-semibold" style={{ color: note.color }}>
                      {note.rangeLabel}
                    </span>
                  </div>
                )}

                {/* Note text */}
                <p className="text-sm text-white/85 leading-relaxed break-words">{note.text}</p>

                {/* Timestamp + delete */}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-white/30">
                    {format(new Date(note.createdAt), 'MMM d · h:mm a')}
                  </span>
                  <motion.button
                    id={`delete-note-${note.id}`}
                    onClick={() => deleteNote(note.id)}
                    whileHover={{ scale: 1.2, color: '#ef4444' }}
                    whileTap={{ scale: 0.85 }}
                    aria-label="Delete note"
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded text-white/40"
                  >
                    <Trash2 size={13} />
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
