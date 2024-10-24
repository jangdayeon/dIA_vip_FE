import Nav from '@/components/Nav';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'dIA VIP',
  description:
    '하나금융그룹의 VIP 손님을 위한 180°달라질 PB (Private Banker) 상담 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <Nav />
        </header>

        {children}
        <footer className='font-bold text-center border'>
          &copy; 2024 디지털 하나로 프로젝트
        </footer>
      </body>
    </html>
  );
}
