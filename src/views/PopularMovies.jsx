import { Suspense, lazy, useEffect, useState } from "react";

import Grid from "../components/Grid/Grid";
import Content from "../components/content/Content";
import {
  useGetMovieGenreQuery,
  useGetPopularQuery,
  useGetRegionsQuery,
  useGetWatchProvidersQuery,
} from "../services/api";
import SkeletonLoader from "../components/SkeletonLoader";
import Genre from "../components/Genre";
import DateInput from "../components/DateInput";
import FilteringCard from "../components/FilteringCard";
import Loader from "../components/Loader/Loader";

const LazyPopularMovies = lazy(() => import("../components/LazyLoad/LazyPopularMovies"));

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

const PopularMovies = () => {
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState([]);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [selectedProvider, setSelectedProvider] = useState("PH");
  const [loadMore, setLoadMore] = useState(false);
  const {
    data: popular,
    isFetching,
    isLoading,
  } = useGetPopularQuery({
    type: "movies",
    page,
    genre,
    fromDate,
    toDate,
  });
  const { data: regions } = useGetRegionsQuery();
  const { data: watchProviders } = useGetWatchProvidersQuery();
  const [isLoaded, setIsLoaded] = useState(false);
  const { data: genres } = useGetMovieGenreQuery({ type: "movies" });

  useEffect(() => {
    if (!loadMore) return;

    const onScroll = () => {
      const scrolledToBottom =
        document.documentElement.clientHeight + window.scrollY >= document.documentElement.offsetHeight * 0.9;
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
            <h1 className="text-2xl sm:text-3xl font-bold capitalize mb-1 sm:mb-4">Popular Movies</h1>

            {/* <div className="flex flex-col md:flex-row md:items-center mt-5 sm:mt-7 md:gap-5">
              <Genre genres={genres} genre={genre} handleGenre={handleGenre} />
              <DateInput label="From" setDate={setFromDate} />
              <DateInput label="To" setDate={setToDate} />
            </div> */}
          </div>
          <Grid variant="primary" gap="5">
            <div className="hidden md:block">
              <FilteringCard heading="Sort" subHeading="Sort Results By">
                <div className="px-4">
                  <select className="rounded-md outline-none py-2 px-2.5 text-sm w-full mt-1">
                    {sorts.map((sort) => (
                      <option key={sort.value} value={sort.value}>
                        {sort.label}
                      </option>
                    ))}
                  </select>
                </div>
              </FilteringCard>
              <FilteringCard heading="Where to Watch" subHeading="Country">
                <div className="px-4">
                  <select value={selectedProvider} className="rounded-md outline-none py-2 px-2.5 text-sm w-full mt-1">
                    {regions?.results?.map((region) => (
                      <option key={region.english_name} value={region.iso_3166_1}>
                        {region.english_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="px-4 mt-2 overflow-y-scroll max-h-[360px] scrollbar scroll-smooth">
                  <div className="grid grid-cols-4 gap-3 mt-4">
                    {watchProviders?.results?.map((provider) => (
                      <button key={provider.provider_id} className="rounded-md overflow-hidden">
                        <img src={`https://www.themoviedb.org/t/p/original${provider.logo_path}`} alt="" />
                      </button>
                    ))}
                  </div>
                </div>
              </FilteringCard>
              <FilteringCard heading="Filters" subHeading="Genre" divider dateInputs>
                <div className="flex flex-wrap items-center gap-2 mt-3 px-4">
                  {genres?.genres?.map((genre) => (
                    <button
                      key={genre.id}
                      className="text-sm text-gray-400 bg-neutral-700 hover:bg-neutral-500 hover:text-white transition duration-300 px-6 py-1.5 rounded-full"
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
                <div className="border-t border-t-gray-600 my-4" />
                <div className="px-4">
                  <h4 className="text-sm font-light">Release Dates</h4>
                  <div className="mt-2">
                    <DateInput label="From" />
                    <DateInput label="To" />
                  </div>
                  <button className="bg-neutral-600 shadow-md mt-3 py-2 rounded-md w-full">Filter</button>
                </div>
              </FilteringCard>
            </div>
            <div className="col-span-12">
              <Grid>
                <Suspense fallback={<Loader />}>
                  <LazyPopularMovies popular={popular} />
                </Suspense>
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
          </Grid>
        </div>
      </Content>
    </>
  );
};

export default PopularMovies;
