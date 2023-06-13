import React from "react";
import { useGetLogoQuery, useGetRuntimeQuery } from "../services/api";
import { useLogoFilter } from "../hooks/useLogoFilter";
import runtime from "../helpers/runtime";
import Button from "./Button/Button";

import { BiPlay } from "react-icons/bi";
import { convertLanguage } from "../helpers/convert-language";

const Showcase = ({ media, isMediaSelected }) => {
  const type = media?.media_type;
  const id = media?.id;
  const { data } = useGetLogoQuery({ type, id });
  const { data: humanruntime } = useGetRuntimeQuery({ type, id });
  const { logo } = useLogoFilter(data);
  const langauage = convertLanguage(media?.original_language);

  return (
    <section className="space-y-6 sm:max-w-md px-2 md:pl-6">
      <div className="relative sm:aspect-square">
        <div
          style={{
            aspectRatio: logo?.aspect_ratio ? logo?.aspect_ratio : "1.84 / 1",
          }}
          className="relative bottom-0 max-h-56 w-full sm:absolute"
        >
          <img
            src={
              logo?.file_path &&
              `https://image.tmdb.org/t/p/w500${logo?.file_path}`
            }
            alt=""
            sizes="500px"
            className="object-contain h-full"
          />
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-1 text-xs sm:text-base">
          <p className="font-semibold text-gray-300">
            {media?.release_date?.slice(0, 4)
              ? media?.release_date?.slice(0, 4)
              : "New"}{" "}
            •{" "}
            {type === "movie"
              ? runtime(humanruntime?.runtime)
              : `${humanruntime} Seasons`}{" "}
            • {langauage?.en.name ? langauage?.en.name : "English"} •
          </p>
          <div className="rounded bg-rated-dark px-2 py-0.5 font-semibold sm:py-0">
            {media?.adult ? "18+" : "PG"}
          </div>
        </div>
        <div className="overflow-y-auto scrollbar-none sm:max-h-12">
          <p className="text-xs sm:text-base text-gray-300">
            {media?.overview}
          </p>
        </div>
      </div>
      <div>
        <Button icon={<BiPlay size="35px" />} variant="primary">
          Trailler
        </Button>
      </div>
    </section>
  );
};

export default Showcase;
