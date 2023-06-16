import { useEffect, useState } from "react";

import Grid from "../components/Grid/Grid";
import Popular from "../components/Popular";
import Content from "../components/content/Content";
import { useGetMovieGenreQuery, useGetPopularQuery } from "../services/api";
import SkeletonLoader from "../components/SkeletonLoader";

const PopularMovies = () => {
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const {
    data: popular,
    isLoading,
    isFetching,
  } = useGetPopularQuery({ type: "movies", page });
  const { data: genre } = useGetMovieGenreQuery({ type: "movies" });

  useEffect(() => {
    if (!loadMore) return;

    const onScroll = () => {
      const scrolledToBottom =
        document.documentElement.clientHeight + window.scrollY >=
        document.documentElement.offsetHeight * 0.9;
      if (scrolledToBottom && !isFetching) {
        console.log("Fetching more data...");
        setPage((prev) => prev + 1);
      }
    };

    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [page, isFetching, loadMore]);

  const handleLoadMore = () => {
    setLoadMore(true);
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <Content variant="secondary">
        <div className="mt-16 sm:mt-20 md:mt-32 px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold capitalize mb-1 sm:mb-4">
            Popular Movies
          </h1>
          <Grid>
            {isLoading ? (
              Array.from({ length: 20 }).map((_, index) => (
                <SkeletonLoader key={index} />
              ))
            ) : (
              <>
                {popular?.results?.map((movie, index) => (
                  <Popular key={index} movie={movie} />
                ))}
              </>
            )}
          </Grid>
          {!loadMore && (
            <div className="flex justify-center">
              <button
                className="bg-red-800 w-full md:w-1/2 rounded-md py-2 mt-7"
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
