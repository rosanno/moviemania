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
    <Section heading="Popular TV Series" scrollLeft={scrollLeft} scrollRight={scrollRight}>
      <div ref={scrollRef} className="grid grid-flow-col gap-4 overflow-x-scroll scrollbar">
        {tvShows?.results?.map((tv) => (
          <MovieCard key={tv.id} media={tv} />
        ))}
      </div>
    </Section>
  );
};

export default PopularTvShows;
