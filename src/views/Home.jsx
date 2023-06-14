import Hero from "../components/Hero";
import Loader from "../components/Loader/Loader";
import NowShowing from "../components/NowShowing";
import Showcase from "../components/Showcase";
import Content from "../components/content/Content";
import { useGetRandomMovie } from "../hooks/useGetRandomMovie";
import { useGetPopularSeriesQuery, useGetTrendingQuery } from "../services/api";

const Home = () => {
  const { data, isLoading } = useGetTrendingQuery({ type: "movies" });
  const { randomMovie } = useGetRandomMovie(data);
  const { data: popularSeries } = useGetPopularSeriesQuery();

  return (
    <>
      <Hero media={randomMovie} />
      <Content variant="primary">
        {isLoading ? (
          <Loader />
        ) : (
          <Showcase media={randomMovie} isMediaSelected={false} />
        )}
      </Content>
      <Content isSpacerOnly>
        <NowShowing />
      </Content>
    </>
  );
};

export default Home;
