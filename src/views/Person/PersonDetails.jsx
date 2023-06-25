import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import { IoImageOutline } from "react-icons/io5";
import { useGetCreditMoviesQuery, useGetPersonDetailsQuery } from "../../services/api";
import Content from "../../components/content/Content";
import Credit from "../../components/Credit";
import Loader from "../../components/Loader/Loader";

const Details = ({ heading, details, isRepeated = false }) => {
  if (isRepeated) {
    return (
      <div className="mt-3">
        <h3 className="text-base text-gray-300">{heading}</h3>
        {details?.also_known_as?.map((item, index) => (
          <p className="text-sm font-light text-gray-300 py-1.5" key={index}>
            {item}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-3">
      <h3 className="text-base text-gray-300">{heading}</h3>
      <p className="text-sm font-light text-gray-300">{details}</p>
    </div>
  );
};

const PersonDetails = () => {
  const { id } = useParams();
  const { data: details, isLoading } = useGetPersonDetailsQuery({ id });
  const { data: creditMovie } = useGetCreditMoviesQuery({ personId: id });
  const [bioLength, setBioLength] = useState(450);

  const sortedCreditMovie = creditMovie?.cast && [...creditMovie.cast]?.sort((a, b) => b.vote_count - a.vote_count);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Content>
      <section className="mt-16 sm:mt-20 md:mt-32 px-3 sm:px-6 transition-all duration-1000 ease-in">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="min-h-fit w-full sm:w-[340px] md:w-[290px] xl:w-[300px]">
            {details?.profile_path ? (
              <img
                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${details?.profile_path}`}
                alt={details?.name}
                className="object-cover rounded-md overflow-hidden"
              />
            ) : (
              <div className="h-[380px] w-[300px] sm:w-[340px] md:w-[290px] xl:w-[300px] rounded-md bg-gray-300 flex items-center justify-center">
                <IoImageOutline className="text-gray-400 text-2xl" />
              </div>
            )}
            <div className="mt-5 sm:mt-16">
              <h2 className="text-xl text-gray-300">Personal Info</h2>
              <div className="grid grid-cols-2 md:grid-cols-1">
                <Details heading="Known for" details={details?.known_for_department} />
                <Details heading="Known Credits" details={creditMovie?.cast?.length} />
                <Details heading="Gender" details={details?.gender === 2 ? "Male" : "Female"} />
                <div className="mt-3">
                  <h3 className="text-base text-gray-300">Birthday</h3>
                  <p className="text-sm text-gray-300">
                    {details?.birthday} (<span>{new Date().getFullYear() - parseInt(details?.birthday)} years old</span>
                    )
                  </p>
                </div>
                <Details heading="Place of Birth" details={details?.place_of_birth} />
                <Details heading="Alson Known As" details={details} isRepeated />
              </div>
            </div>
          </div>
          <div className="sm:w-[350px] md:w-[640px] xl:flex-1">
            <h1 className="text-4xl font-bold">{details?.name}</h1>
            <div className="mt-5">
              <h3 className="text-lg font-semibold">Biography</h3>
              <p className="text-sm font-light text-gray-300 leading-6 mt-2">
                {details?.biography.slice(0, bioLength)}
              </p>
              {details?.biography.length >= bioLength && (
                <>
                  {bioLength === 450 ? (
                    <button
                      className="text-sm text-yellow-500 flex items-center"
                      onClick={() => setBioLength(details?.biography.length)}
                    >
                      Read More <BiChevronRight className="text-2xl" />
                    </button>
                  ) : (
                    <button className="text-sm text-yellow-500 flex items-center" onClick={() => setBioLength(450)}>
                      Read less <BiChevronRight className="text-2xl" />
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="mt-10">
              <h3 className="text-lg font-semibold">Known For</h3>
              <div className="w-[870px] mt-1">
                <div className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto scrollbar">
                  {sortedCreditMovie?.map((credit) => (
                    <Link
                      to={`/${credit.media_type === "movie" ? "movie" : "tv"}/details/${credit.id}`}
                      key={credit.id}
                    >
                      <Credit {...credit} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="h-[740px] border border-dashed flex flex-col items-center justify-center rounded-md">
              <img src="/construction.gif" alt="" className="h-[230px]" />
              Under construction
            </div>
          </div>
        </div>
      </section>
    </Content>
  );
};

export default PersonDetails;
