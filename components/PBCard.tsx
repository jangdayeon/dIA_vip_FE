import { type PBProfile } from '@/utils/type';
import { MessageCircleHeart, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Modal from './Modal';
import PBCardLoading from './PBCardLoading';

export default function PBCard() {
  const [pb, setPb] = useState<PBProfile | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOnline, setIsOnline] = useState<boolean>(false); // Simulating online status

  useEffect(() => {
    async function fetchPBData() {
      try {
        const response = await fetch('http://localhost:8080/vip/pb');
        const data: PBProfile = await response.json();
        setPb(data);
      } catch (error) {
        console.error('Error fetching PB data:', error);
      }
    }

    fetchPBData();
  }, []);

  const handleOpenModal = (): void => {
    setModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setModalOpen(false);
  };
  useEffect(() => {
    let socket = new WebSocket('ws://localhost:8080/ws/availability');

    socket.onopen = () => {
      console.log('WebSocket 연결됨');
    };

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setIsOnline(data.availability);
      console.log(
        `pbId: ${data.pbId}, Availability: ${data.availability ? '상담가능' : '상담불가능'}`
      );
    };
    socket.onclose = () => {
      console.log('websocket 연결 종로');
    };

    return () => socket.close();
  }, []);

  const Dday = (startDate: string): number => {
    const start = new Date(startDate);
    const now = new Date();
    const differenceInMs = now.getTime() - start.getTime();
    return Math.floor(differenceInMs / (1000 * 60 * 60 * 24)); // Convert ms to days
  };

  if (!pb) {
    // return <div>Loading...</div>;
    return <PBCardLoading />;
  }

  const { name, introduction, date, imageUrl, tags, online } = pb;

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
            src={imageUrl}
            alt='PB image'
            width={80}
            height={80}
            className='rounded-full  object-cover aspect-square'
          />
          <div>
            <h2 className='text-lg font-semibold'>{name} PB</h2>
            <div className='space-x-2 mt-1'>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className='px-2 py-1 bg-blue-100 rounded-lg text-sm text-gray-600'
                >
                  #{tag}
                </span>
              ))}
            </div>
            <p className='text-sm text-gray-500 mt-2'>{introduction}</p>
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
                {name} PB와 함께한 지<div className='text-xs'>{date}</div>
              </div>
            </div>
            <div className='flex items-center space-x-2'>{Dday(date)}일</div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </div>
  );
}
