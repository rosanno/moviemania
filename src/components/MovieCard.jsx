import moment from "moment";
import { Link } from "react-router-dom";

const MovieCard = ({ media }) => {
  return (
    <Link to={`/movies/details/${media.id}`} key={media.id}>
      <div className="relative group overflow-hidden">
        <div className="w-72 sm:w-96 rounded-md overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w500${media?.backdrop_path}`}
            alt=""
            className="rounded-md h-[270px] object-cover group-hover:scale-110 overflow-hidden transition-transform duration-300"
          />
        </div>
        <div className="absolute bottom-10 z-10 px-5">
          <h2 className="text-lg sm:text-2xl font-bold">{media?.title || media?.name}</h2>
          <span className="text-gray-300">{media.original_language}</span> •{" "}
          <span className="text-sm text-gray-300">{moment(media?.release_date).format("MMMM D YYYY")}</span>
        </div>
        <div className="absolute top-0 w-full h-full bg-black/40 rounded-md overflow-hidden" />
      </div>
    </Link>
  );
};

export default MovieCard;
