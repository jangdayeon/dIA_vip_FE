// import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { CalendarPlus, PhoneCall, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ReserveCard() {
  return (
    <div className='bg-white shadow-lg rounded-lg'>
      <Link href='/reserve'>
        <div className='flex justify-between border-b border-opacity-55 px-6 py-4 hover:bg-gray-100'>
          <h2 className='text-slate-600 text-2xl font-semibold'>상담 예약</h2>
        </div>
      </Link>

      <div className='p-6 space-y-2'>
        <div className='flex justify-between items-center border border-blue-100 text-gray-700 hover:bg-blue-200 p-2 rounded-lg font-semibold'>
          <div className='flex items-center space-x-2'>
            <PhoneCall />
            <div>
              <div>빠른 상담</div>
              <div className='text-black/60 text-xs font-normal'>
                담당 PB가 상담 가능할 경우, 바로 상담을 신청하여 간단한 용무를
                처리할 수 있습니다.
              </div>
            </div>
          </div>
          <ChevronRight className='text-[#3F6886]' />
        </div>

        <div className='flex justify-between items-center border border-blue-100 text-gray-700 hover:bg-blue-200 p-2 rounded-lg font-semibold'>
          <div className='flex items-center space-x-2'>
            <CalendarPlus />
            <div>
              <div>자세한 상담</div>
              <div className='text-black/60 text-xs font-normal'>
                하나은행만의 전문 PB와 1대 1 심층 상담을 언제든 예약할 수
                있습니다.
              </div>
            </div>
          </div>
          <ChevronRight className='text-[#3F6886]' />
        </div>
      </div>
    </div>
  );
}
