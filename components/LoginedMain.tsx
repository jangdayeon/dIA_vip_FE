import { getSession } from '@/actions/myauth';
import ConsultingListCard from '@/components/ConsultingListCard';
import PBCard from '@/components/PBCard';
import ReserveCard from '@/components/ReserveCard';
import ScheduleCard from '@/components/ScheduleCard';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import banner from '../assets/home_banner.png';
import LoginedMainLoading from './LoginedMainLoading';
import NotLoginedMain from './NotLoginedMain';

export default function Logined() {
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const ss = await getSession();
      setId(ss?.user?.email || '');
      setLoading(false);
    })();
  });

  if (loading) return <LoginedMainLoading />;
  if (!id) {
    return <NotLoginedMain />;
  }
  return (
    <div className='flex justify-center'>
      <div className='w-5/6 p-10'>
        <div className='bg-sky-50 rounded-2xl '>
          <Image
            src={banner}
            alt='banner'
            style={{ objectFit: 'cover' }}
            quality={100}
            className='w-full rounded-t-2xl'
          />
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
    </div>
  );
}
