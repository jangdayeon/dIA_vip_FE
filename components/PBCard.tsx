import { ChevronRightIcon, MessageCircleHeart, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import pb_profile from '../assets/pb_profile.png';
import Modal from './Modal';

export default function PBCard() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOnline, setIsOnline] = useState<boolean>(true); // Simulating online status

  const handleOpenModal = (): void => {
    setModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setModalOpen(false);
  };
  return (
    <div className='bg-white shadow-lg rounded-lg'>
      <div className='border-b border-opacity-55 px-6 py-4'>
        <div className='text-slate-600 text-2xl font-semibold'>담당 PB</div>
      </div>
      <div className='p-6'>
        <div
          className='flex items-center space-x-4 p-2 hover:bg-gray-100 rounded-lg'
          onClick={handleOpenModal}
        >
          <Image
            src={pb_profile}
            alt='PB profile'
            className='w-20 h-20 rounded-full'
          />
          <div>
            <h2 className='text-lg font-semibold'>안유진 PB</h2>
            <div className='space-x-2 mt-1'>
              <span className='px-2 py-1 bg-blue-100 rounded-lg text-sm text-gray-600'>
                #부동산
              </span>
              <span className='px-2 py-1 bg-blue-100 rounded-lg text-sm text-gray-600'>
                #성수점
              </span>
              <span className='px-2 py-1 bg-blue-100 rounded-lg text-sm text-gray-600'>
                #친절
              </span>
            </div>
            <p className='text-sm text-gray-500 mt-2'>
              안녕하세요. 부동산 투자 전문 PB 안유진입니다.
            </p>
          </div>
        </div>

        <div className='mt-4 space-y-2'>
          <button className='flex bg-blue-100 hover:bg-blue-300 justify-between w-full p-2 rounded-lg font-semibold'>
            <div className='flex items-center space-x-2 text-gray-700'>
              <PhoneCall />
              <div>빠른 상담</div>
            </div>
            <ChevronRightIcon className='text-[#3F6886]' />
          </button>

          <div className='flex justify-between bg-blue-100 w-full p-2 rounded-lg font-semibold'>
            <div className='flex items-center space-x-2 text-gray-700'>
              <MessageCircleHeart />
              <div>
                안유진 PB와 함께한 지<div className='text-xs'>2024/08/01</div>
              </div>
            </div>
            <div className='flex items-center space-x-2'>81일</div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </div>
  );
}
