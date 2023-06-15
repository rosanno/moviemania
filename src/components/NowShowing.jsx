import moment from "moment";
import { useGetNowPlayingQuery } from "../services/api";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Section from "./Section/Section";

const NowShowing = () => {
  const scrollRef = useRef(null);
  const { data: nowPlaying } = useGetNowPlayingQuery({ type: "movies" });

  console.log(nowPlaying);

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
      <div className="flex justify-between items-center mb-5 pt-14">
        <h1 className="text-2xl sm:text-3xl font-bold capitalize">
          Now Showing
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
        className="grid grid-rows-2 grid-flow-col overflow-x-auto gap-4 scrollbar"
      >
        {nowPlaying?.results?.map((playing, index) => (
          <div
            key={playing.id}
            className={`${index === 0 ? "md:row-span-2" : ""} relative`}
          >
            <div
              className={`${
                index === 0 ? "w-full md:w-[450px]" : "w-72 sm:w-96"
              } h-full overflow-hidden rounded-md`}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${playing.backdrop_path}`}
                alt=""
                className={`object-cover ${
                  index === 0 ? "h-full" : "h-[270px]"
                }`}
              />
            </div>
            <div className="absolute bottom-10 z-10 px-5">
              <div className="flex items-center gap-4">
                {index === 0 && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${playing.poster_path}`}
                    className="h-56 object-contain rounded-md hidden md:block"
                  />
                )}
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold">
                    {playing?.title}
                  </h2>
                  <span className="text-gray-300">
                    {playing.original_language}
                  </span>{" "}
                  •{" "}
                  <span className="text-sm text-gray-300">
                    {moment(playing?.release_date).format("MMMM D YYYY")}
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 w-full h-full bg-black/40 rounded-md overflow-hidden" />
          </div>
        ))}
      </div>
    </Section>
  );
};

export default NowShowing;
