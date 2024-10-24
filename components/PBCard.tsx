import Image from 'next/image';
import pb_profile from '../assets/pb_profile.png';

export default function PBCard() {
  return (
    <div className='bg-white shadow-lg rounded-lg p-6'>
      <h2 className='text-slate-600 text-2xl font-semibold'>담당 PB</h2>
      <div className='flex items-center space-x-4'>
        <Image
          src={pb_profile}
          alt='PB profile'
          className='w-16 h-16 rounded-full'
        />
        <div>
          <h2 className='text-lg font-semibold'>안유진 PB</h2>
          <div className='space-x-2 mt-1'>
            <span className='px-2 py-1 bg-blue-100 rounded-lg text-sm text-gray-600'>
              #부동산
            </span>
            <span className='px-2 py-1 bg-blue-100 rounded-lg text-sm text-gray-600'>
              #성수점
            </span>
            <span className='px-2 py-1 bg-blue-100 rounded-lg text-sm text-gray-600'>
              #친절
            </span>
          </div>
          <p className='text-sm text-gray-500 mt-2'>
            안녕하세요. 부동산 투자 전문 PB 안유진입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
