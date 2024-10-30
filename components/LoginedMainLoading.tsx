import ReserveCard from '@/components/ReserveCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Image from 'next/image';
import banner from '../assets/home_banner.png';

export default function Logined() {
  return (
    <div className='flex justify-center items-center mx-auto p-10'>
      <div className='bg-sky-50 rounded-2xl'>
        <Image src={banner} alt='' className='w-full h-40' />

        <div className='grid grid-cols-3 gap-3 p-5'>
          <div className='grid grid-cols-1 gap-3'>
            <div className='bg-white shadow-lg rounded-lg h-100'>
              <div className='border-b border-opacity-55 px-6 py-4'>
                <div className='text-slate-600 text-2xl font-semibold'>
                  담당 PB
                </div>
              </div>
              <div className='p-6'>
                <Skeleton height={100} />
              </div>
            </div>
            <ReserveCard />
          </div>

          <div className='bg-white shadow-lg rounded-lg'>
            <div className='flex justify-between border-b border-opacity-55 px-6 py-4'>
              <div className='text-slate-600 text-2xl font-semibold'>
                상담 일정
              </div>
            </div>
            <div className='p-3 border-b border-gray-200'>
              <Skeleton height={500} />
            </div>
          </div>

          <div className='bg-white shadow-lg rounded-lg'>
            <div className='flex justify-between border-b border-opacity-55 px-6 py-4'>
              <div className='text-slate-600 text-2xl font-semibold'>
                상담 내역
              </div>
            </div>
            <div className='p-3 border-b border-gray-200'>
              <Skeleton height={500} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
