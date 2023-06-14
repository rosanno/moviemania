import Hero from "../components/Hero";
import Loader from "../components/Loader/Loader";
import NowShowing from "../components/NowShowing";
import Showcase from "../components/Showcase";
import Content from "../components/content/Content";
import { useGetRandomMovie } from "../hooks/useGetRandomMovie";

import { useGetTrendingQuery } from "../services/api";
import UpcomingMovie from "../components/UpcomingMovie";

const Home = () => {
  const { data, isLoading } = useGetTrendingQuery({ type: "movies" });
  const { randomMovie } = useGetRandomMovie(data);

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
        <UpcomingMovie />
      </Content>
    </>
  );
};

export default Home;
