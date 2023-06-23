const Popular = ({ movie }) => {
  const mapJoin = movie?.known_for.map((item) => item.original_title).join(", ");

  return (
    <di>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie?.profile_path}`}
        alt={movie?.title}
        className="rounded-md overflow-hidden"
      />
      <div className="overflow-hidden w-48 truncate">
        <h4 className="text-sm mt-2 font-semibold truncate ">{movie?.name}</h4>

        <span className="text-sm text-gray-400 mt-1  ">{mapJoin}</span>
      </div>
    </di>
  );
};

export default Popular;
