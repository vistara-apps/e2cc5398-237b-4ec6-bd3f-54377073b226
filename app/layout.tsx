import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IdeaSpark - Shake for Startup Ideas',
  description: 'Shake your phone for your next big startup idea. AI-powered idea generation and validation.',
  keywords: ['startup', 'ideas', 'entrepreneur', 'AI', 'validation'],
  authors: [{ name: 'IdeaSpark Team' }],
  openGraph: {
    title: 'IdeaSpark - Shake for Startup Ideas',
    description: 'Shake your phone for your next big startup idea. AI-powered idea generation and validation.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IdeaSpark - Shake for Startup Ideas',
    description: 'Shake your phone for your next big startup idea. AI-powered idea generation and validation.',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <Providers>
            {children}
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
