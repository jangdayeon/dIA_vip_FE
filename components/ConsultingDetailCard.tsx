'use client';

import { FolderArrowDownIcon, HeartIcon } from '@heroicons/react/16/solid';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ConsultingDetail {
  id: number;
  category: string;
  title: string;
  date: string;
  manager: string;
  status: string;
  content: string;
}

export default function ConsultingDetailCard() {
  const { id } = useParams();
  const [consultingDetail, setConsultingDetail] =
    useState<ConsultingDetail | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchConsultingDetail() {
      const response = await fetch('/api/searchResults');
      const data = await response.json();
      const detail = data.searchResults.find(
        (item: ConsultingDetail) => item.id === Number(id)
      );

      if (detail) setConsultingDetail(detail);
    }

    fetchConsultingDetail();
  }, [id]);

  if (!consultingDetail) return <div>Loading...</div>;

  const { category, title, date, manager } = consultingDetail;

  return (
    <div className='mt-10'>
      <div className='flex justify-end gap-2 items-center'>
        <button
          onClick={() => router.push('/reserve')}
          className='flex flex-row bg-[#3F6886] p-2 rounded-lg text-[#F2F9FF]'
        >
          <HeartIcon className='h-6' />
          추가 상담
        </button>
        <button
          onClick={() => {}}
          className='flex flex-row bg-[#3F6886] p-2 rounded-lg text-[#F2F9FF]'
        >
          <FolderArrowDownIcon className='h-6 w-6' />
          다운로드
        </button>
      </div>
      <div>
        <div className='mt-2 border border-black bg-[#F2F9FF] rounded-lg'>
          <div className='m-5'>
            <div className='text-2xl font-bold'>
              [{category}] {title}
            </div>
            <div className='flex justify-between py-2 space-x-10'>
              <div className='flex flex-row gap-2'>
                <div className='font-bold'>PB명</div> {manager}
                <div className='font-bold'>고객명</div>
              </div>
              <div>{date}</div>
            </div>
          </div>

          <div className='bg-white w-full p-5 border-b'>
            <div className='text-xl font-bold'>상담 내용</div>
            <div className='mt-5'>상세 상담 내용이 여기 표시됩니다.</div>
          </div>
          <div className='bg-white w-full p-5 border-b'>
            <div className='text-xl font-bold'>상담 주요 스크립트</div>
            <div className='mt-5'>상담 스크립트가 여기 표시됩니다.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
