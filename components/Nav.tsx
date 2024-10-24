import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/logo.png';

export default function Nav() {
  return (
    <div className='flex justify-between items-center w-full bg-[#d6e8f6] border-b border-[#a5a5a5]'>
      <div className='flex items-center gap-3'>
        <Link href='/'>
          <Image src={logo} alt='nav_logo' className='mx-5 w-3/5' />
        </Link>
        <div className='flex font-bold gap-2'>
          <Link href='/reserve' className='hover:underline '>
            상담 예약
          </Link>
          <Link href='/consultingList' className='hover:underline '>
            상담 내역
          </Link>
        </div>
      </div>
      <button className='text-center text-[#525463] border h-10 bg-[#858899]/20 px-4 py-2 my-4 mx-7 rounded-lg'>
        로그아웃
      </button>
    </div>
  );
}
