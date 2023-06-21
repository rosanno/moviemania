import moment from "moment";
import { useGetNowPlayingQuery } from "../services/api";
import { BsPlayFill } from "react-icons/bs";
import Section from "./Section/Section";
import { Link } from "react-router-dom";
import useHorizontalScroll from "../hooks/useHorizontalScroll";
import MovieCard from "./MovieCard";

const NowShowing = () => {
  const { scrollRef, scrollLeft, scrollRight } = useHorizontalScroll();
  const { data: nowPlaying } = useGetNowPlayingQuery({ type: "movies" });

  return (
    <Section heading="Now Showing" scrollLeft={scrollLeft} scrollRight={scrollRight}>
      <div ref={scrollRef} className="grid grid-rows-2 grid-flow-col overflow-x-auto gap-4 scrollbar">
        {nowPlaying?.results?.map((item) => (
          <MovieCard key={item.id} media={item} />
        ))}
      </div>
    </Section>
  );
};

export default NowShowing;
