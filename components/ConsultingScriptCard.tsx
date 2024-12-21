import useFetch from '@/hooks/useFetch';
import { type Script } from '@/utils/type';
import { useEffect, useState } from 'react';

export default function ConsultingScriptCard({
  id,
}: {
  id: string | string[];
}) {
  const [consultingScripts, setConsultingScripts] = useState<Script[]>([]);

  const { data } = useFetch<Script[]>(`/vip/journals/${id}/scripts`);

  useEffect(() => {
    if (data) {
      setConsultingScripts(data);
    }
  }, [data]);

  return (
    <div className='w-full'>
      {consultingScripts.map((item) => (
        <div
          key={item.sequence}
          className={
            item.speaker === 'VIP' ? 'flex justify-end' : 'flex justify-start'
          }
        >
          {item.speaker === 'VIP' ? (
            <div className='border border-[#3F6886] rounded-lg max-w-96 w-fit p-1 my-1.5 bg-[#3F6886] text-white'>
              {item.content}
            </div>
          ) : (
            <div className='border border-[#D6E8F6] rounded-lg max-w-96 w-fit p-1 my-1.5 bg-[#D6E8F6] text-black'>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
