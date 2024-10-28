'use client';

import LoginedMain from '@/components/LoginedMain';
import NotLoginedMain from '@/components/NotLoginedMain';

export default function Home() {
  //TODO: 로그인 연결 후 처리 필요
  const logined = true;
  return <>{logined ? <LoginedMain /> : <NotLoginedMain />}</>;
}
