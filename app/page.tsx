'use client';

import PBCard from '@/components/PBCard';
import ReserveCard from '@/components/ReserveCard';
import Image from 'next/image';
import banner from '../assets/home_banner.png';

export default function Home() {
  return (
    <div className='flex justify-center items-center mx-auto p-10'>
      <div className='bg-sky-50 rounded-2xl'>
        <Image src={banner} alt='' className='w-full' />

        <div className='grid grid-cols-3 gap-3 p-5'>
          <div className='grid grid-cols-1 gap-3'>
            <PBCard />
            <ReserveCard />
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
