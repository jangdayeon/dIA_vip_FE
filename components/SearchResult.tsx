import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export type searchResult = {
  id: number;
  category: string;
  title: string;
  date: string;
  manager: string;
  status: string;
};

export default function SearchResult() {
  const [searchResults, setSearchResults] = useState<searchResult[]>([]);
  const router = useRouter();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();

    router.push(`/consultingList/${id}`);
  };

  useEffect(() => {
    async function fetchSearchResults() {
      const response = await fetch('/api/searchResults');
      const data = await response.json();
      setSearchResults(data.searchResults);
    }

    fetchSearchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='border border-black bg-white rounded-2xl w-full min-h-96 overflow-y-auto p-2'>
      <table className='table-auto w-full'>
        <thead>
          <tr>
            <th className='border-b-2 border-black px-4 py-2'>순번</th>
            <th className='border-b-2 border-black px-4 py-2'>카테고리</th>
            <th className='border-b-2 border-black px-4 py-2'>제목</th>
            <th className='border-b-2 border-black px-4 py-2'>상담일시</th>
            <th className='border-b-2 border-black px-4 py-2'>담당자</th>
            <th className='border-b-2 border-black px-4 py-2'>일지보기</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((item) => (
            <tr key={item.id}>
              <td className='border-b border-black px-4 py-2 text-center'>
                {item.id}
              </td>
              <td className='border-b border-black px-4 py-2 text-center'>
                {item.category}
              </td>
              <td className='border-b border-black px-4 py-2 text-center'>
                {item.title}
              </td>
              <td className='border-b border-black px-4 py-2 text-center'>
                {item.date}
              </td>
              <td className='border-b border-black px-4 py-2 text-center'>
                {item.manager}
              </td>
              <td className='border-b border-black px-4 py-2 text-center'>
                {item.status === '열람 가능' ? (
                  <button
                    onClick={(e) => handleSubmit(e, item.id)}
                    className='hover:underline text-blue-700'
                  >
                    {item.status}
                  </button>
                ) : (
                  item.status
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
