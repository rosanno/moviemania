import { useEffect, useState } from "react";

import Grid from "../components/Grid/Grid";
import People from "../components/People";
import Content from "../components/content/Content";
import { useGetPopularPeopleQuery } from "../services/api";
import Button from "../components/Button/Button";

const PopularPeople = () => {
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const { data: people, isLoading, isFetching } = useGetPopularPeopleQuery({ page });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <h1 className="text-xl sm:text-2xl font-medium capitalize mb-1 sm:mb-4">Popular People</h1>
          <Grid>
            {isLoading ? (
              <h1>Loading</h1>
            ) : (
              <>
                {people?.results?.map((movie, index) => (
                  <People key={index} movie={movie} />
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

export default PopularPeople;
