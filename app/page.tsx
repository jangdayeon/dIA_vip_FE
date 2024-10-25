'use client';

import ConsultingListCard from '@/components/ConsultingListCard';
import PBCard from '@/components/PBCard';
import ReserveCard from '@/components/ReserveCard';
import ScheduleCard from '@/components/ScheduleCard';
import Image from 'next/image';
import banner from '../assets/home_banner.png';

export default function Home() {
  return (
    <div className='flex justify-center items-center mx-auto p-10'>
      <div className='bg-sky-50 rounded-2xl'>
        <Image src={banner} alt='' className='w-full' />

        <div className='grid grid-cols-3 gap-3 p-5'>
          <div className='grid grid-cols-1 gap-3'>
            <PBCard />
            <ReserveCard />
          </div>

          <ScheduleCard />
          <ConsultingListCard />
        </div>
      </div>
    </div>
  );
}
