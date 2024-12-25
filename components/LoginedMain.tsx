'use client';

import { getSession } from '@/actions/myauth';
import ConsultingListCard from '@/components/ConsultingListCard';
import PBCard from '@/components/PBCard';
import ReserveCard from '@/components/ReserveCard';
import ScheduleCard from '@/components/ScheduleCard';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import banner from '../assets/banner.gif';
import NotLoginedMain from './NotLoginedMain';
import RecommendCard from './RecommendCard';

export default function Logined() {
  const [id, setId] = useState('guest');
  useEffect(() => {
    (async function () {
      const ss = await getSession();
      setId(ss?.user?.email || '');
    })();
  });

  if (!id) {
    return <NotLoginedMain />;
  }
  return (
    <div className='flex justify-center items-center mx-auto p-10 w-5/6'>
      <div className='bg-sky-50 rounded-2xl'>
        <Image
          src={banner}
          alt='banner'
          style={{ objectFit: 'cover' }}
          quality={100}
          className='w-full border-t-2 border-x-2 border-sky-50 h-40 rounded-t-2xl'
        />

        <div className='p-5'>
          <div className='grid grid-cols-3 gap-3'>
            <PBCard />
            <ScheduleCard />
            <ConsultingListCard />
            <ReserveCard />
            <div className='col-span-2'>
              <RecommendCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
