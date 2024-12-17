'use client';

import CalendarPopup from '@/components/CalendarPopup';
import Button from '@/stories/Button';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const times = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
];

export type reserve = {
  title: string;
  category: string;
  date: string;
  time: string;
  detail: string;
};

export type Category = {
  id: number;
  name: string;
};

export default function Reserve() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [pbName, setPbName] = useState<string>('');
  const [vipName, setVipName] = useState<string>('');
  const [childDate, setchildDate] = useState<Date | null>(new Date());
  const titleRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const timeRef = useRef<HTMLSelectElement>(null);
  const detailRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const minDate = new Date();
  const maxDate = new Date(minDate);
  maxDate.setDate(maxDate.getDate() + 30);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (confirm('예약하시겠습니까?')) {
      if (!childDate) return;

      const reserveData = {
        title: titleRef.current?.value || '',
        categoryId: categoryRef.current?.value || '',
        date: childDate?.toISOString().split('T')[0],
        time: timeRef.current?.value || '',
        content: detailRef.current?.value || '',
      };
      console.log(reserveData);

      try {
        const response = await fetch('http://localhost:8080/vip/reserves', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reserveData),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('예약 성공:', responseData);

          alert('예약이 성공적으로 등록되었습니다.');
          router.push('/confirm');
        } else {
          const errorData = await response.json();
          alert(`예약 실패: ${errorData.message}`);
        }
      } catch (error) {
        console.error('예약 요청 중 오류 발생:', error);
        alert('예약 요청 중 문제가 발생했습니다.');
      }
    }
  };

  const handleDateSet = (value: Date | null) => {
    setchildDate(value);
  };

  useEffect(() => {
    fetchCategories();
    fetchReserveInfo();
  }, []);

  async function fetchCategories() {
    try {
      const response = await fetch('http://localhost:8080/vip/categories');
      const data: Category[] = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  async function fetchReserveInfo() {
    try {
      const response = await fetch('http://localhost:8080/vip/reserves/info');
      const data = await response.json();
      setPbName(data.pbName);
      console.log(data.pbName);
      setVipName(data.vipName);
    } catch (error) {
      console.error('Error fetching reserve info:', error);
    }
  }
  return (
    <div className='flex justify-center items-center mb-10 mt-5'>
      <div className='mx-32 mt-10 w-3/5'>
        <div className='text-4xl font-bold'>상담 예약</div>
        <div className='my-1 text-gray-600'>
          하나은행만의 전문 PB와 1대 1 상담을 언제든 신청할 수 있습니다.
        </div>
        <div className='bg-[#D6E8F6] rounded-lg drop-shadow-md px-24 py-16 mt-10'>
          <form onSubmit={handleSubmit}>
            <div className='flex justify-between items-center my-2'>
              <div className='flex flex-wrap gap-2 items-center'>
                <label className='w-20 text-right font-semibold'>
                  카테고리
                </label>
                <select
                  required
                  ref={categoryRef}
                  defaultValue=''
                  className='bg-white rounded-lg p-1.5 focus:outline-none focus:outline-sky-50'
                >
                  <option value='' disabled>
                    카테고리를 선택하세요.
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex gap-2 items-center'>
                <p className='font-semibold'>PB</p>
                <p className='bg-white rounded-lg px-5 py-1.5'>
                  {pbName || 'PB명'}
                </p>
              </div>
            </div>
            <div className='flex justify-between items-center my-2'>
              <div className='flex flex-wrap gap-2 items-center'>
                <label className='w-20 text-right font-semibold'>
                  희망일시
                </label>
                <CalendarPopup
                  dateSet={handleDateSet}
                  minDate={minDate}
                  maxDate={maxDate}
                  selectedDate={childDate}
                />
                <select
                  required
                  ref={timeRef}
                  defaultValue=''
                  className='flex justify-center gap-1 items-center bg-white rounded-lg py-1.5 pr-2 ml-2 w-36 text-center focus:outline-none focus:outline-sky-50'
                >
                  <option value='' disabled>
                    00 : 00
                  </option>
                  {times.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex gap-2 items-center'>
                <p className='font-semibold'>고객명</p>
                <p className='bg-white rounded-lg px-5 py-1.5'>
                  {vipName || '고객명'}
                </p>
              </div>
            </div>
            <div className='flex gap-4 items-center w-full my-2'>
              <label className='w-20 text-right font-semibold'>제목</label>
              <input
                required
                maxLength={50}
                ref={titleRef}
                type='text'
                className='bg-white rounded-lg p-1.5 w-full focus:outline-none focus:outline-sky-50'
              />
            </div>
            <div className='flex gap-4 items-center w-full my-2'>
              <label className='w-20 text-right font-semibold'>내용</label>
              <textarea
                required
                ref={detailRef}
                rows={10}
                maxLength={300}
                className='bg-white rounded-lg p-1.5 w-full overflow-y-auto resize-none focus:outline-none focus:outline-sky-50'
              />
            </div>
            <div className='flex justify-end'>
              <Button
                type='submit'
                text='예약하기'
                className='bg-gray-300 hover:bg-gray-400 hover:text-white'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
