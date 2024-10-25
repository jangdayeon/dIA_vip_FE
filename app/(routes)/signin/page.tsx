'use client';

import { LockClosedIcon, UserIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useRef } from 'react';

function SigninCard() {
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
          <div className='flex flex-row items-center w-full mb-5 border border-gray-400 rounded-lg focus-within:#F2F9FF focus-within:ring-2 focus-within:#F2F9FF opac'>
            <UserIcon className='pl-3 h-8' />
            <input
              ref={idRef}
              placeholder='아이디를 입력하세요.'
              className='  w-full h-16 p-3 text-lg font-medium focus:outline-none'
            />
          </div>

          <div className='flex flex-row items-center w-full mb-5 border border-gray-400 rounded-lg focus-within:#F2F9FF focus-within:ring-2 focus-within:#F2F9FF opac'>
            <LockClosedIcon className='pl-3 h-8' />
            <input
              ref={pwRef}
              placeholder='비밀번호를 입력하세요.'
              className='  w-full h-16 p-3 text-lg font-medium focus:outline-none'
            />
          </div>

          <button
            type='submit'
            className='bg-[#F2F9FF] w-full h-16 rounded-lg text-lg font-medium hover:opacity-80 mb-5 border border-[#B4B4B4] shadow-[2px_2px_0px_rgba(0,0,0,0.25)]'
          >
            로그인
          </button>
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

export default SigninCard;
