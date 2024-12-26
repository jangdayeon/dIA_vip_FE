import { CalendarPlus, PhoneCall, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ReserveCard() {
  const handleQuick = async () => {
    const confirmed = confirm('빠른 상담을 예약하시겠습니까?');
    if (!confirmed) {
      return;
    }

    const now = new Date();
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');

    const data = {
      title: '빠른 상담 요청',
      categoryId: 1,
      date: now.toISOString().split('T')[0],
      time: `${hour}:${minute}`,
      content: '',
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/vip/reserves`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.message;
        throw new Error(`${errorMessage}`);
      }

      alert('빠른 상담이 예약되었습니다! 15분 내로 연락 드리겠습니다.');
      window.location.reload();
    } catch (error) {
      console.error('Error during quick consult:', error);
      alert(error);
    }
  };

  return (
    <div className='bg-white shadow-lg rounded-lg'>
      <div className='border-b border-opacity-55 px-6 py-4'>
        <h2 className='text-slate-600 text-2xl font-semibold'>상담 예약</h2>
      </div>

      <div className='flex flex-col justify-center p-6 space-y-2'>
        <div
          onClick={handleQuick}
          className='flex items-center space-x-2 border border-blue-100 text-gray-700 hover:bg-blue-50 p-2 rounded-lg font-semibold shadow-sm'
        >
          <PhoneCall className='h-6 w-6' />
          <div className='w-full'>
            <div className='font-semibold'>빠른 상담</div>
            <div className='text-black/60 text-xs font-normal'>
              담당 PB가 상담 가능할 경우, 바로 상담을 신청하여 간단한 용무를
              처리할 수 있습니다.
            </div>
          </div>
          <ChevronRight className='text-[#3F6886]' />
        </div>

        <Link href='/reserve'>
          <div className='flex items-center space-x-2 border border-blue-100 text-gray-700 hover:bg-blue-50 p-2 rounded-lg font-semibold shadow-sm'>
            <CalendarPlus className='h-6 w-6' />
            <div className='w-full'>
              <div className='font-semibold'>자세한 상담</div>
              <div className='text-black/60 text-xs font-normal'>
                하나은행만의 전문 PB와 1대 1 심층 상담을 언제든 예약할 수
                있습니다.
              </div>
            </div>
            <ChevronRight className='text-[#3F6886]' />
          </div>
        </Link>
      </div>
    </div>
  );
}
