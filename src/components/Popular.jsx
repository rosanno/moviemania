import { Link } from "react-router-dom";
import moment from "moment";
import { IoImageOutline } from "react-icons/io5";

const Popular = ({ movie }) => {
  return (
    <Link to={`/movie/details/${movie?.id}`} className="mt-4">
      {movie?.poster_path !== null ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
          alt={movie?.title}
          className="w-full md:max-w-[200px] h-[250px] md:max-h-[250px] rounded-md overflow-hidden"
        />
      ) : (
        <div className="w-full md:max-w-[200px] h-[250px] md:max-h-[250px] bg-gray-300 rounded-md flex items-center justify-center">
          <IoImageOutline className="text-gray-400 text-2xl" />
        </div>
      )}
      <div>
        <h4 className="text-sm mt-2 font-semibold truncate overflow-hidden">
          {movie?.title ? movie?.title : movie?.name}
        </h4>
        <p className="text-sm text-gray-400 mt-1">
          {movie?.release_date
            ? moment(movie?.release_date).format("MMMM D YYYY")
            : moment(movie?.first_air_date).format("MMMM D YYYY")}
        </p>
      </div>
    </Link>
  );
};

export default Popular;
