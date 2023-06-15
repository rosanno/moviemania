import { Link } from "react-router-dom";
import moment from "moment";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { useGetUpComingMovieQuery } from "../services/api";
import { useRef } from "react";
import Section from "./Section/Section";

function UpcomingMovie() {
  const scrollRef = useRef(null);
  const { data } = useGetUpComingMovieQuery();

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
      scrollRef.current.scrollBy({
        left: 600,
        behavior: "smooth",
      });
    }
  };

  return (
    <Section>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl sm:text-3xl font-bold capitalize">
          Upcoming Movies
        </h1>
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
      <div
        ref={scrollRef}
        className="grid grid-rows-2 grid-flow-col gap-5 sm:gap-7 md:mt-7 overflow-x-scroll overflow-y-hidden scrollbar scroll-smooth"
      >
        {data?.results?.map((item) => (
          <Link to={`/movies/details/${item.id}`} key={item.id}>
            <div className="relative group overflow-hidden">
              <div className="w-72 sm:w-96 rounded-md overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item?.backdrop_path}`}
                  alt=""
                  className="rounded-md h-[270px] object-cover group-hover:scale-110 overflow-hidden transition-transform duration-300"
                />
              </div>
              <div className="absolute bottom-10 z-10 px-5">
                <h2 className="text-lg sm:text-2xl font-bold">{item?.title}</h2>
                <span className="text-gray-300">
                  {item.original_language}
                </span>{" "}
                •{" "}
                <span className="text-sm text-gray-300">
                  {moment(item?.release_date).format("MMMM D YYYY")}
                </span>
              </div>
              <div className="absolute top-0 w-full h-full bg-black/40 rounded-md overflow-hidden" />
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export default UpcomingMovie;
