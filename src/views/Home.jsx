import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Loader from "../components/Loader/Loader";
import NowShowing from "../components/NowShowing";
import Showcase from "../components/Showcase";
import Content from "../components/content/Content";
import { useGetRandomMovie } from "../hooks/useGetRandomMovie";

import { useGetTrendingQuery } from "../services/api";
import UpcomingMovie from "../components/UpcomingMovie";
import { useState } from "react";
import Modal from "../components/Modal";

const Home = () => {
  const { data, isLoading } = useGetTrendingQuery({ type: "movies" });
  const { randomMovie } = useGetRandomMovie(data);
  const [openModal, setModalOpen] = useState(false);

  return (
    <>
      {openModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
          }}
          onClick={() => setModalOpen(false)}
          className="fixed z-40 inset-0 overflow-hidden bg-gradient-to-r from-black/80 backdrop-blur"
        />
      )}
      {openModal && <Modal media={randomMovie} setModalOpen={setModalOpen} />}
      <Hero media={randomMovie} />
      <Content variant="primary">
        {isLoading ? <Loader /> : <Showcase media={randomMovie} isMediaSelected={false} setModalOpen={setModalOpen} />}
      </Content>
      <Content isSpacerOnly>
        <NowShowing />
        <UpcomingMovie />
      </Content>
    </>
  );
};

export default Home;
