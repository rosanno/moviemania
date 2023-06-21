import { Suspense, lazy, useState } from "react";

import Grid from "../components/Grid/Grid";
import Content from "../components/content/Content";
import {
  useGetMovieGenreQuery,
  useGetPopularQuery,
  useGetRegionsQuery,
  useGetWatchProvidersQuery,
} from "../services/api";
import DateInput from "../components/DateInput";
import FilteringCard from "../components/FilteringCard";
import Loader from "../components/Loader/Loader";
import SortSelect from "../components/SortSelect";
import CountrySelect from "../components/CountrySelect";
import NoResults from "../components/NoResults";
import Button from "../components/Button/Button";
import useSelection from "../hooks/useSelection";
import useInfinityScroll from "../hooks/useInfinityScroll";
import Genre from "../components/Genre";
import WatchProvider from "../components/WatchProvider";
import { sorts } from "../constant/sorts";

const LazyPopularMovies = lazy(() => import("../components/LazyLoad/LazyPopularMovies"));

const PopularMovies = () => {
  const [page, setPage] = useState(1);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [selectedRegion, setSelectedRegion] = useState({
    iso_3166_1: "PH",
    english_name: "Philippines",
  });
  const [sort, setSort] = useState(sorts[1]);
  const [genre, handleGenre] = useSelection([]);
  const [selectedWatchProviders, handleWatchProvider, resetWatchProviders] = useSelection([]);
  const { data: popular, isFetching } = useGetPopularQuery({
    type: "movies",
    page,
    genre,
    region: selectedRegion.iso_3166_1,
    selectedWatchProviders,
    fromDate,
    toDate,
    sort: sort.value,
  });
  const { data: regions } = useGetRegionsQuery();
  const { data: watchProviders } = useGetWatchProvidersQuery({ type: "movie", selectedRegion });
  const { data: genres } = useGetMovieGenreQuery({ type: "movies" });
  const [handleLoadMore] = useInfinityScroll(isFetching, page, setPage);

  const handleSelectedRegion = (selected) => {
    setSelectedRegion(selected);
    resetWatchProviders();
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
                      <WatchProvider
                        key={provider.provider_id}
                        selectedWatchProviders={selectedWatchProviders}
                        provider={provider}
                        handleWatchProvider={handleWatchProvider}
                      />
                    ))}
                  </div>
                </div>
              </FilteringCard>
              <FilteringCard heading="Filters" subHeading="Genre" divider dateInputs>
                <Genre genres={genres} handleGenre={handleGenre} genre={genre} />
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
                    <Button handleClick={handleLoadMore}>Load more...</Button>
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
