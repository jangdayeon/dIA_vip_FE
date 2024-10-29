import { scheduleData, type Schedule } from '@/data/scheduledata';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { CalendarClock } from 'lucide-react';
import Link from 'next/link';

const ScheduleItem = ({ title, date }: Schedule) => {
  return (
    <div className='flex items-center justify-between p-3 border-b border-gray-200'>
      <div className='flex items-center'>
        <CalendarClock className='w-6 h-6 text-gray-500 mr-3' />
        <div>
          <p className='text-sm font-semibold text-gray-700 truncate max-w-60'>
            {title}
          </p>
          <p className='text-xs text-gray-500'>{date}</p>
        </div>
      </div>
      <Link href='/confirm'>
        <ChevronRightIcon className='w-5 h-5' />
      </Link>
    </div>
  );
};

export default function ScheduleCard() {
  return (
    <div className='bg-white shadow-lg rounded-lg'>
      <div className='border-b border-opacity-55 px-6 py-4'>
        <div className='text-slate-600 text-2xl font-semibold'>상담 일정</div>
      </div>

      <div className='h-screen overflow-y-scroll'>
        {scheduleData.map((schedule, index) => (
          <ScheduleItem
            key={index}
            title={schedule.title}
            date={schedule.date}
          />
        ))}
      </div>
    </div>
  );
}
