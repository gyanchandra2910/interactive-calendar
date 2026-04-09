import Calendar from './components/Calendar';

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10 lg:py-16"
      style={{
        background:
          'radial-gradient(ellipse 120% 80% at 50% 0%, rgba(37,99,235,0.12) 0%, transparent 60%), #0f172a',
      }}
    >
      {/* Page headline */}
      <div className="text-center mb-8 lg:mb-10">
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-white/30 mb-2">
          Interactive Wall Calendar
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
          Plan Your Days{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
            }}
          >
            Beautifully
          </span>
        </h1>
        <p className="text-sm text-white/40 mt-2 max-w-xs mx-auto">
          Select date ranges, capture notes, and switch between stunning monthly themes
        </p>
      </div>

      {/* Calendar */}
      <div className="w-full max-w-5xl">
        <Calendar />
      </div>

      {/* Feature chips */}
      <div className="flex flex-wrap gap-2 justify-center mt-6">
        {[
          '📅 Day Range Selection',
          '📝 Integrated Notes',
          '💾 Auto-Saved',
          '🎨 Dynamic Themes',
          '✨ Framer Motion',
          '📱 Fully Responsive',
        ].map((chip) => (
          <span
            key={chip}
            className="text-xs font-semibold px-3 py-1.5 rounded-full text-white/60"
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {chip}
          </span>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-xs text-white/20">
        <p>Built with Next.js · Tailwind CSS · Framer Motion · date-fns</p>
        <p className="mt-1">Notes are saved automatically to your browser&apos;s localStorage</p>
      </footer>
    </main>
  );
}
