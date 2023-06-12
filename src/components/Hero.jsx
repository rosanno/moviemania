import { useFilterVideo } from "../hooks/useFilterVideo";
import { useGetVideoQuery } from "../services/api";
import Playback from "./Playback";

const Hero = ({ media }) => {
  const type = media?.media_type;
  const id = media?.id;
  const { data } = useGetVideoQuery({ type, id });
  const { video } = useFilterVideo(data);

  console.log(video);

  return (
    <section className="sticky -z-10 aspect-video max-h-screen w-full overflow-hidden sm:top-0">
      <div className="relative h-full w-full">
        {video ? (
          <Playback src={`https://www.youtube.com/embed/${video?.key}`} />
        ) : null}
        <div className="absolute inset-0 z-10 hidden bg-gradient-to-r from-background-dark to-transparent sm:block" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background-dark to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background-dark to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
