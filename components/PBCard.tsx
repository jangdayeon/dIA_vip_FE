import { MessageCircleHeart, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import pb_profile from '../assets/pb_profile.png';
import Modal from './Modal';

export default function PBCard() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
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
          <div className='flex justify-between bg-blue-100 w-full p-2 rounded-lg font-semibold'>
            <div className='flex items-center space-x-2 text-gray-700'>
              <PhoneCall />
              <div>현재 상담 가능 상태</div>
            </div>
            <div className='flex items-center space-x-2'>
              <div
                className={`w-3 h-3 rounded-full ${
                  isOnline ? 'bg-green-500' : 'bg-gray-400'
                }`}
              />
              <span className='text-gray-700'>
                {isOnline ? '온라인' : '오프라인'}
              </span>
            </div>
          </div>

          <div className='flex justify-between bg-blue-100 w-full p-2 rounded-lg font-semibold'>
            <div className='flex items-center space-x-2 text-gray-700'>
              <MessageCircleHeart />
              <div>
                안유진 PB와 함께한지
                <div className='text-xs'>2024/08/01</div>
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
