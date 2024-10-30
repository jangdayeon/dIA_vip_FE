import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import reserveIcon from '../assets/market_validation_icon.png';

export default function ReserveCard() {
  return (
    <div className='bg-white shadow-lg rounded-lg'>
      <Link href='/reserve'>
        <div className='flex justify-between border-b border-opacity-55 px-6 py-4 hover:bg-gray-100'>
          <h2 className='text-slate-600 text-2xl font-semibold'>상담 예약</h2>
          <ChevronRightIcon className='h-8 text-[#3F6886]' />
        </div>
      </Link>

      <div className='flex px-6'>
        <div className='mt-4 space-y-2'>
          <div className='text-stone-900 text-xl font-normal'>
            맞춤 예약 서비스
          </div>
          <div className='text-black/60 text-xs font-normal'>
            하나은행만의 전문 PB와 1대 1 상담을 언제든 신청할 수 있습니다.
          </div>
        </div>
        <Image
          src={reserveIcon}
          alt='reserve icon'
          className='w-36 h-36 rotate-6'
        />
      </div>
    </div>
  );
}
