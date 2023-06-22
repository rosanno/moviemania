import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useGetSearchQuery } from "../services/api";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Search = ({ isSearch, query, setQuery, onClose }) => {
  const { data: searchResults } = useGetSearchQuery({ query }, { skip: !isSearch });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={isSearch ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{
          duration: 0.6,
          delay: 0.3,
        }}
        className="fixed z-50 top-10 flex flex-col items-center w-full"
      >
        <div className="flex items-center bg-black/50 backdrop-blur w-[360px] sm:w-[530px] md:w-[640px] py-2 px-5 rounded-md shadow-md">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movies, tv shows"
            className="w-full bg-transparent p-2 font-normal outline-none"
          />
          <HiOutlineMagnifyingGlass className="text-xl" />
        </div>
        {query !== "" && (
          <div className="bg-black/50 backdrop-blur absolute top-16 p-6 w-full max-w-[360px] sm:max-w-[530px] md:max-w-[640px] rounded-md max-h-[340px] overflow-y-auto scrollbar">
            {searchResults?.results?.map((item) => (
              <Link onClick={onClose} to={`/details/${item.id}`} key={item.id} className="my-2 block">
                <div className="flex gap-2">
                  <img
                    src={`${
                      item?.poster_path !== null
                        ? `https://image.tmdb.org/t/p/w500${item?.poster_path}`
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
      </motion.div>
    </AnimatePresence>
  );
};

export default Search;
