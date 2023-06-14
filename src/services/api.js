import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api_key = import.meta.env.VITE_TMDB_API_KEY;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_TMDB_BASE_URL }),

  endpoints: (builder) => ({
    /**
     * Discover Movies
     */
    getDiscover: builder.query({
      query: (type) =>
        `/3/discover/${
          type === "movies" ? "movie" : "tv"
        }?api_key=${api_key}&language=en-US&page=1`,
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
      query: ({ type, id }) =>
        `/3/${
          type === "movie" ? "movie" : "tv"
        }/${id}/videos?api_key=${api_key}&language=en-US`,
    }),
    /**
     * Get Movies Logo
     */
    getLogo: builder.query({
      query: ({ type, id }) =>
        `/3/${
          type === "movie" ? "movie" : "tv"
        }/${id}/images?api_key=${api_key}`,
    }),
    getRuntime: builder.query({
      query: ({ type, id }) =>
        `/3/${
          type === "movie" ? "movie" : "tv"
        }/${id}?api_key=${api_key}&language=en-US`,
    }),
    /**
     * Popular movies
     */
    getPopular: builder.query({
      query: ({ type, page }) =>
        `/3/${
          type === "movies" ? "movie" : "tv"
        }/popular?api_key=${api_key}&language=en-US&page=${page}`,
      serializeQueryArgs: ({ endpoint }) => {
        return endpoint;
      },
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results);
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
        `/3/${
          type === "movies" ? "movie" : "tv"
        }/now_playing?api_key=${api_key}&language=en-US&page=1`,
    }),
    /**
     * Upcoming movies
     */
    getUpComingMovie: builder.query({
      query: () => `/3/movie/upcoming?api_key=${api_key}&language=en-US&page=1`,
    }),
    /**
     * Get single movies details
     */
    getMovieDetails: builder.query({
      query: (movie_id) =>
        `/3/movie/${movie_id}?api_key=${api_key}&language=en-US`,
    }),
    getPopularSeries: builder.query({
      query: () => `/3/tv/popular?api_key=${api_key}&language=en-US&page=1`,
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
  useGetPopularSeriesQuery,
} = tmdbApi;
