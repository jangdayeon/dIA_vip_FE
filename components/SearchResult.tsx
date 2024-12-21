import useFetch from '@/hooks/useFetch';
import { formatDate } from '@/utils/date';
import { type Consulting } from '@/utils/type';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Filters = {
  category: string;
  startDate: Date | null;
  endDate: Date | null;
  keyword: string;
};

export default function SearchResult({
  filters,
  onOldestDateChange,
}: {
  filters: Filters;
  onOldestDateChange: (oldestDate: Date | null) => void;
}) {
  const [searchResults, setSearchResults] = useState<Consulting[]>([]);
  const [filteredResults, setFilteredResults] = useState<Consulting[]>([]);
  const router = useRouter();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();
    router.push(`/consultingList/${id}`);
  };

  const { data } = useFetch<Consulting[]>('/vip/journals');

  useEffect(() => {
    if (data) {
      setSearchResults(data);
      setFilteredResults(data);
      const oldestDate = data[data.length - 1]?.date;
      if (oldestDate) onOldestDateChange(new Date(oldestDate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const { category, startDate, endDate, keyword } = filters;

    const filtered = searchResults.filter((item) => {
      const isCategoryMatch = category === '전체' || item.category === category;
      const isDateMatch =
        (!startDate || new Date(item.date) >= new Date(startDate)) &&
        (!endDate || new Date(item.date) <= new Date(endDate));
      const isKeywordMatch =
        !keyword || item.title.toLowerCase().includes(keyword.toLowerCase());

      return isCategoryMatch && isDateMatch && isKeywordMatch;
    });

    setFilteredResults(filtered);
  }, [filters, searchResults]);

  return (
    <div className='border border-sky-50 bg-white w-full h-96 overflow-y-auto p-2 mt-5'>
      <table className='table-auto w-full border-collapse'>
        <thead className='sticky top-0 bg-gray-100 z-10'>
          <tr>
            <th className='px-4 py-2'>ID</th>
            <th className='px-4 py-2'>카테고리</th>
            <th className='px-4 py-2'>제목</th>
            <th className='px-4 py-2'>상담일시</th>
            <th className='px-4 py-2'>담당자</th>
            <th className='px-4 py-2'>일지보기</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.map((item) => (
            <tr key={item.id} className='border-b border-black text-center'>
              <td className='px-4 py-2'>{item.id}</td>
              <td className='px-4 py-2'>{item.category}</td>
              <td className='px-4 py-2 truncate max-w-48'>{item.title}</td>
              <td className='px-4 py-2'>
                {formatDate(item.date)} {item.time}
              </td>
              <td className='px-4 py-2'>{item.manager}</td>
              <td className='px-4 py-2'>
                {item.status ? (
                  <button
                    onClick={(e) => handleSubmit(e, item.id)}
                    className='hover:underline text-blue-700'
                  >
                    열람 가능
                  </button>
                ) : (
                  <span className='text-gray-500'>열람 불가</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
