import { Link } from "react-router-dom";
import { IoImageOutline } from "react-icons/io5";

const Popular = ({ movie }) => {
  const known_for = movie?.known_for.map((item) => item.original_title || item.name).join(", ");

  return (
    <Link to={`/person/${movie?.id}`} className="mt-2">
      <img
        src={`${
          movie?.profile_path
            ? `https://image.tmdb.org/t/p/w500${movie?.profile_path}`
            : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
        } `}
        alt={movie?.title}
        className="h-[240px] sm:h-full sm:max-h-[280px] w-full object-cover rounded-md overflow-hidden"
      />
      <div className="overflow-hidden sm:w-48 truncate">
        <h4 className="text-sm mt-2 font-semibold truncate ">{movie?.name}</h4>
        <span className="text-sm text-gray-400 mt-1">{known_for}</span>
      </div>
    </Link>
  );
};

export default Popular;
