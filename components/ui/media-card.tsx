import { useEffect, useState } from "react";
import { Bookmark, PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { getMovieDetails } from "@/lib/api";
import { convertRuntime } from "@/lib/utils";
import { Button } from "./button";
import { Badge } from "./badge";

interface MediaCardProps {
  movie: Results;
}

interface GenresProps {
  id: number;
  name: string;
}

const MediaCard = ({ movie }: MediaCardProps) => {
  const router = useRouter();
  const [movieRuntime, setMovieRuntime] = useState<string>("");
  const [genres, setGenres] = useState<GenresProps[]>([]);

  const onNavigate = () => router.push(`/details/${movie.id}`);

  const movieDetails = async () => {
    const result = await getMovieDetails(movie.id);

    const runtime = convertRuntime(result.runtime);

    setMovieRuntime(runtime);
    setGenres(result.genres);
  };

  useEffect(() => {
    movieDetails();
  }, []);

  return (
    <div className="group cursor-pointer" onClick={onNavigate}>
      <div className="rounded-md overflow-hidden relative">
        <Image
          src={`${
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
          }`}
          alt={movie.title}
          width={280}
          height={280}
          className="
              w-full
              h-full
              group-hover:scale-110 
              group-hover:opacity-30 
              transition-transform 
              duration-300
            "
        />
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md rounded-full p-2">
          <Bookmark className="h-4 w-4 text-white" />
        </div>
        <div
          className="
              absolute 
              z-20 
              top-1/2
              -translate-y-1/2 
              left-1/2 
              -translate-x-1/2 
              opacity-0 
              group-hover:opacity-100 
              transition 
              duration-300
            "
        >
          <PlayCircle className="h-16 w-16 text-white" />
        </div>
      </div>
      <div className="pt-3">
        <h3 className="text-white text-sm font-semibold truncate">
          {movie.title}
        </h3>
        <div className="pt-2 flex items-center justify-between w-full">
          <h4 className="text-gray-400 text-xs">
            {movie.release_date.slice(0, 4)} • {movieRuntime}
          </h4>
          <Badge variant={movie.adult ? "destructive" : "default"}>
            {movie.adult ? "18+" : "PG"}
          </Badge>
        </div>
        <div className="pt-1.5">
          <div className="flex flex-wrap gap-1 items-center">
            {genres.map((item, index) => (
              <h3 key={item.id} className="text-gray-400 text-xs">
                {item.name}
                {index !== genres.length - 1 && " • "}
              </h3>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
