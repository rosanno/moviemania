import { useEffect, useState } from "react";

import Grid from "../components/Grid/Grid";
import Popular from "../components/Popular";
import Content from "../components/content/Content";
import Button from "../components/Button/Button";
import { useGetMovieGenreQuery, useGetPopularQuery } from "../services/api";

const sorts = [
  {
    value: "popularity.asc",
    label: "Popularity Ascending",
  },
  {
    value: "popularity.desc",
    label: "Popularity Descending",
  },
  {
    value: "vote_average.asc",
    label: "Rating Ascending",
  },
  {
    value: "vote_average.desc",
    label: "Rating Descending",
  },
  {
    value: "primary_release_date.asc",
    label: "Release Date Ascending",
  },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
];

const TvShows = () => {
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [genre, setGenre] = useState([]);
  const [sort, setSort] = useState(sorts[1]);
  const [seletedWatchProviders, setSelectedWatchProviders] = useState([]);
  const {
    data: popular,
    isLoading,
    isFetching,
  } = useGetPopularQuery({ type: "tv", page, genre, seletedWatchProviders, sort: sort.value });

  useEffect(() => {
    if (!loadMore) return;

    const onScroll = () => {
      const scrolledToBottom =
        document.documentElement.clientHeight + window.scrollY >= document.documentElement.offsetHeight * 0.9;
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
          <h1 className="text-2xl sm:text-3xl font-bold capitalize mb-1 sm:mb-4">Popular TV Shows</h1>
          <Grid>
            {isLoading ? (
              <h1>Loading...</h1>
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
              <Button handleClick={handleLoadMore}>Load more...</Button>
            </div>
          )}
        </div>
      </Content>
    </>
  );
};

export default TvShows;
