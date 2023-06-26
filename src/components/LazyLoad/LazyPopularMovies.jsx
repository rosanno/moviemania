import Popular from "../Popular";

const LazyPopularMovies = ({ popular }) => {
  return (
    <>
      {popular?.results?.map((movie, index) => (
        <Popular key={index} movie={movie} isType="movie" />
      ))}
    </>
  );
};

export default LazyPopularMovies;
