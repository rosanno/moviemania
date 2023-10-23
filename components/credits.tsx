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
    <section className="px-10 pt-28 pb-16">
      <h1 className="text-white text-lg md:text-2xl font-semibold">Cast</h1>
      <Swiper
        slidesPerView={15.5}
        navigation={true}
        className="mt-4"
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
