import { Consulting, consultingData } from '@/data/consultingdata';
import {
  ChatBubbleLeftEllipsisIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const ConsultingItem = ({ title, date }: Consulting) => {
  return (
    <div className='flex items-center justify-between p-3 border-b border-gray-200'>
      <div className='flex items-center'>
        <ChatBubbleLeftEllipsisIcon className='w-6 h-6 text-gray-500 mr-3' />
        <div>
          <p className='text-sm font-semibold text-gray-700'>{title}</p>
          <p className='text-xs text-gray-500'>{date}</p>
        </div>
      </div>
    </div>
  );
};

export default function ConsultingListCard() {
  return (
    <div className='bg-white shadow-lg rounded-lg'>
      <div className='flex justify-between border-b border-opacity-55 px-6 py-4'>
        <div className='text-slate-600 text-2xl font-semibold'>상담 내역</div>
        <Link href='/consultingList'>
          <ChevronRightIcon className='h-8 text-[#3F6886] hover:text-black' />
        </Link>
      </div>

      <div className='h-screen overflow-y-scroll'>
        {consultingData.map((item, index) => (
          <ConsultingItem key={index} title={item.title} date={item.date} />
        ))}
      </div>
    </div>
  );
}
