import { FolderArrowDownIcon, HeartIcon } from '@heroicons/react/16/solid';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useRouter } from 'next/navigation';

export default function Loading() {
  const router = useRouter();
  return (
    <div className='mt-10 w-full'>
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
        <div className='mt-2 border border-black bg-[#F2F9FF] rounded-t-lg'>
          <div className='m-5'>
            <div className='text-2xl font-bold'>
              <Skeleton />
            </div>
            <div className='flex justify-between py-2'>
              <Skeleton width={100} />
              <Skeleton width={100} />
            </div>
          </div>

          <div className='bg-white w-full p-5 border-b'>
            <div className='text-xl font-bold'>상담 내용</div>
            <Skeleton height={100} />
          </div>
          <div className='bg-white w-full p-5 border-b'>
            <div className='text-xl font-bold'>상담 주요 스크립트</div>
            <Skeleton height={300} />
          </div>
        </div>
      </div>
    </div>
  );
}
