import { type Script } from '@/utils/type';
import { useEffect, useState } from 'react';

export default function ConsultingScriptCard({
  id,
}: {
  id: string | string[];
}) {
  const [consultingScripts, setConsultingScripts] = useState<Script[]>([]);

  useEffect(() => {
    async function fetchScripts() {
      const response = await fetch(
        `http://localhost:8080/vip/journals/${id}/scripts`
      );
      const data: Script[] = await response.json();
      setConsultingScripts(data);
    }

    fetchScripts();
  }, [id]);

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
