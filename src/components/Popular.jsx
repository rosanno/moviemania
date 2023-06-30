import { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { IoImageOutline } from "react-icons/io5";
import { Oval } from "react-loader-spinner";

const Popular = ({ movie, media_type }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link to={`/${media_type}/details/${movie?.id}`} className="mt-4">
      {movie?.poster_path !== null ? (
        <div className="relative">
          {!imageLoaded && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
              <Oval
                height={40}
                width={40}
                color="#404144"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#404144"
                strokeWidth={4}
                strokeWidthSecondary={4}
              />
            </div>
          )}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            alt={movie?.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className="w-full md:max-w-[200px] h-[260px] md:max-h-[250px] rounded-md overflow-hidden"
          />
        </div>
      ) : (
        <div className="w-full md:max-w-[200px] h-[260px] md:max-h-[250px] bg-gray-300 rounded-md flex items-center justify-center">
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
