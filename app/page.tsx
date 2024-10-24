'use client';

import Image from 'next/image';
import banner from '../assets/home_banner.png';
import pb_profile from '../assets/pb_profile.png';

export default function Home() {
  return (
    <div className='flex justify-center items-center mx-auto p-10'>
      <div className='bg-sky-50 rounded-2xl'>
        <Image src={banner} alt='' className='w-full' />

        <div className='grid grid-cols-3 gap-3 p-5'>
          <div className='grid grid-cols-1 gap-3'>
            {/* 담당 PB Section */}
            <div className='bg-white shadow-lg rounded-lg p-6'>
              <h2 className='text-slate-600 text-2xl font-semibold'>담당 PB</h2>
              <div className='flex items-center space-x-4'>
                <Image
                  src={pb_profile}
                  alt='Profile'
                  className='w-16 h-16 rounded-full'
                />
                <div>
                  <h2 className='text-lg font-semibold'>안유진 PB</h2>
                  <span className='text-sm text-gray-600'>전문 상담사</span>
                  <span className='text-sm text-gray-600'>부동산 전문가</span>
                </div>
              </div>
            </div>

            {/* 상담 예약 Section */}
            <div className='bg-white shadow-lg rounded-lg p-6'>
              <h2 className='w-32 h-8 text-slate-600 text-2xl font-semibold'>
                상담 예약
              </h2>
              <div className='text-stone-900 text-xl font-normal'>
                지체 없는 맞춤 예약 서비스
              </div>
              <div className='text-black/60 text-xs font-normal'>
                하나은행만의 전문 PB와 1대 1 상담을 언제든 신청할 수 있습니다.
              </div>
            </div>
          </div>

          {/* 상담 일정 Section */}
          <div className='bg-white shadow-lg rounded-lg p-6'>
            <h2 className='w-32 h-8 text-slate-600 text-2xl font-semibold'>
              상담 일정
            </h2>
            <ul className='space-y-3'>
              <li className='flex flex-col space-x-3'>
                <span className='text-sm text-gray-700'>
                  2024/10/22 16:30 건물 매각 건에 대해서 상담 요청
                </span>
              </li>
            </ul>
          </div>

          {/* 상담 내역 Section */}
          <div className='bg-white shadow-lg rounded-lg p-6'>
            <h2 className='w-32 h-8 text-slate-600 text-2xl font-semibold'>
              상담 내역
            </h2>
            <ul className='space-y-3'>
              <li className='flex items-center space-x-3'>
                <span className='text-sm text-gray-700'>
                  2024/10/22 16:30 건물 매각 건에 대해서 상담 요청
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
