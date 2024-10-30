import { Consulting } from '@/data/consultingdata';
import {
  ChatBubbleLeftEllipsisIcon,
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { searchResult } from './SearchResult';

const ConsultingItem = ({ title, date, status }: Consulting) => {
  return (
    <div className='flex items-center justify-between p-3 border-b border-gray-200 overflow-hidden'>
      <div className='flex items-center w-full'>
        {status === '열람 가능' ? (
          <ChatBubbleLeftRightIcon className='w-6 h-6 text-gray-500 mr-3' />
        ) : (
          <ChatBubbleLeftEllipsisIcon className='w-6 h-6 text-gray-500 mr-3' />
        )}
        <div className='flex-1 overflow-hidden mr-2'>
          <p className='text-sm font-semibold text-gray-700 truncate'>
            {title}
          </p>
          <p className='text-xs text-gray-500 truncate'>{date}</p>
        </div>
      </div>
    </div>
  );
};

export default function ConsultingListCard() {
  const [lists, setLists] = useState<searchResult[]>([]);

  useEffect(() => {
    async function fetchSearchResults() {
      const response = await fetch('/api/searchResults');
      const data = await response.json();
      setLists(data.searchResults);
    }

    fetchSearchResults();
  }, []);

  return (
    <div className='bg-white shadow-lg rounded-lg'>
      <div className='flex justify-between border-b border-opacity-55 px-6 py-4'>
        <div className='text-slate-600 text-2xl font-semibold'>상담 내역</div>
        <Link href='/consultingList'>
          <ChevronRightIcon className='h-8 text-[#3F6886] hover:text-black' />
        </Link>
      </div>

      <div>
        {lists.length ? (
          lists
            .slice(0, 8)
            .map((item, index) => (
              <ConsultingItem
                key={index}
                title={item.title}
                date={item.date}
                status={item.status}
              />
            ))
        ) : (
          <div className='flex justify-center mt-10'>상담 내역이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
