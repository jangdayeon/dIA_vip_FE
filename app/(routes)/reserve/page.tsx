'use client';

import { useEffect, useState } from 'react';

export type reserve = {
  title: string;
  category: string;
  date: string;
  detail: string;
};

export default function Reserve() {
  const [categories, setCategories] = useState<string[]>([]);

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
      <div className='text-4xl font-bold'>상담 예약</div>
      <div className='my-1 text-gray-600'>
        하나은행만의 전문 PB와 1대 1 상담을 언제든 신청할 수 있습니다.
      </div>
      <div className='bg-[#F2F9FF] rounded-lg drop-shadow-md px-24 py-16'>
        <form action=''>
          <div className='flex justify-between items-center my-2'>
            <div className='flex gap-2 items-center ml-3'>
              <label htmlFor='' className='font-semibold'>
                카테고리
              </label>
              <select className='border bg-white rounded-lg p-1 border-black w-80'>
                <option value='' disabled selected>
                  카테고리를 선택하세요.
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex gap-2 items-center'>
              <p className='font-semibold'>PB</p>
              <p className='border bg-white border-black rounded-lg px-8 py-1'>
                안유진
              </p>
            </div>
          </div>
          <div className='flex justify-between items-center my-2'>
            <div className='flex gap-2 items-center ml-3'>
              <label htmlFor='' className='font-semibold'>
                희망일시
              </label>
              <input
                type='datetime-local'
                className='border bg-white rounded-lg p-1 border-black w-80'
              />
            </div>
            <div className='flex gap-2 items-center'>
              <p className='font-semibold'>고객명</p>
              <p className='border bg-white border-black rounded-lg px-8 py-1'>
                김현수
              </p>
            </div>
          </div>
          <div className='flex gap-3 items-center w-full my-2'>
            <label htmlFor='' className='w-20 text-right font-semibold'>
              제목
            </label>
            <input
              type='text'
              className='border bg-white rounded-lg p-1 border-black w-full'
            />
          </div>
          <div className='flex gap-3 items-center w-full my-2'>
            <label htmlFor='' className='w-20 text-right font-semibold'>
              내용
            </label>
            <textarea
              rows={20}
              className='border bg-white rounded-lg p-1 border-black w-full overflow-y-auto'
            />
          </div>
          <div className='flex gap-3 items-center w-full my-2'>
            <label htmlFor='' className='w-20 text-right font-semibold'>
              첨부파일
            </label>
            <input
              type='file'
              className='border bg-white rounded-lg p-1 border-black w-full'
              multiple
            />
          </div>
          <div className='flex justify-end'>
            <button className='border border-black bg-slate-300 p-2 rounded-lg'>
              예약하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
