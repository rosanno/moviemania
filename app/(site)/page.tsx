import Hero from "@/components/hero";
import Media from "@/components/media";
import Billboard from "@/components/ui/billboard";
import Showcase from "@/components/ui/showcase";
import {
  getDiscover,
  getNowPlaying,
  getTrendingMovies,
  getUpcomingMovies,
} from "@/lib/api";

const HomePage = async () => {
  const discovered: Discover = await getDiscover();
  const upcomingMovies: Discover = await getUpcomingMovies();
  const trendingMovies: Discover = await getTrendingMovies();
  const nowPlaying: Discover = await getNowPlaying();

  const movie = discovered.results[Math.floor(Math.random() * 6)];

  return (
    <>
      <Billboard backdrop_path={movie.backdrop_path} title={movie.title} />
      <Showcase movie={movie} />
      <div className="relative space-y-6 bg-black pb-28 sm:space-y-12 sm:pb-12 sm:mt-16">
        <Media label="Now Playing" data={nowPlaying} />
        <Media label="Upcoming Movies" data={upcomingMovies} />
        <Media label="Trending" data={trendingMovies} />
      </div>
    </>
  );
};

export default HomePage;
