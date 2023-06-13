import Hero from "../components/Hero";
import Showcase from "../components/Showcase";
import Content from "../components/content/Content";
import { useGetRandomMovie } from "../hooks/useGetRandomMovie";
import { useGetTrendingQuery } from "../services/api";

const Home = () => {
  const { data } = useGetTrendingQuery({ type: "movies" });
  const { randomMovie } = useGetRandomMovie(data);

  return (
    <>
      <Hero media={randomMovie} />
      <Content variant="primary">
        <Showcase media={randomMovie} isMediaSelected={false} />
      </Content>
    </>
  );
};

export default Home;
