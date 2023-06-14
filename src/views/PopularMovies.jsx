import { useState } from "react";
import Grid from "../components/Grid/Grid";
import Popular from "../components/Popular";
import Content from "../components/content/Content";
import { useGetMovieGenreQuery, useGetPopularQuery } from "../services/api";
import { useGenre } from "../hooks/useGenre";

const PopularMovies = () => {
  const [page, setPage] = useState(1);
  const {
    data: popular,
    isLoading,
    isFetching,
  } = useGetPopularQuery({ type: "movies", page });
  const { data: genre } = useGetMovieGenreQuery({ type: "movies" });
  useGenre(popular?.results, genre);

  return (
    <>
      <Content variant="secondary">
        <div className="mt-16 sm:mt-20 md:mt-32 px-4 sm:px-6">
          <h1 className="md:text-2xl mb-1 sm:mb-4">Popular Movies</h1>
          <Grid>
            {popular?.results?.map((movie) => (
              <Popular key={movie.id} movie={movie} />
            ))}
          </Grid>
        </div>
      </Content>
    </>
  );
};

export default PopularMovies;
