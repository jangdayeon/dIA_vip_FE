import ConsultingDetailCard from '@/components/ConsultingDetailCard';
import Sidebar from '@/components/Sidebar';

export default function Detail() {
  return (
    <div className='flex flex-row'>
      <Sidebar />
      <div className='flex w-full justify-center px-36'>
        <ConsultingDetailCard />
      </div>
    </div>
  );
}
