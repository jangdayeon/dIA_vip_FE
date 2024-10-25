export default function SearchResult() {
  const data = [
    {
      id: 1,
      category: '세무',
      title: '종합소득세',
      date: '2024-10-25 14:00',
      manager: '안유진',
    },
    {
      id: 2,
      category: '세무',
      title: '연말정산',
      date: '2024-10-25 15:00',
      manager: '안유진',
    },
    {
      id: 3,
      category: '세무',
      title: '프리랜서 건강보험',
      date: '2024-10-25 16:00',
      manager: '안유진',
    },
    {
      id: 4,
      category: '법률',
      title: '프리랜서 계약',
      date: '2024-10-26 10:00',
      manager: '안유진',
    },
    {
      id: 5,
      category: '법률',
      title: '프리랜서 계약해지',
      date: '2024-10-26 11:00',
      manager: '안유진',
    },
  ];
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
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
