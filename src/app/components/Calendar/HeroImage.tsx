'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ui/ThemeProvider';
import { format } from 'date-fns';

// Month landscape keywords for visual variety
const MONTH_VISUALS = [
  { label: 'Mountain Peaks', vibe: 'Arctic Peaks',    emoji: '🏔️', pattern: 'peaks'   },
  { label: 'Frozen Lake',    vibe: 'Frozen Lake',      emoji: '❄️', pattern: 'frost'   },
  { label: 'Cherry Blossoms', vibe: 'Spring Bloom',   emoji: '🌸', pattern: 'bloom'   },
  { label: 'Lavender Fields', vibe: 'Lavender Mist',  emoji: '💜', pattern: 'fields'  },
  { label: 'Golden Meadow',  vibe: 'Golden Fields',    emoji: '🌾', pattern: 'meadow'  },
  { label: 'Ocean Horizon',  vibe: 'Coastal Breeze',   emoji: '🌊', pattern: 'ocean'   },
  { label: 'Sunset Cliffs',  vibe: 'Summer Blaze',     emoji: '🌅', pattern: 'cliffs'  },
  { label: 'Amber Harvest',  vibe: 'Harvest Moon',     emoji: '🌻', pattern: 'harvest' },
  { label: 'Forest Trails',  vibe: 'Forest Canopy',    emoji: '🌲', pattern: 'forest'  },
  { label: 'Autumn Flame',   vibe: 'Autumn Fire',      emoji: '🍂', pattern: 'autumn'  },
  { label: 'Misty Valley',   vibe: 'November Fog',     emoji: '🌫️', pattern: 'mist'   },
  { label: 'Crystal Snow',   vibe: 'Winter Crystal',   emoji: '❄️', pattern: 'snow'   },
];

