import { useGetNowPlayingQuery } from "../services/api";

const NowShowing = () => {
  const { data: nowPlaying } = useGetNowPlayingQuery({ type: "movies" });

  console.log(nowPlaying);

  return (
    <div className="md:pl-6 md:pt-14  lg:ml-28">
      <h1 className="text-xl font-bold">Now Showing</h1>
      <div>
        {nowPlaying?.results?.map((playing) => (
          <div key={playing.id}>
            <div>
              <img src="" alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NowShowing;
