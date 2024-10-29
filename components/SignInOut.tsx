'use client';

import { getSession, mySignOut } from '@/actions/myauth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SignInOut({
  isLogin,
}: {
  isLogin: () => Promise<string>;
}) {
  const [id, setId] = useState('');

  const router = useRouter();
  useEffect(() => {
    (async function () {
      const ss = await getSession();
      setId(ss?.user?.email || '');
    })();
  }, [isLogin]);

  if (id)
    return (
      <>
        <div className='flex font-bold gap-2'>
          <Link href='/reserve' className='hover:underline '>
            상담 예약
          </Link>
          <Link href='/consultingList' className='hover:underline '>
            상담 내역
          </Link>
        </div>
        <button
          onClick={async () => {
            localStorage.removeItem(id);
            await mySignOut();
            router.replace('/signin');
          }}
          className='text-center text-[#525463] border h-10 bg-[#858899]/20 px-4 py-2 my-4 mx-7 rounded-lg'
        >
          로그아웃
        </button>
      </>
    );

  return (
    <Link href='/signin'>
      <button className='text-center text-[#525463] border h-10 bg-[#858899]/20 px-4 py-2 my-4 mx-7 rounded-lg'>
        로그인
      </button>
    </Link>
  );
}
