'use client';

import { FolderArrowDownIcon, HeartIcon } from '@heroicons/react/16/solid';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import 'react-loading-skeleton/dist/skeleton.css';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from './ConsultingDetailLoading';
import { Consulting } from './ConsultingListCard';
import ConsultingScriptCard from './ConsultingScriptCard';

export type item = {
  id: number;
  name: string;
  url: string;
};

export default function ConsultingDetailCard() {
  const { id } = useParams();
  const [consultingDetail, setConsultingDetail] = useState<Consulting | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    async function fetchConsultingDetail() {
      const response = await fetch(`http://localhost:8080/vip/journals/${id}`);
      const detail: Consulting = await response.json();
      setConsultingDetail(detail);
    }

    fetchConsultingDetail();
  }, [id]);

  if (!consultingDetail) return <Loading />;

  const { category, title, date, time, manager, contents, journalProducts } =
    consultingDetail;

  const downloadPDF = () => {
    const contentToCapture = document.getElementById(
      'consulting-detail-content'
    );

    if (contentToCapture) {
      html2canvas(contentToCapture, { scale: 2 }).then((canvas) => {
        const doc = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const imgWidth = pageWidth;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;

        let yOffset = 0;

        // Add the first page
        doc.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight);

        // Check if the content height exceeds one page
        while (imgHeight > pageHeight) {
          doc.addPage();
          yOffset = yOffset - pageHeight;
          doc.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight);
          imgHeight -= pageHeight;
        }

        // Save the PDF
        doc.save(`상담 내역_${date}.pdf`);
      });
    }
  };

  return (
    <div className='mt-10 w-full'>
      <div className='flex justify-end gap-2 items-center'>
        <button
          onClick={() => router.push('/reserve')}
          className='flex flex-row bg-[#3F6886] p-2 rounded-lg text-[#F2F9FF] hover:bg-[#2c4a5f]'
        >
          <HeartIcon className='h-6' />
          추가 상담
        </button>
        <button
          onClick={downloadPDF}
          className='flex flex-row bg-[#3F6886] p-2 rounded-lg text-[#F2F9FF] hover:bg-[#2c4a5f]'
        >
          <FolderArrowDownIcon className='h-6 w-6' />
          다운로드
        </button>
      </div>
      <div>
        <div
          id='consulting-detail-content'
          className='mt-5 pt-5 shadow-[0_0px_6px_0px_rgba(0,0,0,0.1)] bg-[#F2F9FF] rounded-t-lg'
        >
          <div className='my-5 mx-24'>
            <div className='text-2xl font-bold'>
              [{category}] {title}
            </div>
            <div className='flex justify-between py-2'>
              <div className='flex flex-row gap-2'>
                <div className='font-bold'>PB명</div> {manager}
              </div>
              <div>
                {date} {time}
              </div>
            </div>
          </div>

          <div className='bg-white w-full py-5 border-b'>
            <div className='text-xl font-bold mx-24'>상담 내용</div>
            <div className='mt-5 mx-24'>{contents}</div>
          </div>
          <div className='bg-white w-full py-5 border-b'>
            <div className='text-xl font-bold mb-5 mx-24'>추천 상품</div>
            {journalProducts && journalProducts.length > 0 ? (
              <ul className='list-disc pl-5 mx-24'>
                {journalProducts.map((item) => (
                  <li key={item.id} className='my-2'>
                    <a href={item.url}>{item.name}</a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className='mx-24'> 추천된 상품이 없습니다. </div>
            )}
          </div>
          <div className='bg-white w-full py-5 border-b'>
            <div className='text-xl font-bold mx-24'>상담 주요 스크립트</div>
            <div className='mt-5 flex justify-center mx-24'>
              <ConsultingScriptCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
