// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800']
});

export const metadata = {
  title: 'Sistem Inventaris',
  description: 'Aplikasi Sistem Inventaris Perlengkapan Jalan Tol',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className={jakarta.className}>{children}
      </body>
    </html>
  );
}