// SVG landscape illustrations per month theme
function LandscapeSVG({ monthIndex }: { monthIndex: number }) {
  const theme = useTheme().theme;
  const pattern = MONTH_VISUALS[monthIndex % 12].pattern;

  const svgContent: Record<string, React.ReactNode> = {
    peaks: (
      <>
        {/* Sky gradient */}
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="60%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor={theme.accent} />
          </linearGradient>
          <linearGradient id="snowGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#skyGrad)" />
        {/* Stars */}
        {[...Array(20)].map((_, i) => (
          <circle
            key={i}
            cx={`${5 + i * 5}%`}
            cy={`${5 + (i % 7) * 5}%`}
            r={i % 3 === 0 ? 2.5 : 1.5}
            fill="white"
            opacity={0.6 + (i % 4) * 0.1}
          />
        ))}
        {/* Background mountain */}
        <polygon points="0,280 150,80 300,200 450,60 600,180 700,280" fill="#1e3a5f" opacity="0.8" />
        {/* Middle mountain */}
        <polygon points="50,280 250,40 420,160 560,280" fill="#1d4ed8" opacity="0.9" />
        {/* Foreground mountain */}
        <polygon points="150,280 350,20 550,280" fill={theme.accentDark} />
        {/* Snow cap */}
        <polygon points="280,80 350,20 420,80 390,100 310,100" fill="url(#snowGrad)" />
        {/* Ground */}
        <rect y="260" width="700" height="40" fill="#0f172a" opacity="0.8" />
        {/* Moon */}
        <circle cx="80" cy="50" r="30" fill="#fef3c7" opacity="0.9" />
        <circle cx="92" cy="44" r="26" fill="#1e3a5f" opacity="0.95" />
      </>
    ),
    frost: (
      <>
        <defs>
          <linearGradient id="frostSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor={theme.accent} stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#frostSky)" />
        {/* Aurora bands */}
        <ellipse cx="350" cy="100" rx="300" ry="60" fill={theme.accentLight} opacity="0.15" />
        <ellipse cx="250" cy="140" rx="250" ry="40" fill={theme.accent} opacity="0.1" />
        {/* Frozen lake reflection */}
        <ellipse cx="350" cy="230" rx="320" ry="60" fill="#bae6fd" opacity="0.25" />
        {/* Ice texture lines */}
        {[150, 180, 210, 240].map((y, i) => (
          <line key={i} x1={50 + i * 20} y1={y} x2={650 - i * 20} y2={y + 5}
            stroke="#e0f2fe" strokeWidth="1" opacity="0.3" strokeDasharray="20,30" />
        ))}
        {/* Bare trees silhouette */}
        {[60, 140, 580, 640].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={280} x2={x} y2={100 + i * 20} stroke="#0f172a" strokeWidth={i < 2 ? 4 : 3} />
            <line x1={x - 20} y1={180} x2={x} y2={140 + i * 20} stroke="#0f172a" strokeWidth="2" />
            <line x1={x + 20} y1={190} x2={x} y2={150 + i * 20} stroke="#0f172a" strokeWidth="2" />
          </g>
        ))}
        {/* Snow ground */}
        <path d="M0,260 Q175,240 350,255 Q525,270 700,250 L700,300 L0,300 Z" fill="#e0f2fe" opacity="0.8" />
        {/* Stars */}
        {[...Array(15)].map((_, i) => (
          <circle key={i} cx={`${i * 7}%`} cy={`${(i % 5) * 8}%`} r={1.5} fill="white" opacity={0.7} />
        ))}
      </>
    ),
    bloom: (
      <>
        <defs>
          <linearGradient id="bloomSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fdf4ff" />
            <stop offset="100%" stopColor="#fce7f3" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bloomSky)" />
        {/* Soft clouds */}
        <ellipse cx="150" cy="70" rx="100" ry="35" fill="white" opacity="0.8" />
        <ellipse cx="500" cy="50" rx="120" ry="30" fill="white" opacity="0.7" />
        {/* Path */}
        <path d="M250,300 Q350,200 450,300" stroke="#fda4af" strokeWidth="30" fill="none" opacity="0.3" />
        {/* Cherry blossom trees */}
        {[100, 300, 500].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={300} x2={x} y2={100 + i * 15} stroke="#92400e" strokeWidth="8" />
            <circle cx={x} cy={80 + i * 15} r={70 - i * 5} fill={theme.accent} opacity={0.7 - i * 0.1} />
            <circle cx={x - 30} cy={100 + i * 15} r={45} fill={theme.accentLight} opacity={0.6} />
            <circle cx={x + 40} cy={95 + i * 15} r={50} fill={theme.accent} opacity={0.5} />
          </g>
        ))}
        {/* Falling petals */}
        {[...Array(12)].map((_, i) => (
          <ellipse key={i} cx={80 + i * 50} cy={120 + (i % 4) * 40} rx={6} ry={3}
            fill={theme.accentLight} opacity={0.7} transform={`rotate(${i * 30} ${80 + i * 50} ${120 + (i % 4) * 40})`} />
        ))}
        {/* Ground */}
        <path d="M0,270 Q350,255 700,270 L700,300 L0,300 Z" fill="#d1fae5" opacity="0.6" />
      </>
    ),
    fields: (
      <>
        <defs>
          <linearGradient id="fieldSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="50%" stopColor={theme.accentDark} />
            <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#fieldSky)" />
        {/* Moon */}
        <circle cx="550" cy="60" r="40" fill="#fef9c3" opacity="0.9" />
        {/* Lavender rows */}
        {[200, 220, 240, 260, 280].map((y, i) => (
          <path key={i} d={`M${-20 + i * 10},${y} Q350,${y - 10} ${720 - i * 10},${y}`}
            stroke={theme.accentLight} strokeWidth={8 - i} fill="none" opacity={0.4 + i * 0.1} />
        ))}
        {/* Lavender stalks */}
        {[...Array(18)].map((_, i) => (
          <g key={i}>
            <line x1={30 + i * 38} y1={300} x2={30 + i * 38} y2={180} stroke="#86efac" strokeWidth="2" opacity="0.6" />
            <ellipse cx={30 + i * 38} cy={175} rx={6} ry={14} fill={theme.accent} opacity="0.8" />
          </g>
        ))}
        {/* Ground */}
        <rect y="280" width="700" height="30" fill="#1e1b4b" />
      </>
    ),
    meadow: (
      <>
        <defs>
          <linearGradient id="meadowSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="50%" stopColor="#fde68a" />
            <stop offset="100%" stopColor={theme.accent} stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#meadowSky)" />
        {/* Sun */}
        <circle cx="580" cy="60" r="45" fill="#fbbf24" opacity="0.9" />
        {/* Sun rays */}
        {[...Array(8)].map((_, i) => (
          <line key={i} x1={580} y1={60}
            x2={580 + Math.cos((i * Math.PI) / 4) * 70}
            y2={60 + Math.sin((i * Math.PI) / 4) * 70}
            stroke="#fbbf24" strokeWidth="3" opacity="0.5" />
        ))}
        {/* Rolling hills */}
        <path d="M0,200 Q100,150 200,180 Q320,120 450,170 Q560,130 700,160 L700,300 L0,300 Z" fill="#86efac" opacity="0.8" />
        <path d="M0,240 Q150,200 300,220 Q450,190 600,215 Q650,210 700,220 L700,300 L0,300 Z" fill="#4ade80" opacity="0.9" />
        {/* Wildflowers */}
        {[...Array(20)].map((_, i) => (
          <g key={i}>
            <line x1={20 + i * 35} y1={270} x2={20 + i * 35} y2={240 + (i % 3) * 10} stroke="#16a34a" strokeWidth="2" />
            <circle cx={20 + i * 35} cy={235 + (i % 3) * 10} r={6} fill={i % 3 === 0 ? theme.accent : '#f472b6'} opacity="0.9" />
          </g>
        ))}
        {/* Clouds */}
        <ellipse cx="200" cy="80" rx="90" ry="30" fill="white" opacity="0.7" />
        <ellipse cx="350" cy="60" rx="110" ry="28" fill="white" opacity="0.6" />
      </>
    ),
    ocean: (
      <>
        <defs>
          <linearGradient id="oceanSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#082f49" />
            <stop offset="60%" stopColor={theme.accentDark} />
            <stop offset="100%" stopColor={theme.accent} />
          </linearGradient>
          <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.accent} />
            <stop offset="100%" stopColor="#082f49" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#oceanSky)" />
        {/* Stars */}
        {[...Array(12)].map((_, i) => (
          <circle key={i} cx={`${i * 8}%`} cy={`${(i % 4) * 6}%`} r={1.5} fill="white" opacity={0.6} />
        ))}
        {/* Moon reflection */}
        <circle cx="350" cy="60" r="35" fill="#fef9c3" opacity="0.9" />
        {/* Ocean waves */}
        <path d="M0,180 Q87,160 175,180 Q262,200 350,180 Q437,160 525,180 Q612,200 700,180 L700,300 L0,300 Z" fill="url(#waterGrad)" opacity="0.9" />
        <path d="M0,210 Q100,195 200,210 Q300,225 400,210 Q500,195 700,210 L700,300 L0,300 Z" fill="#0c4a6e" opacity="0.8" />
        {/* Moon path on water */}
        <path d="M330,180 Q350,230 370,300" stroke="#fef9c3" strokeWidth="40" fill="none" opacity="0.08" />
        {/* Horizon mist */}
        <rect y="168" width="700" height="20" fill={theme.accentLight} opacity="0.1" />
        {/* Sailboat */}
        <polygon points="320,170 350,100 380,170" fill="white" opacity="0.9" />
        <line x1="350" y1="170" x2="350" y2="185" stroke="#475569" strokeWidth="3" />
        <path d="M330,185 Q350,183 370,185" stroke="#475569" strokeWidth="3" fill="none" />
      </>
    ),
    cliffs: (
      <>
        <defs>
          <linearGradient id="cliffSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c1917" />
            <stop offset="40%" stopColor="#7c2d12" />
            <stop offset="100%" stopColor={theme.accent} />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#cliffSky)" />
        {/* Setting sun */}
        <circle cx="350" cy="195" r="55" fill="#fbbf24" opacity="0.9" />
        <circle cx="350" cy="195" r="70" fill="#fbbf24" opacity="0.2" />
        {/* Ocean */}
        <path d="M0,200 Q175,185 350,200 Q525,215 700,200 L700,300 L0,300 Z" fill="#7c2d12" opacity="0.5" />
        <path d="M0,220 Q175,205 350,220 Q525,235 700,220 L700,300 L0,300 Z" fill={theme.accentDark} opacity="0.6" />
        {/* Left cliff */}
        <path d="M0,300 L0,120 Q80,100 100,160 Q120,200 80,220 Q60,240 120,300 Z" fill="#292524" />
        {/* Right cliff */}
        <path d="M700,300 L700,100 Q630,80 600,150 Q580,190 620,220 Q650,250 580,300 Z" fill="#1c1917" />
        {/* Sun glare on water */}
        <path d="M310,200 Q350,250 390,300 M330,200 Q355,255 375,300 M350,200 Q350,260 350,300"
          stroke="#fbbf24" strokeWidth="3" fill="none" opacity="0.2" />
      </>
    ),
    harvest: (
      <>
        <defs>
          <linearGradient id="harvestSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#431407" />
            <stop offset="60%" stopColor="#92400e" />
            <stop offset="100%" stopColor={theme.accent} stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#harvestSky)" />
        {/* Large harvest moon */}
        <circle cx="500" cy="80" r="50" fill="#fef3c7" opacity="0.95" />
        <circle cx="500" cy="80" r="65" fill="#fef3c7" opacity="0.1" />
        {/* Wheat field */}
        {[...Array(20)].map((_, i) => (
          <g key={i}>
            <line x1={15 + i * 35} y1={300} x2={15 + i * 35 + (i % 3 - 1) * 8} y2={180} stroke="#a16207" strokeWidth="3" />
            <ellipse cx={15 + i * 35 + (i % 3 - 1) * 8} cy={170} rx={8} ry={18} fill={theme.accent} opacity="0.85" />
          </g>
        ))}
        {/* Barn silhouette */}
        <rect x="50" y="180" width="100" height="80" fill="#1c0a00" />
        <polygon points="50,180 100,130 150,180" fill="#0f0500" />
        {/* Ground */}
        <rect y="280" width="700" height="30" fill="#92400e" opacity="0.5" />
      </>
    ),
    forest: (
      <>
        <defs>
          <linearGradient id="forestSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#022c22" />
            <stop offset="100%" stopColor={theme.accent} stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#forestSky)" />
        {/* Tall pines - back row */}
        {[50, 150, 280, 420, 550, 650].map((x, i) => (
          <g key={i}>
            <polygon points={`${x},${100 + i * 10} ${x - 45},${240 + i * 5} ${x + 45},${240 + i * 5}`}
              fill="#14532d" opacity="0.8" />
            <polygon points={`${x},${140 + i * 10} ${x - 35},${260} ${x + 35},${260}`}
              fill="#15803d" opacity="0.7" />
            <line x1={x} y1={260} x2={x} y2={295} stroke="#78350f" strokeWidth="8" />
          </g>
        ))}
        {/* Mist layer */}
        <rect y="220" width="700" height="40" fill={theme.accentLight} opacity="0.08" />
        {/* Forest floor */}
        <path d="M0,270 Q350,260 700,270 L700,300 L0,300 Z" fill="#14532d" opacity="0.9" />
        {/* Fireflies */}
        {[...Array(15)].map((_, i) => (
          <circle key={i} cx={60 + i * 44} cy={160 + (i % 5) * 20} r={2.5}
            fill="#fef08a" opacity={0.4 + (i % 3) * 0.2} />
        ))}
      </>
    ),
    autumn: (
      <>
        <defs>
          <linearGradient id="autumnSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#450a0a" />
            <stop offset="60%" stopColor="#991b1b" />
            <stop offset="100%" stopColor={theme.accent} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#autumnSky)" />
        {/* Autumn trees */}
        {[80, 220, 380, 540, 650].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={295} x2={x} y2={120 + i * 15} stroke="#78350f" strokeWidth="10" />
            <circle cx={x} cy={95 + i * 15} r={80 - i * 8} fill={i % 2 === 0 ? '#dc2626' : '#ea580c'} opacity={0.8} />
            <circle cx={x - 35} cy={115 + i * 15} r={55} fill={i % 2 === 0 ? '#ea580c' : '#f97316'} opacity={0.7} />
            <circle cx={x + 40} cy={105 + i * 15} r={60} fill="#fbbf24" opacity={0.6} />
          </g>
        ))}
        {/* Falling leaves */}
        {[...Array(15)].map((_, i) => (
          <ellipse key={i} cx={40 + i * 44} cy={80 + (i % 6) * 35} rx={7} ry={4}
            fill={i % 3 === 0 ? '#dc2626' : i % 3 === 1 ? '#ea580c' : '#fbbf24'}
            opacity={0.8} transform={`rotate(${i * 25} ${40 + i * 44} ${80 + (i % 6) * 35})`} />
        ))}
        {/* Ground with leaves */}
        <path d="M0,270 Q350,260 700,270 L700,300 L0,300 Z" fill="#7c2d12" opacity="0.7" />
      </>
    ),
    mist: (
      <>
        <defs>
          <linearGradient id="mistSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#334155" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#mistSky)" />
        {/* Mist layers */}
        {[100, 140, 180, 220].map((y, i) => (
          <rect key={i} y={y} width="700" height="50"
            fill={`rgba(148,163,184,${0.04 + i * 0.03})`} />
        ))}
        {/* Silhouette hills */}
        <path d="M0,220 Q175,180 350,200 Q525,220 700,190 L700,300 L0,300 Z" fill="#1e293b" opacity="0.9" />
        {/* Leafless tree silhouettes */}
        {[120, 300, 480].map((x, i) => (
          <g key={i} opacity="0.7">
            <line x1={x} y1={300} x2={x} y2={80 + i * 20} stroke="#0f172a" strokeWidth="6" />
            {[[-30, 160], [25, 150], [-15, 120], [20, 110]].map(([dx, dy], j) => (
              <line key={j} x1={x} y1={dy} x2={x + dx} y2={dy - 30}
                stroke="#0f172a" strokeWidth={3 - j * 0.5} />
            ))}
          </g>
        ))}
        {/* Faint moon through mist */}
        <circle cx="400" cy="60" r="30" fill="#f8fafc" opacity="0.25" />
        <circle cx="400" cy="60" r="45" fill="#f8fafc" opacity="0.08" />
      </>
    ),
    snow: (
      <>
        <defs>
          <linearGradient id="snowSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0c1445" />
            <stop offset="50%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor={theme.accent} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#snowSky)" />
        {/* Snowflakes */}
        {[...Array(25)].map((_, i) => (
          <text key={i} x={`${i * 4}%`} y={`${(i % 8) * 12}%`}
            fontSize={8 + (i % 3) * 4} fill="white" opacity={0.3 + (i % 4) * 0.15}>
            ❄
          </text>
        ))}
        {/* Church/village silhouette */}
        <rect x="280" y="160" width="80" height="100" fill="#0c1445" />
        <polygon points="280,160 320,110 360,160" fill="#0f172a" />
        <line x1="320" y1="110" x2="320" y2="85" stroke="#475569" strokeWidth="4" />
        {/* Snowy ground */}
        <path d="M0,255 Q175,245 350,255 Q525,265 700,250 L700,300 L0,300 Z" fill="#bae6fd" opacity="0.7" />
        {/* Pine trees with snow */}
        {[70, 160, 490, 600].map((x, i) => (
          <g key={i}>
            <polygon points={`${x},${130 + i * 15} ${x - 35},${230} ${x + 35},${230}`} fill="#1e3a8a" />
            <polygon points={`${x},${100 + i * 15} ${x - 20},${165} ${x + 20},${165}`} fill="#bae6fd" opacity="0.7" />
          </g>
        ))}
        {/* Stars */}
        {[...Array(12)].map((_, i) => (
          <circle key={i} cx={`${i * 9}%`} cy={`${(i % 3) * 8}%`} r={1.5} fill="white" opacity={0.7} />
        ))}
      </>
    ),
  };

  return (
    <svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
      {svgContent[pattern] || svgContent['peaks']}
    </svg>
  );
}

