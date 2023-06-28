import { useEffect, useState } from "react";

const useInfinityScroll = (isFetching, page, setPage) => {
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (!loadMore) return;

    const onScroll = () => {
      const scrolledToBottom =
        document.documentElement.clientHeight + window.scrollY >= document.documentElement.offsetHeight * 0.8;
      if (scrolledToBottom && !isFetching) {
        console.log("Fetching more data...");
        setPage((prev) => prev + 1);
      }
    };

    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [loadMore, page, isFetching, setPage]);

  const handleLoadMore = () => {
    setLoadMore(true);
    setPage((prev) => prev + 1);
  };

  return [handleLoadMore];
};

export default useInfinityScroll;
