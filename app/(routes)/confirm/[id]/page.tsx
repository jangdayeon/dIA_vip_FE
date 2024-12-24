'use client';

import useFetch from '@/hooks/useFetch';
import Button from '@/stories/Button';
import { formatDate } from '@/utils/date';
import { type Reservation } from '@/utils/type';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Confirm() {
  const router = useRouter();
  const { id } = useParams();
  const [confirm, setConfirmation] = useState<Reservation | null>(null);

  const { data, error } = useFetch<Reservation>(`/vip/reserves/${id}`);

  useEffect(() => {
    if (data) {
      setConfirmation(data);
    }
    if (error) {
      console.error('Error fetching reservation:', error);
    }
  }, [data, error]);

  const cancel = async () => {
    const isConfirmed = window.confirm('예약을 취소하시겠습니까?');

    if (!isConfirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/vip/reserves/${id}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to cancel reservation');
      }

      setConfirmation(null);
      alert('예약이 취소되었습니다.');
      router.push('/');
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      alert('예약 취소에 실패했습니다.');
    }
  };

  return (
    <div className='flex justify-center items-center mb-10 mt-5'>
      <div className='mx-32 mt-10 w-3/5'>
        <div className='text-4xl font-bold'>상담 예약 확인</div>
        <div className='my-1 text-gray-600'>
          하나은행만의 전문 PB와 1대 1 상담을 언제든 신청할 수 있습니다.
        </div>
        {confirm ? (
          <div className='bg-[#D6E8F6] rounded-lg shadow-[0_4px_6px_0px_rgba(0,0,0,0.1)] px-24 py-16 mt-10'>
            <div className='flex justify-between items-center my-2'>
              <div className='flex flex-wrap gap-2 items-center'>
                <label className='w-20 text-right font-semibold'>
                  카테고리
                </label>
                <div className='bg-white rounded-lg p-1.5'>
                  {confirm.categoryName}
                </div>
              </div>
              <div className='flex gap-2 items-center'>
                <p className='font-semibold'>PB명</p>
                <p className='bg-white rounded-lg px-5 py-1.5'>
                  {confirm.pbName}
                </p>
              </div>
            </div>
            <div className='flex justify-between items-center my-2'>
              <div className='flex flex-wrap gap-2 items-center'>
                <label className='w-20 text-right font-semibold'>
                  희망일시
                </label>
                <p className='bg-white rounded-lg p-1.5'>
                  {formatDate(confirm.date)} {confirm.time}
                </p>
              </div>
              <div className='flex gap-2 items-center'>
                <p className='font-semibold'>고객명</p>
                <p className='bg-white rounded-lg px-5 py-1.5'>
                  {confirm.customerName}
                </p>
              </div>
            </div>
            <div className='flex gap-4 items-center w-full my-2'>
              <label className='w-20 text-right font-semibold'>제목</label>
              <div className='bg-white rounded-lg p-1.5 w-full'>
                {confirm.title}
              </div>
            </div>
            <div className='flex gap-4 items-center w-full my-2'>
              <label className='w-20 text-right font-semibold'>내용</label>
              <div className='bg-white rounded-lg p-1.5 w-full min-h-96 overflow-y-auto'>
                {confirm.content}
              </div>
            </div>
            <div className='flex justify-end gap-2'>
              <Button
                onClick={cancel}
                className='bg-gray-300 hover:bg-gray-400 hover:text-white'
                text='신청 취소'
                type='button'
              />
              <form action='/' className='text-white'>
                <Button
                  type='submit'
                  text='메인으로'
                  className='bg-[#3F6886] hover:bg-[#2c4a5f] hover:text-white'
                />
              </form>
            </div>
          </div>
        ) : (
          <div>잘못된 접근입니다. </div>
        )}
      </div>
    </div>
  );
}
