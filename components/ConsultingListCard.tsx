import { formatDate } from '@/utils/date';
import { type Consulting } from '@/utils/type';
import {
  ChatBubbleLeftEllipsisIcon,
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ConsultingItem = ({ title, date, status }: Consulting) => {
  return (
    <div className='flex items-center justify-between p-3 border-b border-gray-200 overflow-hidden'>
      <div className='flex items-center w-full'>
        {status === true ? (
          <ChatBubbleLeftRightIcon className='w-6 h-6 text-gray-500 mr-3' />
        ) : (
          <ChatBubbleLeftEllipsisIcon className='w-6 h-6 text-gray-500 mr-3' />
        )}
        <div className='flex-1 overflow-hidden mr-2'>
          <p className='text-sm font-semibold text-gray-700 truncate'>
            {title}
          </p>
          <p className='text-xs text-gray-500 truncate'>{formatDate(date)}</p>
        </div>
      </div>
    </div>
  );
};

export default function ConsultingListCard() {
  const [lists, setLists] = useState<Consulting[]>([]);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await fetch('http://localhost:8080/vip/journals');
        const data: Consulting[] = await response.json();
        setLists(data);
      } catch (error) {
        console.error('Error fetching jounals:', error);
      }
    };

    fetchJournals();
  }, []);

  return (
    <div className='bg-white shadow-lg rounded-lg'>
      <Link href='/consultingList'>
        <div className='flex justify-between border-b border-opacity-55 px-6 py-4 hover:bg-gray-100'>
          <div className='text-slate-600 text-2xl font-semibold'>상담 내역</div>
          <ChevronRightIcon className='h-8 text-[#3F6886]' />
        </div>
      </Link>

      <div className='h-72 overflow-y-scroll'>
        {lists.map((item) => (
          <ConsultingItem
            key={item.id}
            id={item.id}
            title={item.title}
            date={item.date}
            status={item.status}
          />
        ))}
      </div>
    </div>
  );
}
