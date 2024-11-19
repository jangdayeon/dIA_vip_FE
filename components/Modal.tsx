'use client';

import { SquareCheckBig } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useEffect } from 'react';
import PBCard from '../assets/pb_card.png';

interface ModalProps {
  onClose: () => void;
}

export default function Modal({ onClose }: ModalProps) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const onReserve = () => {
    router.push('/reserve');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div ref={modalRef} className='bg-sky-50 rounded-lg p-6 max-w-2xl w-full'>
        <div className='flex flex-row px-4 py-6 gap-4'>
          <div className='w-1/3'>
            <Image src={PBCard} alt='PB card' className='' />

            <div className='bg-white rounded-lg shadow border border-zinc-400 mt-4'>
              <div className='text-center'>
                <div className='text-yellow-700 bg-[#D7D3B6] p-2 rounded-t-lg text-2xl font-bold'>
                  MY PB
                </div>
                <div className='text-sm m-2'>
                  <div>현재 상태 : 상담 가능</div>
                  <div>전담 기간 : 21.03.02~</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className='flex gap-3'>
              <h2 className='text-slate-600 text-2xl font-bold'>안유진 PB</h2>
              <div className='space-x-2 mt-1'>
                <span className='px-2 py-1 bg-slate-500 rounded-sm text-sm text-white'>
                  #펀드
                </span>
                <span className='px-2 py-1 bg-slate-500 rounded-sm text-sm text-white'>
                  #채권
                </span>
              </div>
            </div>
            <div className='mt-4'>
              <div className='font-bold mb-2'>
                고객님의 자산을 안전하게 책임지겠습니다.
              </div>
              <div className='text-sm mb-4'>
                <div className='mb-2'>
                  <p className='underline'>연락처</p>
                  <p>010-1234-1234</p>
                </div>
                <div>
                  <p className='underline'>사무실</p>
                  <p>강남파이낸스PB센터</p>
                  <p>서울 강남구 테헤란로 152</p>
                  <p>강남파이낸스센터 2층 (역삼동 737)</p>
                </div>
              </div>
            </div>
            <hr className='border-black mb-4' />

            <div className='text-sm font-semibold'>
              <div className='flex items-center gap-1'>
                <SquareCheckBig className='w-3 h-3' />
                경력: 석사
              </div>
              <div className='flex items-center gap-1'>
                <SquareCheckBig className='w-3 h-3' />
                CFA, CFP, 투자자문용사
              </div>
              <div className='flex items-center gap-1'>
                <SquareCheckBig className='w-3 h-3' />
                하나은행 PB (20/04 ~ )
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className='mt-6 text-right space-x-2'>
          <button
            onClick={onReserve}
            className='bg-gray-200 p-2 rounded-2xl border border-black hover:text-white'
          >
            상담 예약
          </button>
          <button
            onClick={onClose}
            className='bg-slate-600 text-white p-2 rounded-2xl border border-black hover:text-black'
          >
            메인으로
          </button>
        </div>
      </div>
    </div>
  );
}
