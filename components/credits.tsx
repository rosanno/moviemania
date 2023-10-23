"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

interface CreditsProps {
  data: CreditsType;
}

const Credits = ({ data }: CreditsProps) => {
  return (
    <section className="pt-28 pb-16">
      <div className="px-10">
        <h1 className="text-white text-lg md:text-2xl font-semibold">Cast</h1>
      </div>
      <Swiper
        slidesPerView={4.5}
        slidesOffsetAfter={100}
        slidesOffsetBefore={30}
        navigation={true}
        className="mt-4"
        breakpoints={{
          640: {
            slidesPerView: 6.5,
            slidesOffsetBefore: 30,
          },
          768: {
            slidesPerView: 11.5,
            slidesOffsetBefore: 35,
          },
          1024: {
            slidesPerView: 13.5,
            slidesOffsetBefore: 35,
          },
          1280: {
            slidesPerView: 15.5,
            slidesOffsetBefore: 35,
          },
        }}
        modules={[Navigation]}
      >
        {data.cast.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex flex-col items-center text-center space-y-2">
              <div
                className="
                 w-20
                 h-20
                 border-2
                 rounded-full
                 overflow-hidden
                "
              >
                <Image
                  src={`${
                    item.profile_path
                      ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                      : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                  }`}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="object-cover w-full"
                />
              </div>
              <div>
                <h4 className="text-gray-400 text-xs">{item.name}</h4>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Credits;
