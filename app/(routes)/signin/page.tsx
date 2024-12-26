'use client';

import { authenticate } from '@/actions/myauth';
import Button from '@/stories/Button';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function SigninCard() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/vip/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // JSESSIONID 포함
          body: JSON.stringify({ id, pw }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Invalid credentials');
      }

      // 인증 처리
      const formData = new FormData();
      formData.append('id', id);
      formData.append('pw', pw);

      const result = await authenticate(formData);

      if (result.error) {
        setErrorMsg(result.error);
      } else if (result.redirectUrl) {
        router.replace(result.redirectUrl);
      }
    } catch (error) {
      setErrorMsg('로그인에 실패했습니다. 다시 시도해 주세요.');
      console.error('🚀 ~ handleSubmit error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center p-36'>
      <div className='w-2/5'>
        <div className='border-b border-gray-400 mb-8 w-full pb-8'>
          <h1 className='text-3xl font-extrabold mb-3'>로그인</h1>
          <p className='text-lg font-medium'>
            로그인을 통해 VIP만을 위한 간편한 비대면 PB 상담을 경험해 보세요!
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-row items-center w-full mb-5 border border-gray-400 rounded-lg focus-within:bg-[#F2F9FF] focus-within:ring-2 focus-within:ring-[#F2F9FF]'>
            <UserIcon className='pl-3 h-8' />
            <input
              name='id'
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder='아이디를 입력하세요.'
              className='w-full rounded-lg h-16 p-3 text-lg font-medium focus:outline-none focus-within:bg-inherit'
            />
          </div>

          <div className='flex flex-row items-center w-full mb-5 border border-gray-400 rounded-lg focus-within:bg-[#F2F9FF] focus-within:ring-2 focus-within:ring-[#F2F9FF]'>
            <LockClosedIcon className='pl-3 h-8' />
            <input
              type='password'
              name='pw'
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder='비밀번호를 입력하세요.'
              className='w-full h-16 rounded-lg p-3 text-lg font-medium focus:outline-none focus-within:bg-inherit'
            />
          </div>

          {errorMsg && <div className='text-red-600 mb-3'>{errorMsg}</div>}
          <LoginButton isLoading={isLoading} />
        </form>

        <Link href='/signup'>
          <div className='flex justify-end w-full'>
            <p className='text-lg font-medium underline cursor-pointer'>
              회원가입
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

// 로그인 버튼 컴포넌트
function LoginButton({ isLoading }: { isLoading: boolean }) {
  return (
    <Button
      type='submit'
      className='bg-[#F2F9FF] w-full h-16 rounded-lg text-lg font-medium hover:opacity-80 mb-5 border border-[#B4B4B4] shadow-[2px_2px_0px_rgba(0,0,0,0.25)]'
      disabled={isLoading}
      text={isLoading ? '로그인 중...' : '로그인'}
    />
  );
}

export default SigninCard;
