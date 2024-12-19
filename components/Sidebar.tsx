'use client';

import { formatDate } from '@/utils/date';
import { type Consulting } from '@/utils/type';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { Menu } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [searchResults, setSearchResults] = useState<Consulting[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (id: number) => {
    setSelectedItemId(id);
    router.push(`/consultingList/${id}`);
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    async function fetchSidebar() {
      const response = await fetch('http://localhost:8080/vip/journals');
      const data: Consulting[] = await response.json();
      setSearchResults(data);
    }

    fetchSidebar();
  }, []);

  useEffect(() => {
    if (pathname) {
      const match = pathname.match(/\/consultingList\/(\d+)/); // Extract ID from URL
      if (match && match[1]) {
        setSelectedItemId(Number(match[1]));
      }
    }
  }, [pathname]);

  return (
    <div
      className={`flex flex-col bg-gray-100 transition-width duration-300 ${isOpen ? 'w-80' : 'w-16'}`}
    >
      <button onClick={toggleSidebar} className='p-4 focus:outline-none'>
        <Menu />
      </button>
      <nav className=''>
        {searchResults
          .filter((item) => item.status === true) // "열람 가능"인 항목만 필터링
          .map((item) => (
            <div
              key={item.id}
              className={`flex items-center space-x-2 cursor-pointer ${
                selectedItemId === item.id
                  ? 'bg-white border-l-4 border-blue-500'
                  : ''
              }`}
              onClick={() => handleNavigation(item.id)}
            >
              {isOpen && (
                <div className='flex items-center justify-between w-full p-3 border hover:shadow-md'>
                  <div className='flex items-center'>
                    <ChatBubbleLeftRightIcon className='w-6 h-6 text-gray-500 mr-3' />
                    <div>
                      <p className='text-sm font-semibold text-gray-700 truncate max-w-48'>
                        {item.title}
                      </p>
                      <p className='text-xs text-gray-500'>
                        {formatDate(item.date)} {item.time}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </nav>
    </div>
  );
}
