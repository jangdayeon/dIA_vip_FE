import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import logo from '../assets/logo.png';
import SignInOut from './SignInOut';

async function isLogin() {
  'use server';
  const session = await auth();
  return session?.user?.email || '';
}
export default function Nav() {
  return (
    <div className='flex justify-between items-center w-full bg-[#d6e8f6] border-b border-[#a5a5a5]'>
      <Link href='/'>
        <Image src={logo} alt='nav_logo' className='mx-5 w-3/5' />
      </Link>
      <SignInOut isLogin={isLogin} />
    </div>
  );
}
