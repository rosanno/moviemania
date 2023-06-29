import { motion } from "framer-motion";

import { useGetLogoQuery, useGetRuntimeQuery } from "../services/api";
import { useLogoFilter } from "../hooks/useLogoFilter";
import runtime from "../helpers/runtime";
import { BiPlay } from "react-icons/bi";
import { convertLanguage } from "../helpers/convert-language";

const Showcase = ({ media, isMediaSelected, setModalOpen, media_type }) => {
  const type = media?.media_type || media_type;
  const id = media?.id;
  const { data, isFetching } = useGetLogoQuery({ type, id });
  const { data: humanruntime } = useGetRuntimeQuery({ type, id });
  const { logo } = useLogoFilter(data, media?.original_language);
  const langauage = convertLanguage(media?.original_language);

  return (
    <>
      <section className="space-y-6 sm:max-w-md px-2 md:pl-6 overflow-y-hidden">
        <div className="relative sm:aspect-square">
          <div
            style={{
              aspectRatio: logo?.aspect_ratio ? logo?.aspect_ratio : "1.84 / 1",
            }}
            className="relative bottom-0 max-h-56 w-full sm:absolute"
          >
            {
              <motion.img
                initial={{ opacity: 0, x: -200 }}
                animate={isFetching ? { opacity: 0, x: -200 } : { opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.2,
                }}
                src={logo?.file_path && `https://image.tmdb.org/t/p/w500${logo?.file_path}`}
                alt=""
                loading="lazy"
                sizes="500px"
                className="object-contain h-full"
              />
            }
          </div>
        </div>
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={isFetching ? { opacity: 0, x: -300 } : { opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.3,
            }}
            className="flex items-center gap-1 text-xs sm:text-base"
          >
            <p className="font-semibold text-gray-300">
              {media?.release_date?.slice(0, 4) ? media?.release_date?.slice(0, 4) : "New"} •{" "}
              {type === "movie" ? runtime(humanruntime?.runtime) : `${humanruntime?.number_of_seasons} Seasons`} •{" "}
              {langauage?.en.name || "English"} •
            </p>
            <div className="rounded bg-rated-dark px-2 py-0.5 font-semibold sm:py-0">{media?.adult ? "18+" : "PG"}</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isFetching ? { opacity: 0, y: 40 } : { opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.4,
            }}
            className="overflow-y-auto scrollbar-none sm:max-h-12"
          >
            <p className="text-xs sm:text-base">{media?.overview}</p>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isFetching ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.5,
          }}
        >
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#FFAE06] hover:bg-[#cc9b3b] transition duration-300 w-full py-2 rounded-xl flex items-center justify-center"
          >
            <BiPlay size="30px" />
            <span className="font-semibold">Watch Trailler</span>
          </button>
        </motion.div>
      </section>
    </>
  );
};

export default Showcase;
