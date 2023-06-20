import { Link } from "react-router-dom";
import moment from "moment";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { useGetUpComingMovieQuery } from "../services/api";
import { useRef } from "react";
import Section from "./Section/Section";
import MovieCard from "./MovieCard";

function UpcomingMovie() {
  const scrollRef = useRef(null);
  const { data } = useGetUpComingMovieQuery({ date: moment(new Date()).format("YYYY-MM-DD") });

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
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl sm:text-3xl font-bold capitalize">Upcoming Movies</h1>
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
      <div ref={scrollRef} className="grid grid-rows-2 grid-flow-col gap-4 md:mt-7 overflow-x-auto scrollbar">
        {data?.results?.map((item) => (
          <MovieCard key={item.id} media={item} />
        ))}
      </div>
    </Section>
  );
}

export default UpcomingMovie;
