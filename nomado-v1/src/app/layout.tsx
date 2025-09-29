import './globals.css';
import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeWrapper } from '@/components/ThemeWrapper';

export const metadata: Metadata = { title: 'App' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body suppressHydrationWarning={true}>
        <AppRouterCacheProvider options={{ enableCssLayer: false }}>
          <ThemeWrapper>
            {children}
          </ThemeWrapper>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}