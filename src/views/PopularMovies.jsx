import { Suspense, lazy, useEffect, useState } from "react";

import Grid from "../components/Grid/Grid";
import Content from "../components/content/Content";
import { useGetMovieGenreQuery, useGetPopularQuery } from "../services/api";
import SkeletonLoader from "../components/SkeletonLoader";
import Genre from "../components/Genre";
import DateInput from "../components/DateInput";

const LazyPopularMovies = lazy(() =>
  import("../components/LazyLoad/LazyPopularMovies")
);

const PopularMovies = () => {
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState([]);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [loadMore, setLoadMore] = useState(false);
  const { data: popular, isFetching } = useGetPopularQuery({
    type: "movies",
    page,
    genre,
    fromDate,
    toDate,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const { data: genres } = useGetMovieGenreQuery({ type: "movies" });

  useEffect(() => {
    if (!loadMore) return;

    const onScroll = () => {
      const scrolledToBottom =
        document.documentElement.clientHeight + window.scrollY >=
        document.documentElement.offsetHeight * 0.9;
      setIsLoaded(true);
      if (scrolledToBottom && !isFetching) {
        console.log("Fetching more data...");
        setPage((prev) => prev + 1);
        setIsLoaded(false);
      }
    };

    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [page, isFetching, loadMore]);

  const handleGenre = (genreId) => {
    setGenre((prevGenre) => {
      const updatedGenre = prevGenre.includes(genreId)
        ? prevGenre.filter((id) => id !== genreId)
        : [...prevGenre, genreId];
      return updatedGenre;
    });
  };

  const handleLoadMore = () => {
    setLoadMore(true);
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <Content variant="secondary">
        <div className="mt-16 sm:mt-20 md:mt-32 px-4 sm:px-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold capitalize mb-1 sm:mb-4">
              Popular Movies
            </h1>

            <div className="flex flex-col md:flex-row md:items-center mt-5 sm:mt-7 md:gap-5">
              <Genre genres={genres} genre={genre} handleGenre={handleGenre} />
              <DateInput label="From" setDate={setFromDate} />
              <DateInput label="To" setDate={setToDate} />
            </div>
          </div>
          <Grid>
            <Suspense fallback={<SkeletonLoader loader={20} />}>
              <LazyPopularMovies popular={popular} />
            </Suspense>
            {isLoaded && <SkeletonLoader loader={20} />}
          </Grid>
          {!loadMore && (
            <div className="flex justify-center">
              <button
                className="bg-action-dark w-full sm:w-1/2 xl:w-1/3 rounded-md py-2 mt-7"
                onClick={handleLoadMore}
              >
                Load more...
              </button>
            </div>
          )}
        </div>
      </Content>
    </>
  );
};

export default PopularMovies;
