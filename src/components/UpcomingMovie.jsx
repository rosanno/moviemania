import React from "react";
import { useGetUpComingMovieQuery } from "../services/api";

import { Link } from "react-router-dom";
import moment from "moment";

function UpcomingMovie() {
  const { data } = useGetUpComingMovieQuery();
  console.log(data);

  return (
    <section className="md:pl-6 px-2 md:pt-14 lg:ml-28">
      <h1 className="text-lg sm:text-3xl mb-5 font-bold capitalize">
        Upcoming Movies
      </h1>
      <div className="grid grid-rows-2 grid-flow-col gap-5 sm:gap-7 md:mt-7 overflow-x-scroll overflow-y-hidden scrollbar">
        {data?.results?.map((item) => (
          <Link to={`/movies/details/${item.id}`} key={item.id}>
            <div className="relative group overflow-hidden">
              <div className="w-72 sm:w-96 rounded-md overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item?.backdrop_path}`}
                  alt=""
                  className="rounded-md h-[270px] object-cover group-hover:scale-110 overflow-hidden transition-transform duration-300"
                />
              </div>
              <div className="absolute bottom-10 z-10 px-5">
                <h2 className="text-lg font-bold">{item?.title}</h2>
                <span className="text-gray-300">
                  {item.original_language}
                </span>{" "}
                •{" "}
                <span className="text-sm text-gray-300">
                  {moment(item?.release_date).format("MMMM D YYYY")}
                </span>
              </div>
              <div className="absolute top-0 w-full h-full bg-black/40 rounded-md overflow-hidden" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default UpcomingMovie;
