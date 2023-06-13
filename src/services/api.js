import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api_key = import.meta.env.VITE_TMDB_API_KEY;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_TMDB_BASE_URL }),

  endpoints: (builder) => ({
    getDiscover: builder.query({
      query: (type) =>
        `/3/discover/${
          type === "movies" ? "movie" : "tv"
        }?api_key=${api_key}&language=en-US&page=1`,
      keepUnusedDataFor: 5,
    }),
    getTrending: builder.query({
      query: ({ type }) =>
        `/3/trending/${
          type === "movies" ? "movie" : type === "series" ? "tv" : "all"
        }/day?api_key=${api_key}&language=en-US`,
    }),
    getVideo: builder.query({
      query: ({ type, id }) =>
        `/3/${
          type === "movie" ? "movie" : "tv"
        }/${id}/videos?api_key=${api_key}&language=en-US`,
    }),
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
    getNowPlaying: builder.query({
      query: () =>
        `/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1`,
    }),
    getUpComingMovie: builder.query({
      query: () => `/3/movie/upcoming?api_key=${api_key}&language=en-US&page=1`,
    }),
    getMovieDetails: builder.query({
      query: (movie_id) =>
        `/3/movie/${movie_id}?api_key=${api_key}&language=en-US`,
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
} = tmdbApi;
