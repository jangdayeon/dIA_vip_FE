'use client';

import Image from 'next/image';
import hanaCharacters from '../assets/hanaCharacters.png';
import notLoginedBackgroundImg from '../assets/notLoginedBackgroundImg.png';
import notLoginedText from '../assets/notLoginedText.png';

export default function NotLogined() {
  return (
    <div className='relative h-screen w-full'>
      <Image
        src={notLoginedBackgroundImg}
        alt='Background'
        fill
        style={{ objectFit: 'cover' }}
        quality={100}
        className='-z-10' // 뒤에 배치
      />
      <div className='relative z-10'>
        <div className='flex flex-row items-center w-full p-32'>
          <Image
            className='w-1/2'
            src={notLoginedText}
            alt={
              '하나금융그룹의 VIP 손님을 위한 180°달라질 PB (Private Banker) 상담 서비스'
            }
          />
          <Image className='w-1/2' src={hanaCharacters} alt={'하나캐릭터들'} />
        </div>
      </div>
    </div>
  );
}
