'use client';

import CalendarPopup from '@/components/CalendarPopup';
import SearchResult from '@/components/SearchResult';
import { type Category } from '@/utils/type';
import { RotateCcw, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ConsultingList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [oldestDate, setOldestDate] = useState<Date | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [filters, setFilters] = useState<{
    category: string;
    startDate: Date | null;
    endDate: Date | null;
    keyword: string;
  }>({
    category: '전체',
    startDate: null,
    endDate: new Date(),
    keyword: '',
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('http://localhost:8080/vip/categories');
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);

  const handleStartDateSet = (value: Date | null) => {
    setStartDate(value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      startDate: value,
    }));
  };

  const handleEndDateSet = (value: Date | null) => {
    setEndDate(value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      endDate: value,
    }));
  };

  const handleOldestDateChange = (date: Date | null) => {
    setOldestDate(date);
    if (!startDate && date) {
      setStartDate(date);
      setFilters((prevFilters) => ({
        ...prevFilters,
        startDate: date,
      }));
    }
  };

  const handleReset = () => {
    setSearchKeyword('');
    setStartDate(oldestDate);
    setEndDate(new Date());
    setSelectedCategory('전체');
    setFilters({
      category: '전체',
      startDate: oldestDate,
      endDate: new Date(),
      keyword: '',
    });
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: value,
    }));
  };

  const handleSearch = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      keyword: searchKeyword,
    }));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 기본 Enter 동작 방지
      handleSearch(); // 검색 버튼 동작 호출
    }
  };

  return (
    <div className='flex justify-center items-center mb-10 mt-5'>
      <div className='mt-10 w-3/5'>
        <div className='text-4xl font-bold'>상담 내역 리스트</div>
        <div className='my-1 text-gray-600'>
          하나은행만의 전문 PB와 상담한 내역을 확인하실 수 있습니다.
        </div>
        <div className='bg-[#D6E8F6] rounded-lg drop-shadow-md px-16 py-16 mt-10'>
          <div className='flex flex-row items-center my-2 gap-2'>
            <label className='w-24 font-semibold text-right'>검색</label>
            <div className='w-full flex items-center'>
              <input
                type='text'
                className='bg-white rounded-lg p-1.5 w-full'
                placeholder='검색 키워드를 입력해주세요.'
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={handleKeyDown} // Enter 키 이벤트 추가
              />
              <button
                className='p-1.5 rounded-lg bg-gray-300 hover:bg-gray-400 hover:text-white ml-2'
                onClick={handleSearch}
              >
                <Search />
              </button>
            </div>
          </div>
          <div className='flex justify-between my-2'>
            <div className='flex flex-wrap gap-2'>
              <label className='w-[85px] text-right font-semibold'>
                카테고리
              </label>
              <select
                className='bg-white rounded-lg p-1.5'
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value='전체'>전체</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex flex-wrap items-center gap-2'>
              <label className='text-center font-semibold'>시작일</label>
              <CalendarPopup
                dateSet={handleStartDateSet}
                minDate={oldestDate || new Date(2000, 1, 1)}
                maxDate={endDate ? endDate : new Date()}
                selectedDate={startDate}
              />
              <label className='text-center font-semibold'>종료일</label>
              <CalendarPopup
                dateSet={handleEndDateSet}
                minDate={startDate || oldestDate || new Date(2000, 1, 1)}
                maxDate={new Date()}
                selectedDate={endDate}
              />
              <button
                className='p-1.5 rounded-lg bg-gray-300 hover:bg-gray-400 hover:text-white'
                onClick={handleReset}
              >
                <RotateCcw />
              </button>
            </div>
          </div>
          <SearchResult
            filters={filters}
            onOldestDateChange={handleOldestDateChange}
          />
        </div>
      </div>
    </div>
  );
}
