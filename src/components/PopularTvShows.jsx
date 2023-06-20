import React, { useRef } from "react";
import Section from "./Section/Section";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useGetPopularTvQuery } from "../services/api";
import MovieCard from "./MovieCard";

const PopularTvShows = () => {
  const scrollRef = useRef(null);
  const { data: tvShows } = useGetPopularTvQuery();

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -600,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;

      if (Math.round(scrollLeft + clientWidth) >= scrollRef.current.scrollWidth) {
        // Scroll reached the end, scroll back to the beginning
        scrollRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        // Scroll by a fixed amount to the right
        scrollRef.current.scrollBy({
          left: 600,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <Section>
      <div className="flex justify-between items-center mb-5 pt-14">
        <h1 className="text-2xl sm:text-3xl font-bold capitalize">Popular TV Series</h1>
        <div className="hidden sm:flex items-center justify-center gap-2 md:mr-4 2xl:mr-32">
          <div
            onClick={scrollLeft}
            className="bg-gray-300/10 hover:bg-gray-300/5 transition-colors duration-300 cursor-pointer p-2 rounded-full"
          >
            <FaChevronLeft className="text-lg" />
          </div>
          <div
            onClick={scrollRight}
            className="bg-gray-300/10 hover:bg-gray-300/5 transition-colors duration-300 cursor-pointer p-2 rounded-full"
          >
            <FaChevronRight className="text-lg" />
          </div>
        </div>
      </div>
      <div ref={scrollRef} className="grid grid-flow-col gap-4 overflow-x-scroll scrollbar">
        {tvShows?.results?.map((tv) => (
          <MovieCard key={tv.id} media={tv} />
        ))}
      </div>
    </Section>
  );
};

export default PopularTvShows;
