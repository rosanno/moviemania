import { convertRuntime } from "@/lib/utils";
import { Badge } from "./badge";
import { Button } from "./button";
import { Play } from "lucide-react";

interface ShowcaseProps {
  movie: Results;
}

const Showcase = ({ movie }: ShowcaseProps) => {
  return (
    <section className="-mt-[100px] sm:-mt-[400px] lg:-mt-[650px] xl:-mt-[750px]">
      <div className="space-y-6 sm:max-w-lg px-5 md:pl-12 overflow-y-hidden sm:mt-80">
        <h1 className="text-white text-5xl sm:leading-tight font-bold">
          {movie.title}
        </h1>
        <div className="space-y-4">
          <div>
            <span className="text-gray-200 text-xs sm:text-sm">
              {movie.release_date.slice(0, 4)
                ? movie.release_date.slice(0, 4)
                : "New"}{" "}
              • {convertRuntime(movie?.runtime)} •{" "}
            </span>
            <Badge
              variant={
                movie.vote_average < 5
                  ? "destructive"
                  : movie.vote_average < 7
                  ? "warning"
                  : "success"
              }
            >
              {movie.vote_average.toFixed(1)}
            </Badge>
            <span className="text-white"> • </span>
            <Badge variant={movie.adult ? "destructive" : "default"}>
              {movie.adult ? "18+" : "PG"}
            </Badge>
          </div>
        </div>
        <div className="overflow-auto scrollbar-none sm:max-h-12">
          <p className="text-xs sm:text-base leading-5 text-white">
            {movie.overview}
          </p>
        </div>
        <Button variant="destructive" size="lg" className="w-full sm:w-auto">
          <Play className="mr-1" />
          Watch Now
        </Button>
      </div>
    </section>
  );
};

export default Showcase;
