import moment from "moment";
import { useGetNowPlayingQuery } from "../services/api";
import { BsPlayFill } from "react-icons/bs";
import Section from "./Section/Section";
import { Link } from "react-router-dom";
import useHorizontalScroll from "../hooks/useHorizontalScroll";

const NowShowing = () => {
  const { scrollRef, scrollLeft, scrollRight } = useHorizontalScroll();
  const { data: nowPlaying } = useGetNowPlayingQuery({ type: "movies" });

  return (
    <Section heading="Now Showing" scrollLeft={scrollLeft} scrollRight={scrollRight}>
      <div ref={scrollRef} className="grid grid-rows-2 grid-flow-col overflow-x-auto gap-4 scrollbar">
        {nowPlaying?.results?.map((playing, index) => (
          <div key={playing.id} className={`${index === 0 ? "md:row-span-2" : ""} relative group`}>
            <Link to={`/movie/details/${playing.id}`}>
              <div
                className={`${index === 0 ? "w-full md:w-[450px]" : "w-72 sm:w-96"} h-full overflow-hidden rounded-md`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${playing.backdrop_path}`}
                  alt=""
                  className={`object-cover ${
                    index === 0 ? "h-full" : "h-[270px]"
                  } group-hover:scale-110 overflow-hidden transition-transform duration-300`}
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
                  <div className="flex flex-col">
                    <div>
                      <h2 className="text-lg sm:text-2xl font-bold">{playing?.title}</h2>
                      <span className="text-gray-300">{playing.original_language}</span> •{" "}
                      <span className="text-sm text-gray-300">
                        {moment(playing?.release_date).format("MMMM D YYYY")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 w-full h-full bg-black/40 rounded-md overflow-hidden" />
            </Link>
            <div className="absolute bottom-20 z-10 right-40">
              {index === 0 && (
                <button className="bg-background-dark flex items-center justify-center gap-1 rounded-full py-1 px-4 mt-2.5">
                  <BsPlayFill className="text-2xl" />
                  <span>Trailler</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default NowShowing;
