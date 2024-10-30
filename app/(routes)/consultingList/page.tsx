'use client';

import SearchResult from '@/components/SearchResult';
import { RotateCcw, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ConsultingList() {
  const [categories, setCategories] = useState<string[]>([]);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const dateStartRef = useRef<HTMLInputElement>(null);
  const dateEndRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data.categories);
    }

    fetchCategories();
  }, []);

  return (
    <div className='mx-32 mt-10'>
      <div className='text-4xl font-bold'>상담 내역 리스트</div>
      <div className='my-1 text-gray-600'>
        하나은행만의 전문 PB와 상담한 내역을 확인하실 수 있습니다.
      </div>
      <form className='mt-10 p-5 border border-black bg-[#D6E8F6] rounded-lg w-full'>
        <div className='flex w-full items-center gap-2 my-2'>
          <p className='w-32 text-center font-semibold'>검색</p>
          <div className='flex w-full justify-between mr-1 items-center'>
            <input
              type='text'
              className='border border-black bg-white rounded-lg w-full p-1'
              placeholder='검색 키워드를 입력해주세요.'
            />
            <button className='border border-black p-1 rounded-lg bg-gray-300 hover:bg-gray-400 hover:text-white ml-2'>
              <Search />
            </button>
          </div>
        </div>
        <div className='flex w-full items-center gap-2 my-2'>
          <p className='w-32 text-center font-semibold'>카테고리</p>
          <div className='flex w-full mr-1 items-center '>
            <select
              ref={categoryRef}
              defaultValue='전체'
              className='border bg-white rounded-lg p-1.5 border-black w-40'
            >
              <option value='전체'>전체</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className='flex w-full items-center gap-2 justify-end'>
              <p className='text-center font-semibold mx-2 w-auto'>날짜 설정</p>
              <div className='flex flex-wrap border bg-white rounded-lg p-1 gap-3 border-black'>
                <input ref={dateStartRef} type='date' className='' />
                <input ref={dateEndRef} type='date' className='' />
              </div>
              <button className='border border-black p-1 rounded-lg bg-gray-300 hover:bg-gray-400 hover:text-white'>
                <RotateCcw />
              </button>
            </div>
          </div>
        </div>
        <SearchResult />
      </form>
    </div>
  );
}
