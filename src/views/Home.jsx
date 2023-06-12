import Hero from "../components/Hero";
import { useGetRandomMovie } from "../hooks/useGetRandomMovie";
import { useGetTrendingQuery } from "../services/api";

const Home = () => {
  const { data } = useGetTrendingQuery({ type: "movies" });
  const { randomMovie } = useGetRandomMovie(data);

  return (
    <>
      <Hero media={randomMovie} />
    </>
  );
};

export default Home;
