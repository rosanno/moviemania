import { Suspense, lazy, useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";

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
import FilteringSidebar from "../components/FilteringSidebar";
import { Oval } from "react-loader-spinner";

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
  const [handleLoadMore, loadMore] = useInfinityScroll(isFetching, page, setPage);
  const [open, setOpen] = useState(false);

  const handleSelectedRegion = (selected) => {
    setSelectedRegion(selected);
    resetWatchProviders();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <FilteringSidebar
        open={open}
        setOpen={setOpen}
        sort={sort}
        setSort={setSort}
        data={regions?.results}
        selectedRegion={selectedRegion}
        handleSelectedRegion={handleSelectedRegion}
        genres={genres}
        handleGenre={handleGenre}
        genre={genre}
        setFromDate={setFromDate}
        setToDate={setToDate}
        watchProviders={watchProviders?.results}
        selectedWatchProviders={selectedWatchProviders}
        handleWatchProvider={handleWatchProvider}
      />
      <Content variant="secondary">
        <div className="mt-16 sm:mt-20 md:mt-32 px-3 sm:px-6 transition-all duration-1000 ease-in">
          <div>
            <h1 className="text-xl sm:text-2xl font-medium capitalize mb-1 sm:mb-4">Movies</h1>
          </div>
          <div className="block md:hidden mt-4 md:mt-0">
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-1 bg-gray-600/40 px-4 py-1 rounded-md hover:bg-gray-600/60 transition duration-300"
            >
              <FaFilter className="text-xs" />
              <span className="text-sm">Filter</span>
            </button>
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
                  <WatchProvider
                    data={watchProviders?.results}
                    selectedWatchProviders={selectedWatchProviders}
                    handleWatchProvider={handleWatchProvider}
                  />
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
                  {loadMore && isFetching && (
                    <div className="flex justify-center mt-6">
                      <Oval
                        height={40}
                        width={40}
                        color="#404144"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#404144"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                      />
                    </div>
                  )}
                  {popular?.total_pages !== 1 && (
                    <div className="flex justify-center">
                      <Button handleClick={handleLoadMore}>Load more...</Button>
                    </div>
                  )}
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
