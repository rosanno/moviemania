import { useGetNowPlayingQuery } from "../services/api";
import Section from "./Section/Section";
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
