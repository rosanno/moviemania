import { Link, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import Content from "../../components/content/Content";
import {
  useGetCreditsQuery,
  useGetMediaDetailsQuery,
  useGetRecommendationQuery,
  useGetSimilarQuery,
} from "../../services/api";
import Loader from "../../components/Loader/Loader";
import Credit from "../../components/Credit";
import Hero from "../../components/Hero";
import Showcase from "../../components/Showcase";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";

const Details = () => {
  const { pathname } = useLocation();
  const type = pathname.split("/")[1];
  const { id } = useParams();
  const { data: media, isFetching } = useGetMediaDetailsQuery({ type, id });
  const { data: credits } = useGetCreditsQuery({ type, id });
  const { data: recommendations } = useGetRecommendationQuery({ id, type });
  const { data: similar } = useGetSimilarQuery({ id, type });
  const [openModal, setModalOpen] = useState(false);

  // const genre = media?.genres?.map((genre) => genre.name).join(", ");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (isFetching) {
    return <Loader />;
  }

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
      {openModal && <Modal media={media} setModalOpen={setModalOpen} openModal={openModal} isVideo={type} />}
      <Hero media={media} />
      <Content variant="primary">
        <Showcase media={media} isMediaSelected={false} media_type={type} setModalOpen={setModalOpen} />
      </Content>
      <Content isSpacerOnly>
        <section className="relative z-20 px-3 sm:px-6 transition-all duration-1000 ease-in mt-10 sm:mt-20 custom-container">
          <div className="pt-4 sm:pt-20">
            <h3 className="text-xl sm:text-3xl font-semibold text-gray-300">Cast</h3>
            <div className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto scrollbar mt-3 sm:mt-5">
              {credits?.cast?.map((credit) => (
                <Link to={`/person/${credit.id}`} key={credit.id}>
                  <Credit {...credit} />
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="relative z-20 px-3 sm:px-6 transition-all duration-1000 ease-in mt-20 custom-container">
          <div className="border-t border-gray-400/40 mb-10" />
          <h3 className="text-xl sm:text-3xl font-semibold text-gray-300">
            Similar <span className="capitalize">{type === "movie" ? "Movies" : "TV Show"}</span>{" "}
          </h3>
          {similar?.results?.length !== 0 ? (
            <div className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto scrollbar mt-3 sm:mt-5">
              {similar?.results?.map((item) => (
                <Link to={`/${type}/details/${item.id}`} key={item.id}>
                  <Credit {...item} />
                </Link>
              ))}
            </div>
          ) : (
            <h1 className="text-sm text-gray-300 pt-10 text-center">
              No Similar for this <span className="capitalize">{type === "tv" ? `${type} Show` : type}</span>
            </h1>
          )}
        </section>
        <section className="relative z-20 px-3 sm:px-6 transition-all duration-1000 ease-in mt-20 custom-container">
          <div className="border-t border-gray-400/40 mb-10" />
          <h3 className="text-xl sm:text-3xl font-semibold text-gray-300">Recommendations</h3>
          {recommendations?.results?.length !== 0 ? (
            <div className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto scrollbar mt-3 sm:mt-5">
              {recommendations?.results?.map((recommend) => (
                <Link to={`/${recommend.media_type}/details/${recommend.id}`} key={recommend.id}>
                  <Credit {...recommend} />
                </Link>
              ))}
            </div>
          ) : (
            <h1 className="text-sm text-gray-300 pt-10 text-center">
              No Recommendation for this <span className="capitalize">{type === "tv" ? `${type} Show` : type}</span>
            </h1>
          )}
        </section>
      </Content>
    </>
  );
};

export default Details;
