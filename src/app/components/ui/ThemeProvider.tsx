'use client';

import React, { createContext, useContext, useEffect } from 'react';

// Month-specific themes: each defines accent color palette + hero gradient
export interface MonthTheme {
  /** Primary accent color (hex) */
  accent: string;
  /** Light variant of accent for range highlights */
  accentLight: string;
  /** Darker variant for pressed/active states */
  accentDark: string;
  /** Very subtle background for in-between range cells */
  accentSubtle: string;
  /** Text color on accent background */
  accentText: string;
  /** Hero image overlay gradient direction and colors */
  heroGradient: string;
  /** Name of the season / vibe */
  vibe: string;
}

export const MONTH_THEMES: MonthTheme[] = [
  // January – Ice Blue Mountains
  {
    accent: '#2563eb',
    accentLight: '#93c5fd',
    accentDark: '#1d4ed8',
    accentSubtle: '#eff6ff',
    accentText: '#ffffff',
    heroGradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #2563eb 100%)',
    vibe: 'Arctic Peaks',
  },
  // February – Rose Valentine
  {
    accent: '#e11d48',
    accentLight: '#fda4af',
    accentDark: '#be123c',
    accentSubtle: '#fff1f2',
    accentText: '#ffffff',
    heroGradient: 'linear-gradient(135deg, #1a0010 0%, #4c0519 50%, #e11d48 100%)',
    vibe: 'Crimson Dusk',
  },
  // March – Spring Green
  {
    accent: '#16a34a',
    accentLight: '#86efac',
    accentDark: '#15803d',
    accentSubtle: '#f0fdf4',
    accentText: '#ffffff',
    heroGradient: 'linear-gradient(135deg, #052e16 0%, #14532d 50%, #16a34a 100%)',
    vibe: 'Spring Bloom',
  },
  // April – Lavender Rain
  {
    accent: '#7c3aed',
    accentLight: '#c4b5fd',
    accentDark: '#6d28d9',
    accentSubtle: '#f5f3ff',
    accentText: '#ffffff',
    heroGradient: 'linear-gradient(135deg, #1e0040 0%, #3b0764 50%, #7c3aed 100%)',
    vibe: 'Lavender Mist',
  },
  // May – Golden Meadow
  {
    accent: '#ca8a04',
    accentLight: '#fde68a',
    accentDark: '#a16207',
    accentSubtle: '#fefce8',
    accentText: '#1a1a1a',
    heroGradient: 'linear-gradient(135deg, #1c1400 0%, #422006 50%, #ca8a04 100%)',
    vibe: 'Golden Fields',
  },
  // June – Ocean Teal
  {
    accent: '#0891b2',
    accentLight: '#67e8f9',
    accentDark: '#0e7490',
    accentSubtle: '#ecfeff',
    accentText: '#ffffff',
    heroGradient: 'linear-gradient(135deg, #021b1e 0%, #083344 50%, #0891b2 100%)',
    vibe: 'Coastal Breeze',
  },
  // July – Coral Sunset
  {
    accent: '#ea580c',
    accentLight: '#fdba74',
    accentDark: '#c2410c',
    accentSubtle: '#fff7ed',
    accentText: '#ffffff',
    heroGradient: 'linear-gradient(135deg, #1c0400 0%, #431407 50%, #ea580c 100%)',
    vibe: 'Summer Blaze',
  },
  // August – Amber Harvest
  {
    accent: '#d97706',
    accentLight: '#fcd34d',
    accentDark: '#b45309',
    accentSubtle: '#fffbeb',
    accentText: '#1a1a1a',
    heroGradient: 'linear-gradient(135deg, #1c1000 0%, #451a03 50%, #d97706 100%)',
    vibe: 'Harvest Moon',
  },
  // September – Forest Sage
  {
    accent: '#059669',
    accentLight: '#6ee7b7',
    accentDark: '#047857',
    accentSubtle: '#ecfdf5',
    accentText: '#ffffff',
    heroGradient: 'linear-gradient(135deg, #012616 0%, #064e3b 50%, #059669 100%)',
    vibe: 'Forest Canopy',
  },
  // October – Deep Pumpkin
  {
    accent: '#dc2626',
    accentLight: '#fca5a5',
    accentDark: '#b91c1c',
    accentSubtle: '#fef2f2',
    accentText: '#ffffff',
    heroGradient: 'linear-gradient(135deg, #1c0000 0%, #450a0a 50%, #dc2626 100%)',
    vibe: 'Autumn Fire',
  },
  // November – Slate Fog
  {
    accent: '#475569',
    accentLight: '#cbd5e1',
    accentDark: '#334155',
    accentSubtle: '#f8fafc',
    accentText: '#ffffff',
    heroGradient: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #475569 100%)',
    vibe: 'November Fog',
  },
  // December – Crystal Snow
  {
    accent: '#3b82f6',
    accentLight: '#bae6fd',
    accentDark: '#2563eb',
    accentSubtle: '#f0f9ff',
    accentText: '#ffffff',
    heroGradient: 'linear-gradient(135deg, #0c1445 0%, #1e3a8a 50%, #3b82f6 100%)',
    vibe: 'Winter Crystal',
  },
];

interface ThemeContextValue {
  theme: MonthTheme;
  monthIndex: number;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: MONTH_THEMES[new Date().getMonth()],
  monthIndex: new Date().getMonth(),
});

export function ThemeProvider({
  monthIndex,
  children,
}: {
  monthIndex: number;
  children: React.ReactNode;
}) {
  const theme = MONTH_THEMES[monthIndex % 12];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--accent-light', theme.accentLight);
    root.style.setProperty('--accent-dark', theme.accentDark);
    root.style.setProperty('--accent-subtle', theme.accentSubtle);
    root.style.setProperty('--accent-text', theme.accentText);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, monthIndex }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
