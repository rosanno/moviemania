import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api_key = import.meta.env.VITE_TMDB_API_KEY;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_TMDB_BASE_URL }),
  tagTypes: ["Popular", "Providers"],

  endpoints: (builder) => ({
    /**
     * Discover Movies
     */
    getDiscover: builder.query({
      query: (type) => `/3/discover/${type === "movies" ? "movie" : "tv"}?api_key=${api_key}&language=en-US&page=1`,
      keepUnusedDataFor: 5,
    }),
    /**
     * Get trending movies
     */
    getTrending: builder.query({
      query: ({ type }) =>
        `/3/trending/${
          type === "movies" ? "movie" : type === "series" ? "tv" : "all"
        }/day?api_key=${api_key}&language=en-US`,
    }),
    /**
     * Get Movies Videos
     */
    getVideo: builder.query({
      query: ({ type, id }) => `/3/${type === "movie" ? "movie" : "tv"}/${id}/videos?api_key=${api_key}&language=en-US`,
    }),
    /**
     * Get Movies Logo
     */
    getLogo: builder.query({
      query: ({ type, id }) => `/3/${type === "movie" ? "movie" : "tv"}/${id}/images?api_key=${api_key}`,
    }),
    getRuntime: builder.query({
      query: ({ type, id }) => `/3/${type === "movie" ? "movie" : "tv"}/${id}?api_key=${api_key}&language=en-US`,
    }),
    /**
     * Popular movies
     */
    getPopular: builder.query({
      query: ({ type, page, genre, region, seletedWatchProviders, fromDate, toDate, sort }) =>
        `/3/discover/${type === "movies" ? "movie" : "tv"}?api_key=${api_key}&with_genres=${
          genre.length !== 0 ? genre.join(",") : ""
        }&watch_region=${region ? region : "PH"}&with_watch_providers=${
          seletedWatchProviders.length !== 0 ? seletedWatchProviders.join(",") : ""
        }&primary_release_date.gte=${fromDate !== undefined ? fromDate : ""}&release_date.lte=${
          toDate !== undefined ? toDate : ""
        }&sort_by=${sort}&language=en-US&page=${page}`,
      providesTags: ["Popular"],
      keepUnusedDataFor: 5,
      serializeQueryArgs: ({ queryArgs, endpoint }) => {
        const { genre, region, seletedWatchProviders, fromDate, toDate, type, sort } = queryArgs;
        return { genre, region, seletedWatchProviders, fromDate, toDate, type, sort };
      },
      merge: (currentCache, newItems, currentArg) => {
        if (currentArg.arg.page === 1) {
          newItems.results;
        } else {
          currentCache.results.push(...newItems.results);
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    /**
     * Get latest movies
     */
    getNowPlaying: builder.query({
      query: ({ type }) =>
        `/3/${type === "movies" ? "movie" : "tv"}/now_playing?api_key=${api_key}&language=en-US&page=1`,
    }),
    /**
     * Upcoming movies
     */
    getUpComingMovie: builder.query({
      query: ({ date }) =>
        `/3/movie/upcoming?api_key=${api_key}&primary_release_date.gte=${date ? date : ""}&language=en-US&page=1`,
    }),
    /**
     * Get single movies details
     */
    getMovieDetails: builder.query({
      query: (movie_id) => `/3/movie/${movie_id}?api_key=${api_key}&language=en-US`,
    }),
    getMovieGenre: builder.query({
      query: ({ type }) => `/3/genre/${type === "movies" ? "movie" : "tv"}/list?api_key=${api_key}&language=en`,
    }),
    /**
     * Get regions
     */
    getRegions: builder.query({
      query: () => `/3/watch/providers/regions?api_key=${api_key}&language=en-US`,
    }),
    /**
     * Watch providers
     */
    getWatchProviders: builder.query({
      query: ({ type, selectedRegion }) =>
        `3/watch/providers/${type}?api_key=${api_key}&language=en-US&watch_region=${selectedRegion.iso_3166_1}`,
      providesTags: ["Providers"],
    }),
    getPopularPeople: builder.query({
      query: (page) => `/3/person/popular?api_key=${api_key}&language=en-US&page=${page}`,
    }),
    getPopularTv: builder.query({
      query: () => `/3/tv/airing_today?api_key=${api_key}&with_origin_country=PH&language=en-US&page=1`,
    }),
  }),
});

export const {
  useGetDiscoverQuery,
  useGetNowPlayingQuery,
  useGetUpComingMovieQuery,
  useGetMovieDetailsQuery,
  useGetVideoQuery,
  useGetLogoQuery,
  useGetTrendingQuery,
  useGetRuntimeQuery,
  useGetPopularQuery,
  useGetMovieGenreQuery,
  useGetRegionsQuery,
  useGetWatchProvidersQuery,
  useGetPopularPeopleQuery,
  useGetPopularTvQuery,
} = tmdbApi;
