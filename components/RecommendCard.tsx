import useFetch from '@/hooks/useFetch';
import { Recommendation } from '@/utils/type';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import RecommendCardLoading from './RecommendCardLoading';

export default function RecommendCard() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const { data, error } = useFetch<Recommendation[]>(
    '/vip/journals/recommendations'
  );

  useEffect(() => {
    if (data) {
      setRecommendations(data);
    }
    if (error) {
      console.error('Error fetching recommendations:', error);
    }
  }, [data, error]);

  if (!recommendations || recommendations.length === 0) {
    return <RecommendCardLoading />;
  }

  return (
    <div className='bg-white shadow-lg rounded-lg'>
      <div className='border-b border-opacity-55 px-6 py-4'>
        <div className='text-slate-600 text-2xl font-semibold'>맞춤 콘텐츠</div>
      </div>
      <div className='p-2 rounded-b-lg'>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={5}
          slidesPerView={3}
          navigation
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className='flex items-center'
        >
          {recommendations.map((recommendation) => {
            const { id, url, imgUrl, description } = recommendation;
            return (
              <SwiperSlide key={id} className='p-4 bg-white'>
                <Link
                  href={url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='block text-center'
                >
                  <Image
                    src={imgUrl}
                    alt={description}
                    width={300}
                    height={200}
                    className='mb-2 object-cover h-36'
                  />
                  <p className='text-sm text-gray-500'>{description}</p>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
