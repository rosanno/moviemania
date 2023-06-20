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
    <Section heading="Upcoming Movies" scrollLeft={scrollLeft} scrollRight={scrollRight}>
      <div ref={scrollRef} className="grid grid-rows-2 grid-flow-col gap-4 md:mt-7 overflow-x-auto scrollbar">
        {data?.results?.map((item) => (
          <MovieCard key={item.id} media={item} />
        ))}
      </div>
    </Section>
  );
}

export default UpcomingMovie;
