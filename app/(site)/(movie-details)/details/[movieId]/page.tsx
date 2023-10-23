import Credits from "@/components/credits";
import Media from "@/components/media";
import Billboard from "@/components/ui/billboard";
import Showcase from "@/components/ui/showcase";
import {
  getCredits,
  getMovieDetails,
  getRecommendations,
  getSimilar,
} from "@/lib/api";

interface MovieDetailsProps {
  params: {
    movieId: string;
  };
}

const MovieDetails = async ({ params }: MovieDetailsProps) => {
  const movie: Results = await getMovieDetails(params.movieId);
  const similarMovies = await getSimilar(params.movieId);
  const recommendationMovies = await getRecommendations(params.movieId);
  const credits = await getCredits(params.movieId);

  return (
    <>
      <Billboard backdrop_path={movie.backdrop_path} title={movie.title} />
      <Showcase movie={movie} />
      <div className="relative space-y-6 bg-black pb-28 sm:space-y-12 sm:pb-12 sm:mt-16">
        <Credits data={credits} />
        <Media label="Similar Movies" data={similarMovies} />
        <Media label="Recommendations" data={recommendationMovies} />
      </div>
    </>
  );
};

export default MovieDetails;
