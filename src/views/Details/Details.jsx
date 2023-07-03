import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import Content from "../../components/content/Content";
import {
  useGetCreditsQuery,
  useGetMediaDetailsQuery,
  useGetRecommendationQuery,
  useGetSimilarQuery,
} from "../../services/api";
import Credit from "../../components/Credit";
import Hero from "../../components/Hero";
import Showcase from "../../components/Showcase";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader/Loader";

const MediaSection = ({
  children,
  heading,
  results,
  type,
  divider = false,
  spacer = false,
  similar = false,
}) => {
  return (
    <section className="px-3 sm:px-6 transition-all duration-1000 ease-in mt-10 sm:mt-20 custom-container">
      {spacer && <div className="pt-4 sm:pt-20" />}
      {divider && <div className="border-t border-gray-400/10 mb-10" />}
      <h3 className="text-xl sm:text-3xl font-semibold text-gray-300 mb-3 sm:mb-5">
        {heading}{" "}
        {similar && <span className="capitalize">{type === "movie" ? "Movies" : "TV Show"}</span>}
      </h3>
      {results !== 0 ? (
        <Swiper
          navigation={{
            nextEl: ".button-next-slide",
            prevEl: ".button-prev-slide",
          }}
          modules={[Navigation]}
          slidesPerView={3}
          spaceBetween={10}
          breakpoints={{
            640: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 5,
            },
            1024: {
              slidesPerView: 7,
            },
            1280: {
              slidesPerView: 8,
            },
          }}
          className="mt-3 relative"
        >
          {children}
        </Swiper>
      ) : (
        <h1 className="text-sm text-gray-300 pt-10 text-center">
          No {similar ? "Similar" : "Recommendation"} for this{" "}
          <span className="capitalize">{type === "tv" ? `${type} Show` : type}</span>
        </h1>
      )}
    </section>
  );
};

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
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
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
      {openModal && (
        <Modal media={media} setModalOpen={setModalOpen} openModal={openModal} isVideo={type} />
      )}
      <Hero media={media} />
      <Content variant="primary">
        <Showcase
          media={media}
          isMediaSelected={false}
          media_type={type}
          setModalOpen={setModalOpen}
        />
      </Content>
      <Content isSpacerOnly>
        <MediaSection heading="Cast" spacer>
          {credits?.cast?.map((credit) => (
            <SwiperSlide key={credit.id}>
              <Link to={`/person/${credit.id}`}>
                <Credit {...credit} />
              </Link>
            </SwiperSlide>
          ))}
          <div className="button-prev-slide cursor-pointer hidden sm:inline-block absolute z-10 top-1/3 -translate-y-1 bg-action-dark/40 backdrop-blur p-2 rounded-full">
            <BsChevronLeft className="text-xl" />
          </div>
          <div className="button-next-slide cursor-pointer hidden sm:inline-block absolute z-10 top-1/3 right-0 -translate-y-1 bg-action-dark/40 backdrop-blur p-2 rounded-full">
            <BsChevronRight className="text-xl" />
          </div>
        </MediaSection>
        <MediaSection
          heading="Similar"
          results={similar?.results?.length}
          type={type}
          divider
          similar
        >
          {similar?.results?.map((item) => (
            <SwiperSlide key={item.id}>
              <Link to={`/${type}/details/${item.id}`}>
                <Credit {...item} />
              </Link>
            </SwiperSlide>
          ))}
          <div className="button-prev-slide cursor-pointer hidden sm:inline-block absolute z-10 top-1/3 -translate-y-1 bg-action-dark/40 backdrop-blur p-2 rounded-full">
            <BsChevronLeft className="text-xl" />
          </div>
          <div className="button-next-slide cursor-pointer hidden sm:inline-block absolute z-10 top-1/3 right-0 -translate-y-1 bg-action-dark/40 backdrop-blur p-2 rounded-full">
            <BsChevronRight className="text-xl" />
          </div>
        </MediaSection>
        <MediaSection
          heading="Recommendation"
          results={recommendations?.results?.length}
          type={type}
          divider
        >
          {recommendations?.results?.map((recommend) => (
            <SwiperSlide key={recommend.id}>
              <Link to={`/${recommend.media_type}/details/${recommend.id}`}>
                <Credit {...recommend} />
              </Link>
            </SwiperSlide>
          ))}
          <div className="button-prev-slide cursor-pointer hidden sm:inline-block absolute z-10 top-1/3 -translate-y-1 bg-action-dark/40 backdrop-blur p-2 rounded-full">
            <BsChevronLeft className="text-xl" />
          </div>
          <div className="button-next-slide cursor-pointer hidden sm:inline-block absolute z-10 top-1/3 right-0 -translate-y-1 bg-action-dark/40 backdrop-blur p-2 rounded-full">
            <BsChevronRight className="text-xl" />
          </div>
        </MediaSection>
      </Content>
    </>
  );
};

export default Details;
