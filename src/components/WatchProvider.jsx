import React from "react";

const WatchProvider = ({ data, selectedWatchProviders, handleWatchProvider }) => {
  return (
    <div className="grid grid-cols-4 gap-3 mt-4">
      {data?.map((provider) => (
        <div key={provider.provider_id} className="relative rounded-md overflow-hidden">
          <button
            onClick={() => handleWatchProvider(provider.provider_id)}
            className="rounded-md overflow-hidden bg-[#FFAE06]"
          >
            <img
              src={`https://www.themoviedb.org/t/p/original${provider.logo_path}`}
              alt=""
              className={`hover:opacity-30 ${
                selectedWatchProviders.includes(provider.provider_id) ? "opacity-30" : ""
              } transition duration-300`}
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default WatchProvider;