interface HeroImageProps {
  currentDate: Date;
  direction: number;
}

export default function HeroImage({ currentDate, direction }: HeroImageProps) {
  const { theme } = useTheme();
  const monthIndex = currentDate.getMonth();
  const visual = MONTH_VISUALS[monthIndex % 12];

  return (
    <div className="relative w-full h-full min-h-[220px] overflow-hidden rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none">
      {/* Full SVG landscape */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={monthIndex}
          custom={direction}
          initial={{ x: direction * 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction * -120, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <LandscapeSVG monthIndex={monthIndex} />

          {/* Gradient overlay for readability */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, transparent 30%, rgba(15,23,42,0.7) 100%)`,
            }}
          />

          {/* Month label overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-1">
                  {visual.vibe}
                </p>
                <h2 className="text-4xl font-black tracking-tight text-white leading-none">
                  {format(currentDate, 'MMMM')}
                </h2>
                <p className="text-lg font-bold text-white/80 mt-0.5">
                  {format(currentDate, 'yyyy')}
                </p>
              </div>
              <span className="text-5xl opacity-80 select-none">{visual.emoji}</span>
            </div>
          </div>

          {/* Accent color stripe at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ backgroundColor: theme.accent }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Spiral binding decoration */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-black/40 backdrop-blur-sm flex items-center justify-center z-10">
        <div className="flex gap-3">
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full border-2 border-gray-400/60"
              style={{ backgroundColor: 'rgba(15,23,42,0.8)' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
