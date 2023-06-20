import Section from "./Section/Section";
import { useGetPopularTvQuery } from "../services/api";
import MovieCard from "./MovieCard";
import useHorizontalScroll from "../hooks/useHorizontalScroll";

const PopularTvShows = () => {
  const { scrollRef, scrollLeft, scrollRight } = useHorizontalScroll();
  const { data: tvShows } = useGetPopularTvQuery();

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
