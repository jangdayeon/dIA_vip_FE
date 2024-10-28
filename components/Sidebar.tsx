'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleItem = (item: string) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <div
      className={`flex flex-col bg-gray-100 h-screen p-4 transition-width duration-300 ${isOpen ? 'w-64' : 'w-16'}`}
    >
      <button onClick={toggleSidebar} className='mb-5 focus:outline-none'>
        <Menu />
      </button>
      <nav className='space-y-4'>
        {['전체 대화 내역', '상담 일지', '채팅 메시지'].map((item) => (
          <div
            key={item}
            className='flex items-center space-x-2 cursor-pointer'
          >
            <div onClick={() => toggleItem(item)}>
              {checkedItems.includes(item) ? 'Checked' : 'Unchecked'}
            </div>
            {isOpen && (
              <Link href='/' className='text-sm font-medium'>
                {item}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
