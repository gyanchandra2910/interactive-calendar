import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Interactive Wall Calendar — Date Picker & Notes',
  description:
    'A stunning interactive wall calendar featuring day-range selection, integrated notes, month-based dynamic color themes, and smooth Framer Motion transitions. Built with Next.js, Tailwind CSS, and date-fns.',
  keywords: ['calendar', 'date picker', 'notes', 'nextjs', 'wall calendar', 'interactive'],
  openGraph: {
    title: 'Interactive Wall Calendar',
    description: 'Select date ranges, add notes, and enjoy beautiful month themes.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0f172a] font-[Inter,Outfit,sans-serif] antialiased">
        {children}
      </body>
    </html>
  );
}
