'use client';

import CalendarPopup from '@/components/CalendarPopup';
import SearchResult from '@/components/SearchResult';
import { RotateCcw, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ConsultingList() {
  const [categories, setCategories] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const categoryRef = useRef<HTMLSelectElement>(null);
  const minDate = new Date(2000, 1, 1);

  const handleStartDateSet = (value: Date | null) => {
    setStartDate(value);
  };

  const handleEndDateSet = (value: Date | null) => {
    setEndDate(value);
  };

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
      <div className='mt-10 p-5 border border-black bg-[#D6E8F6] rounded-lg'>
        <div className='flex justify-between items-center gap-2 my-2'>
          <label className='w-32 text-center font-semibold'>검색</label>
          <div className='w-full flex items-center'>
            <input
              type='text'
              className='border border-black bg-white rounded-lg p-1 w-full'
              placeholder='검색 키워드를 입력해주세요.'
            />
            <button className='border border-black p-1 rounded-lg bg-gray-300 hover:bg-gray-400 hover:text-white ml-2'>
              <Search />
            </button>
          </div>
        </div>
        <div className='flex justify-between items-center gap-2 my-2'>
          <div className='flex flex-wrap items-center gap-2'>
            <label className='w-28 text-center font-semibold'>카테고리</label>
            <select
              ref={categoryRef}
              defaultValue='전체'
              className='border bg-white rounded-lg p-1.5 border-black'
            >
              <option value='전체'>전체</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            <label className='text-center font-semibold'>시작일</label>
            <CalendarPopup
              dateSet={handleStartDateSet}
              minDate={minDate}
              maxDate={endDate ? endDate : new Date()}
            />
            <label className='text-center font-semibold'>종료일</label>
            <CalendarPopup
              dateSet={handleEndDateSet}
              minDate={startDate ? startDate : minDate}
              maxDate={new Date()}
            />
            <button className='border border-black p-1 rounded-lg bg-gray-300 hover:bg-gray-400 hover:text-white'>
              <RotateCcw />
            </button>
          </div>
        </div>
        <SearchResult />
      </div>
    </div>
  );
}
