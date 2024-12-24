import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function RecommendCardLoading() {
  return (
    <div className='bg-white shadow-lg rounded-lg'>
      <div className='border-b border-opacity-55 px-6 py-4'>
        <div className='text-slate-600 text-2xl font-semibold'>맞춤 콘텐츠</div>
      </div>
      <div className='p-4 rounded-b-lg'>
        <Skeleton height={170} />
      </div>
    </div>
  );
}
