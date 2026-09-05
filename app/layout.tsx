import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ProjectProvider } from '@/lib/context/ProjectContext';
import { GlobalNav } from '@/components/layout/GlobalNav';
import { SubNavFrosted } from '@/components/layout/SubNavFrosted';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'ProjectMentor AI — Final-Year Engineering Project Architect & Mentor',
  description:
    'An AI decision engine that converts student skills, interests, and timelines into production-ready project blueprints, architectures, roadmaps, and viva defense strategies.',
  keywords: [
    'PromptWars',
    'Parul University',
    'AI Project Generator',
    'Final Year Project',
    'Engineering Mentor',
    'Next.js 15',
    'Gemini AI',
  ],
  authors: [{ name: 'PromptWars Engineering Team' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#1d1d1f]">
        <ProjectProvider>
          <GlobalNav />
          <SubNavFrosted />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </ProjectProvider>
      </body>
    </html>
  );
}
