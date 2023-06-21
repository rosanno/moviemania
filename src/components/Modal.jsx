import { useRef } from "react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { useGetVideoQuery } from "../services/api";
import { useFilterVideo } from "../hooks/useFilterVideo";

const Modal = ({ media, setModalOpen, openModal, isVideo }) => {
  const videoRef = useRef(null);
  const type = media?.media_type || isVideo;
  const id = media?.id;
  const { data } = useGetVideoQuery({ type, id, original_language: media?.original_language });
  const { video } = useFilterVideo(data);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.src = "";
      videoRef.current.src = `https://www.youtube.com/embed/${video?.key}/?autoplay=1&mute=1&loop=1&controls=0`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={openModal ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.2,
      }}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-64 z-50 w-full md:w-10/12 lg:w-10/12 xl:w-4/6 px-3 md:px-0"
    >
      <div className="bg-black rounded-md overflow-hidden">
        <div className="p-2">
          <h1 className="sm:text-xl">{media?.title || media?.name}</h1>
        </div>
        <div className="rounded-md overflow-hidden">
          {openModal && (
            <iframe
              ref={videoRef}
              src={`https://www.youtube.com/embed/${video?.key}/?autoplay=1&mute=1&loop=1&controls=0`}
              title="Playback"
              className="h-[320px] lg:h-[520px] xl:h-[530px] w-full brightness-110"
            ></iframe>
          )}
        </div>
        <AiOutlineClose
          onClick={() => {
            setModalOpen(false);
            handlePlayVideo();
          }}
          size="30px"
          className="cursor-pointer absolute hidden sm:block top-1 right-1 bg-neutral-900 rounded-md p-1"
        />
      </div>
    </motion.div>
  );
};

export default Modal;
