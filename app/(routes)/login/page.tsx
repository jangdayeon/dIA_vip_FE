'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useRef } from 'react';

function SignInCard() {
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function loginCheck(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const id = idRef.current?.value;
    const pw = pwRef.current?.value;
    console.log(id, pw);
    if (!id) {
      alert('아이디를 입력해주세요.');
      return;
    }
    if (!pw) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    //TODO: 로그인 관련 처리
    router.push('/');
  }

  return (
    <div className='flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-10/12 md:w-8/12 lg:w-2/5 items-center'>
      <div className='flex flex-col p-10'>
        <div className='border-b border-gray-400 mb-8 w-full pb-8'>
          <h1 className='text-3xl font-extrabold mb-3'>로그인</h1>
          <p className='text-lg font-medium'>
            로그인을 통해 VIP만을 위한 간편한 비대면 PB 상담을 경험해 보세요!
          </p>
        </div>
        <form onSubmit={loginCheck}>
          <div className='flex flex-row w-full mb-5 border border-gray-400 rounded-lg focus-within:#F2F9FF focus-within:ring-2 focus-within:#F2F9FF'>
            <div className='flex items-center pl-3'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='size-7'
              >
                <path
                  fillRule='evenodd'
                  d='M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <input
              ref={idRef}
              placeholder='아이디를 입력하세요.'
              className='  w-full h-16 p-3 text-lg font-medium focus:outline-none'
            />
          </div>

          <div className='flex flex-row w-full mb-5 border border-gray-400 rounded-lg focus-within:#F2F9FF focus-within:ring-2 focus-within:#F2F9FF'>
            <div className='flex items-center pl-3'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='size-7'
              >
                <path
                  fillRule='evenodd'
                  d='M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <input
              ref={pwRef}
              placeholder='비밀번호를 입력하세요.'
              className='w-full h-16 p-3 text-lg font-medium focus:outline-none border-0'
            />
          </div>

          <button
            type='submit'
            className='bg-[#F2F9FF] w-full h-16 rounded-lg text-lg font-medium hover:opacity-80 mb-5 border border-[#B4B4B4] shadow-[2px_2px_0px_rgba(0,0,0,0.25)]'
          >
            로그인
          </button>
        </form>

        <Link href='/signin'>
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

export default SignInCard;
