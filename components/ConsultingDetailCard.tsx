'use client';

import {
  ConsultingDetail,
  consultingDetailData,
} from '@/data/consultingdetaildata';
import { FolderArrowDownIcon, HeartIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';

export default function ConsultingDetailCard() {
  //TODO: id를 통해 consultingDetail 찾기 구현
  const {
    category,
    title,
    pb_name,
    customer_name,
    date,
    content,
  }: ConsultingDetail = consultingDetailData;

  const router = useRouter();

  return (
    <div className='mt-10 mx-20'>
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
            <div className='flex justify-between py-2'>
              <div className='flex flex-row gap-2'>
                <div className='font-bold'>PB명</div> {pb_name}
                <div className='font-bold'>고객명</div> {customer_name}
              </div>
              <div>{date}</div>
            </div>
          </div>

          <div className='bg-white w-full p-5 border-b'>
            <div className='text-xl font-bold'>상담 내용</div>
            <div className='mt-5'>{content}</div>
          </div>
          <div className='bg-white w-full p-5 border-b'>
            <div className='text-xl font-bold'>상담 주요 스크립트</div>
            <div className=''>{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
