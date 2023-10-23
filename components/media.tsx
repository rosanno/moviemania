"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import MediaCard from "@/components/ui/media-card";

import "swiper/css";
import "swiper/css/navigation";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MediaProps {
  label: string;
  data: Discover;
}

const Media = ({ label, data }: MediaProps) => {
  return (
    <section className="py-16">
      <div className="mb-5 px-5 md:px-10 flex items-center gap-3 md:gap-5">
        <h1 className="text-white text-lg md:text-2xl font-semibold">
          {label}
        </h1>
        <ChevronRight className="h-8 w-8 text-white" />
      </div>
      {data.results.length !== 0 ? (
        <Swiper
          slidesPerView={2.5}
          spaceBetween={11}
          allowTouchMove={false}
          slidesOffsetAfter={100}
          slidesOffsetBefore={30}
          breakpoints={{
            640: {
              slidesPerView: 2.5,
              spaceBetween: 11,
              slidesOffsetBefore: 30,
            },
            768: {
              slidesPerView: 3.5,
              spaceBetween: 11,
              slidesOffsetBefore: 40,
            },
            1024: {
              slidesPerView: 4.5,
              spaceBetween: 11,
              slidesOffsetBefore: 40,
            },
            1280: {
              slidesPerView: 6.5,
              spaceBetween: 11,
              slidesOffsetBefore: 40,
            },
          }}
          navigation={{
            nextEl: ".image-swiper-button-next",
            prevEl: ".image-swiper-button-prev",
            disabledClass: "swiper-button-disabled",
          }}
          watchSlidesProgress={true}
          modules={[Navigation]}
          className="media-slider"
        >
          <div className="absolute top-36 left-6 md:left-12 z-20">
            <Button
              variant="default"
              size="icon"
              className="swiper-button image-swiper-button-prev rounded-full"
            >
              <ChevronLeft className="text-white w-4 h-4" />
            </Button>
          </div>
          <div className="absolute top-36 right-5 z-20">
            <Button
              variant="default"
              size="icon"
              className="swiper-button image-swiper-button-next rounded-full"
            >
              <ChevronRight className="text-white w-4 h-4" />
            </Button>
          </div>
          {data?.results?.map((movie) => (
            <SwiperSlide key={movie.id.toString()}>
              <MediaCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="py-10">
          <h2 className="text-gray-300 text-center">No results</h2>
        </div>
      )}
    </section>
  );
};

export default Media;
