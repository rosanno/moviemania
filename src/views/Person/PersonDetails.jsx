import React, { useEffect, useState } from "react";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { BsTiktok } from "react-icons/bs";
import { CiFacebook } from "react-icons/ci";
import { FiTwitter } from "react-icons/fi";

import { Link, useParams } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import { IoImageOutline } from "react-icons/io5";
import {
  useGetCreditMoviesQuery,
  useGetExternalIDQuery,
  useGetPersonDetailsQuery,
  useGetProfileQuery,
} from "../../services/api";
import Content from "../../components/content/Content";
import Credit from "../../components/Credit";
import Loader from "../../components/Loader/Loader";

const Details = ({ heading, details, isRepeated = false, age }) => {
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
      <p className="text-sm font-light text-gray-300">
        {details} <span>{age ? `${age} years old` : ""}</span>
      </p>
    </div>
  );
};

const SocialAccounts = ({ url, social_id, icon }) => {
  return (
    <Link to={`${url}${social_id}`} target="_blank" className="text-2xl inline-block pt-7">
      {icon}
    </Link>
  );
};

const PersonDetails = () => {
  const { id } = useParams();
  const { data: details, isFetching } = useGetPersonDetailsQuery({ id });
  const { data: creditMovie } = useGetCreditMoviesQuery({ personId: id });
  const { data: profiles } = useGetProfileQuery({ id });
  const { data: externalIds } = useGetExternalIDQuery({ id });
  const [bioLength, setBioLength] = useState(450);

  const sortedCreditMovie = creditMovie?.cast && [...creditMovie.cast]?.sort((a, b) => b.vote_count - a.vote_count);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isFetching) {
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
                loading="lazy"
                className="w-full object-cover rounded-md overflow-hidden"
              />
            ) : (
              <div className="h-[380px] w-[300px] sm:w-[340px] md:w-[290px] xl:w-[300px] rounded-md bg-gray-300 flex items-center justify-center">
                <IoImageOutline className="text-gray-400 text-2xl" />
              </div>
            )}
            <div className="flex items-center gap-2">
              {externalIds?.facebook_id && (
                <SocialAccounts
                  url="https://www.facebook.com/"
                  social_id={externalIds?.facebook_id}
                  icon={<CiFacebook />}
                />
              )}
              {externalIds?.instagram_id && (
                <SocialAccounts
                  url="https://www.instagram.com/"
                  social_id={externalIds?.instagram_id}
                  icon={<AiOutlineInstagram />}
                />
              )}
              {externalIds?.twitter_id && (
                <SocialAccounts
                  url="https://www.twitter.com/"
                  social_id={externalIds?.twitter_id}
                  icon={<FiTwitter />}
                />
              )}
              {externalIds?.tiktok_id && (
                <SocialAccounts url="https://www.tiktok.com/" social_id={externalIds?.tiktok_id} icon={<BsTiktok />} />
              )}
              {externalIds?.youtube_id && (
                <SocialAccounts
                  url="https://www.tiktok.com/"
                  social_id={externalIds?.youtube_id}
                  icon={<AiOutlineYoutube />}
                />
              )}
            </div>
            <div className="mt-5 sm:mt-7">
              <h2 className="text-xl text-gray-300">Personal Info</h2>
              <div className="grid grid-cols-2 md:grid-cols-1">
                <Details heading="Known for" details={details?.known_for_department} />
                <Details heading="Known Credits" details={creditMovie?.cast?.length} />
                <Details heading="Gender" details={details?.gender === 2 ? "Male" : "Female"} />
                <Details
                  heading="Birthday"
                  details={details?.birthday}
                  age={new Date().getFullYear() - parseInt(details?.birthday)}
                />
                <Details heading="Place of Birth" details={details?.place_of_birth} />
                <Details heading="Alson Known As" details={details} isRepeated />
              </div>
            </div>
          </div>
          <div className="w-full md:w-[640px] xl:flex-1">
            <h1 className="text-2xl sm:text-4xl font-bold">{details?.name}</h1>
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
            <div className="mt-10 max-h-[240px]">
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
            <div className="mt-14">
              <h2 className="text-xl sm:text-3xl text-gray-300 font-semibold pb-4">Profiles</h2>
              {profiles?.profiles?.length !== 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {profiles?.profiles?.map((profile, index) => (
                    <div key={index}>
                      <img
                        src={`https://www.themoviedb.org/t/p/w300${profile.file_path}`}
                        alt=""
                        loading="lazy"
                        className="rounded-md"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <h1>No Profiles Added</h1>
              )}
            </div>
          </div>
        </div>
      </section>
    </Content>
  );
};

export default PersonDetails;
