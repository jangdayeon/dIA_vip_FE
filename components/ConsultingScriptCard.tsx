import { useEffect, useState } from 'react';

export type consultingScript = {
  sequence: number;
  speaker: string;
  content: string;
};

export default function ConsultingScriptCard() {
  const [consultingScripts, setConsultingScripts] = useState<
    consultingScript[]
  >([]);

  useEffect(() => {
    async function fetchConsultingScripts() {
      const response = await fetch('/api/consultingScripts');
      const data = await response.json();
      setConsultingScripts(data.consultingScripts);
    }

    fetchConsultingScripts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {consultingScripts.map((item) => (
        <div
          key={item.sequence}
          className={
            item.speaker === 'VIP' ? 'flex justify-end' : 'flex justify-start'
          }
        >
          {item.speaker === 'VIP' ? (
            <div className='border border-[#3F6886] rounded-lg max-w-48 w-fit p-1 my-1.5 bg-[#3F6886] text-white'>
              {item.content}
            </div>
          ) : (
            <div className='border border-[#D6E8F6] rounded-lg max-w-48 w-fit p-1 my-1.5 bg-[#D6E8F6] text-black'>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
