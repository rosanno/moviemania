import { useEffect, useRef } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useGetSearchQuery } from "../services/api";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Search = ({ isSearch, query, setQuery, onClose }) => {
  const inputRef = useRef(null);
  const { data: searchResults } = useGetSearchQuery({ query }, { skip: !isSearch });

  useEffect(() => {
    inputRef.current.focus();
  }, [isSearch]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={isSearch ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{
          duration: 0.3,
          delay: 0.3,
        }}
        className="relative z-50"
      >
        <div className="fixed left-0 right-0 sm:left-1/2 sm:-translate-x-1/2 top-10">
          <div className="flex flex-col items-center w-full px-2">
            <div className="flex items-center bg-black/50 backdrop-blur w-full sm:w-[530px] md:w-[640px] py-2 px-5 rounded-md shadow-md">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                ref={inputRef}
                placeholder="Search for a movies, tv shows, person"
                className="w-full bg-transparent p-2 font-normal outline-none"
              />
              <HiOutlineMagnifyingGlass className="text-xl" />
            </div>
            <div className="absolute top-16 flex flex-col items-center w-full px-2">
              {query !== "" && (
                <div className="bg-black/50 backdrop-blur px-6 w-full sm:w-[530px] md:w-[640px] rounded-md max-h-[340px] overflow-y-auto scrollbar">
                  {searchResults?.results?.map((item) => (
                    <Link
                      onClick={onClose}
                      to={`/${item.media_type}${item.media_type === "person" ? "" : "/details"}/${item.id}`}
                      key={item.id}
                      className="my-2 block"
                    >
                      <div className="flex gap-2">
                        <img
                          src={`${
                            item?.poster_path !== null && item?.profile_path !== null
                              ? `https://image.tmdb.org/t/p/w300${item?.poster_path || item?.profile_path}`
                              : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                          } `}
                          alt=""
                          className="w-20"
                        />
                        <div className="w-[510px]">
                          <h3>{item.title || item.original_name}</h3>
                          <p className="text-xs pt-1 text-gray-400 capitalize">
                            <span>{item.media_type}</span>
                          </p>
                          <p className="text-xs pt-2 text-gray-400 truncate overflow-hidden">{item.overview}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Search;
