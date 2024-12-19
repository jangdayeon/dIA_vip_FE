import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function PBCardLoading() {
  return (
    <div className='bg-white shadow-lg rounded-lg'>
      <div className='border-b border-opacity-55 px-6 py-4'>
        <div className='text-slate-600 text-2xl font-semibold'>담당 PB</div>
      </div>
      <div className='p-6'>
        <div className='items-center space-x-4 p-2 hover:bg-gray-100 rounded-lg'>
          <Skeleton height={120} />
        </div>

        <div className='mt-4 space-y-2'>
          <div className='bg-blue-100 w-full p-2 rounded-lg font-semibold'>
            <Skeleton />
          </div>

          <div className='bg-blue-100 w-full p-2 rounded-lg font-semibold'>
            <Skeleton height={40} />
          </div>
        </div>
      </div>
    </div>
  );
}
