'use client';

import Button from '@/stories/Button';
import { PBProfile } from '@/utils/type';
import { PhoneCall, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';

// import PBCard from '../assets/pb_card.png';

interface ModalProps {
  onClose: () => void;
}

export default function Modal({ onClose }: ModalProps) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const [pbModal, setPbModal] = useState<PBProfile | null>(null);

  useEffect(() => {
    async function fetchPBModal() {
      try {
        const response = await fetch('http://localhost:8080/vip/pb');
        const data: PBProfile = await response.json();
        setPbModal(data);
      } catch (error) {
        console.error('Error fetching PB data:', error);
      }
    }

    fetchPBModal();
  }, []);

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

  if (!pbModal) {
    return <div>Loading...</div>;
  }

  const { name, introduction, location, tel, career, imageUrl, tags } = pbModal;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div
        ref={modalRef}
        className='bg-sky-50 rounded-2xl p-6 max-w-2xl w-full shadow-inner'
      >
        <div className='flex flex-row justify-center pt-6 pb-4 gap-5 '>
          <Image
            src={imageUrl}
            alt='PB card'
            width={48}
            height={56}
            className='object-cover w-48 h-56'
          />
          <div>
            <div className='flex gap-2'>
              <h2 className='text-slate-600 text-2xl font-bold'>{name} PB</h2>
            </div>
            <div className='font-bold text-lg mb-1 mt-1'>
              &quot;{introduction}&quot;
            </div>
            <div className='mt-1 space-x-1'>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className='px-2 py-1 bg-slate-500 rounded-sm text-xs text-white'
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div className='space-y-2 text-sm mt-3 font-normal bg-[#D9D9D9] bg-opacity-40 p-5 rounded-xl'>
              <div className='flex items-center gap-2'>
                <PhoneCall className='w-4 h-4' />
                {tel}
              </div>
              <div className='flex items-center gap-2'>
                <MapPin className='w-4 h-4' />
                {location}
              </div>
            </div>

            <div className='space-y-2 text-sm mt-2 font-semibold bg-[#D9D9D9] bg-opacity-40 p-5 rounded-xl'>
              {career.split('\n').map((i, index) => (
                <div key={index} className='flex items-center gap-2'>
                  {i}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='mt-4 text-right space-x-2'>
          <Button
            type='button'
            onClick={onReserve}
            className='h-10 px-4 py-2 bg-gray-300 hover:bg-gray-400'
            text='상담 예약'
          />
          <Button
            type='button'
            onClick={onClose}
            className='h-10 px-4 py-2 bg-slate-600 text-white hover:bg-slate-500 hover:text-white'
            text='메인으로'
          />
        </div>
      </div>
    </div>
  );
}
