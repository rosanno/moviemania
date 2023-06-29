import { IoImageOutline } from "react-icons/io5";

const Credit = ({ title, name, poster_path, profile_path }) => {
  return (
    <div className="h-[205px] flex flex-col justify-center">
      {poster_path || profile_path ? (
        <>
          <img
            src={`https://image.tmdb.org/t/p/w300${poster_path || profile_path}`}
            alt={title || name}
            loading="lazy"
            className="w-[130px] max-h-[180px] object-cover rounded-md"
          />
          <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </>
      ) : (
        <div className="w-[130px] h-[180px] bg-gray-300 rounded-md flex items-center justify-center">
          <IoImageOutline className="text-gray-400 text-2xl" />
        </div>
      )}
      <p className="text-xs text-center max-w-[130px] truncate pt-1 mt-auto">{title || name}</p>
    </div>
  );
};

export default Credit;
