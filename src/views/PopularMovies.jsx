import { Suspense, lazy, useEffect, useState } from "react";

import Grid from "../components/Grid/Grid";
import Content from "../components/content/Content";
import {
  useGetMovieGenreQuery,
  useGetPopularQuery,
  useGetRegionsQuery,
  useGetWatchProvidersQuery,
} from "../services/api";
import Genre from "../components/Genre";
import DateInput from "../components/DateInput";
import FilteringCard from "../components/FilteringCard";
import Loader from "../components/Loader/Loader";
import SortSelect from "../components/SortSelect";
import CountrySelect from "../components/CountrySelect";
import NoResults from "../components/NoResults";

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
  const [selectedRegion, setSelectedRegion] = useState({
    iso_3166_1: "PH",
    english_name: "Philippines",
  });
  const [sort, setSort] = useState(sorts[1]);
  const [seletedWatchProviders, setSelectedWatchProviders] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const { data: popular, isFetching } = useGetPopularQuery({
    type: "movies",
    page,
    genre,
    region: selectedRegion.iso_3166_1,
    seletedWatchProviders,
    fromDate,
    toDate,
    sort: sort.value,
  });
  const { data: regions } = useGetRegionsQuery();
  const { data: watchProviders } = useGetWatchProvidersQuery({ type: "movie", selectedRegion });
  const { data: genres } = useGetMovieGenreQuery({ type: "movies" });

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

  const handleGenre = (genreId) => {
    setGenre((prevGenre) => {
      const updatedGenre = prevGenre.includes(genreId)
        ? prevGenre.filter((id) => id !== genreId)
        : [...prevGenre, genreId];
      return updatedGenre;
    });
  };

  const handleWatchProvider = (providerId) => {
    setSelectedWatchProviders((prevProvider) => {
      const updateProvider = prevProvider.includes(providerId)
        ? prevProvider.filter((id) => id !== providerId)
        : [...prevProvider, providerId];
      return updateProvider;
    });
  };

  const handleSelectedRegion = (selected) => {
    setSelectedRegion(selected);
    setSelectedWatchProviders([]);
  };

  const handleLoadMore = () => {
    setLoadMore(true);
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <Content variant="secondary">
        <div className="mt-16 sm:mt-20 md:mt-32 px-4 sm:px-6 transition-all duration-1000 ease-in">
          <div>
            <h1 className="text-xl sm:text-2xl font-medium capitalize mb-1 sm:mb-4">Popular Movies</h1>
          </div>
          <Grid variant="primary" gap="5">
            <div className="hidden md:block">
              <FilteringCard heading="Sort">
                <div className="px-4">
                  <SortSelect data={sorts} sort={sort} setSort={setSort} label="Sort Results By" />
                </div>
              </FilteringCard>
              <FilteringCard heading="Where to Watch">
                <div className="px-4">
                  <CountrySelect
                    data={regions?.results}
                    selectedRegion={selectedRegion}
                    handleSelectedRegion={handleSelectedRegion}
                  />
                </div>
                <div className="px-4 mt-2 overflow-y-scroll max-h-[360px] scrollbar scroll-smooth">
                  <div className="grid grid-cols-4 gap-3 mt-4">
                    {watchProviders?.results?.map((provider) => (
                      <div key={provider.provider_id} className="relative rounded-md overflow-hidden">
                        <button
                          onClick={() => handleWatchProvider(provider.provider_id)}
                          className="rounded-md overflow-hidden bg-[#FFAE06]"
                        >
                          <img
                            src={`https://www.themoviedb.org/t/p/original${provider.logo_path}`}
                            alt=""
                            className={`hover:opacity-30 ${
                              seletedWatchProviders.includes(provider.provider_id) ? "opacity-30" : ""
                            } transition duration-300`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </FilteringCard>
              <FilteringCard heading="Filters" subHeading="Genre" divider dateInputs>
                <div className="flex flex-wrap items-center gap-2 mt-3 px-4">
                  {genres?.genres?.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleGenre(item.id)}
                      className={`text-sm text-gray-400 hover:bg-[#FFAE06] hover:text-white ${
                        genre.includes(item.id) ? "bg-[#FFAE06] text-white" : "bg-neutral-700"
                      } transition duration-300 px-6 py-1.5 rounded-full`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
                <div className="border-t border-t-gray-600 my-4" />
                <div className="px-4">
                  <h4 className="text-sm font-light">Release Dates</h4>
                  <div className="mt-2">
                    <DateInput label="From" setDate={setFromDate} />
                    <DateInput label="To" setDate={setToDate} />
                  </div>
                </div>
              </FilteringCard>
            </div>
            <div className="col-span-12">
              {popular?.results.length === 0 ? (
                <NoResults />
              ) : (
                <Suspense fallback={<Loader />}>
                  <Grid>
                    <LazyPopularMovies popular={popular} />
                  </Grid>
                  <div className="flex justify-center">
                    <button
                      className="bg-[#FFC54E] w-full sm:w-1/2 xl:w-1/3 rounded-md py-2 mt-7"
                      onClick={handleLoadMore}
                    >
                      Load more...
                    </button>
                  </div>
                </Suspense>
              )}
            </div>
          </Grid>
        </div>
      </Content>
    </>
  );
};

export default PopularMovies;
