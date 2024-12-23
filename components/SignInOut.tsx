'use client';

import { getSession, mySignOut } from '@/actions/myauth';
import Button from '@/stories/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Notification from './Notification';

export default function SignInOut({
  isLogin,
}: {
  isLogin: () => Promise<string>;
}) {
  const [id, setId] = useState('');
  const router = useRouter();

  // 로그인 상태 확인
  useEffect(() => {
    (async function () {
      const ss = await getSession();
      setId(ss?.user?.email || '');
    })();
  }, [isLogin]);

  // 로그아웃 처리
  async function logout() {
    try {
      // Spring 서버에 로그아웃 요청
      const backendRes = await fetch('http://localhost:8080/vip/logout', {
        method: 'POST',
        credentials: 'include', // JSESSIONID 포함
      });

      console.log('🚀 ~ logout ~ backendRes:', backendRes);

      if (!backendRes.ok) {
        console.error('Spring signout failed');
        throw new Error('Backend signout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('로그아웃에 실패했습니다.');
    }
  }

  if (id)
    return (
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row font-bold gap-5 items-center'>
          <Link href='/reserve' className='hover:text-[#3F6886] '>
            상담 예약
          </Link>
          <Link href='/consultingList' className='hover:text-[#3F6886] '>
            상담 내역
          </Link>
          <Notification />
        </div>
        <Button
          onClick={async () => {
            try {
              // 로컬스토리지에서 dIA_VIP 삭제
              localStorage.removeItem('dIA_VIP');
              // Spring 로그아웃 요청
              await logout();
              // NextAuth 로그아웃
              await mySignOut();
              // 페이지 새로고침
              router.refresh();
            } catch (error) {
              console.error('Error during logout process:', error);
            }
          }}
          className='h-10 px-4 py-2 my-4 mx-7 bg-gray-300 hover:bg-gray-400 hover:text-white'
          text='로그아웃'
          type='button'
        />
      </div>
    );

  return (
    <Link href='/signin'>
      <Button
        text='로그인'
        className='h-10 px-4 py-2 my-4 mx-7 bg-gray-300 hover:bg-gray-400 hover:text-white'
        type='button'
      />
    </Link>
  );
}
