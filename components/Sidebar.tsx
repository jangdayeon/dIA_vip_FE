'use client';

import { Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { searchResult } from './SearchResult';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [searchResults, setSearchResults] = useState<searchResult[]>([]);
  const router = useRouter();

  const handleNavigation = (id: number) => {
    router.push(`/consultingList/${id}`);
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    async function fetchSearchResults() {
      const response = await fetch('/api/searchResults');
      const data = await response.json();
      setSearchResults(data.searchResults);
    }

    fetchSearchResults();
  }, []);

  return (
    <div
      className={`flex flex-col bg-gray-100 p-4 transition-width duration-300 ${isOpen ? 'w-64' : 'w-16'}`}
    >
      <button onClick={toggleSidebar} className='mb-5 focus:outline-none'>
        <Menu />
      </button>
      <nav className='space-y-4'>
        {searchResults
          .filter((item) => item.status === '열람 가능') // "열람 가능"인 항목만 필터링
          .map((item) => (
            <div
              key={item.id}
              className='flex items-center space-x-2 cursor-pointer'
              onClick={() => handleNavigation(item.id)}
            >
              {isOpen && (
                <span className='text-sm font-medium'>
                  {item.title || item.id}
                </span>
              )}
            </div>
          ))}
      </nav>
    </div>
  );
}
