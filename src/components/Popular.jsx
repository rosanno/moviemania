import { Link } from "react-router-dom";
import moment from "moment";

const Popular = ({ movie }) => {
  return (
    <Link to={`/movie/details/${movie?.id}`} className="mt-4">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
        alt={movie?.title}
        className="rounded-md overflow-hidden"
      />
      <div>
        <h4 className="text-sm mt-2 font-semibold truncate overflow-hidden">{movie?.title || movie?.name}</h4>
        <p className="text-sm text-gray-400 mt-1">{moment(movie?.release_date).format("MMMM D YYYY")}</p>
      </div>
    </Link>
  );
};

export default Popular;
