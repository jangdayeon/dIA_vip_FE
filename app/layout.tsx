import { mySignOut, getSession } from '@/actions/myauth';
import Nav from '@/components/Nav';
import { DataProvider } from '@/hooks/useData';
import { SessionProvider } from 'next-auth/react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { auth } from '@/lib/auth';
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const signOut = async () => {
    'use server';
    await mySignOut();
  };

  return (
    <html lang='ko'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <DataProvider getSession={getSession} signOut={signOut}>
            <div className='wrap-container'>
              <header>
                <Nav />
              </header>
              {children}
            </div>
            <footer className='font-bold text-center border'>
              &copy; 2024 diA All rights reserved.
            </footer>
          </DataProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
