'use client';

import Image from 'next/image';
import main from '../assets/main.gif';

export default function NotLogined() {
  return (
    <div className='relative h-screen w-full'>
      <Image
        src={main}
        alt='Background'
        fill
        style={{ objectFit: 'cover' }}
        quality={100}
      />
    </div>
  );
}
