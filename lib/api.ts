import { API } from "./utils";

export async function getDiscover() {
  try {
    const response = await API.get("/discover/movie");

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getUpcomingMovies() {
  try {
    const response = await API.get("/movie/upcoming");

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getTrendingMovies() {
  try {
    const response = await API.get("/trending/movie/day");

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getNowPlaying() {
  try {
    const response = await API.get("/movie/now_playing");

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMovieDetails(movie_id: Number | string) {
  try {
    const response = await API.get(`/movie/${movie_id}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getSimilar(movie_id: Number | string) {
  try {
    const response = await API.get(`/movie/${movie_id}/similar`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getRecommendations(movie_id: Number | string) {
  try {
    const response = await API.get(`/movie/${movie_id}/recommendations`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCredits(movied_id: Number | string) {
  try {
    const response = await API.get(`/movie/${movied_id}/credits`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
