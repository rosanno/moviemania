import { Link, useLocation, useParams } from "react-router-dom";
import Content from "../../components/content/Content";
import { useGetCreditsQuery, useGetMediaDetailsQuery, useGetRecommendationQuery } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import Credit from "../../components/Credit";
import Hero from "../../components/Hero";
import Showcase from "../../components/Showcase";
import { useEffect } from "react";

const Details = () => {
  const { pathname } = useLocation();
  const type = pathname.split("/")[1];
  const { id } = useParams();
  const { data: media, isLoading } = useGetMediaDetailsQuery({ type, id });
  const { data: credits } = useGetCreditsQuery({ type, id });
  const { data: recommendations } = useGetRecommendationQuery({ id, type });

  // const genre = media?.genres?.map((genre) => genre.name).join(", ");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Hero media={media} />
      <Content variant="primary">
        <Showcase media={media} isMediaSelected={false} media_type={type} />
      </Content>
      <Content isSpacerOnly>
        <section className="relative z-20 px-3 sm:px-6 transition-all duration-1000 ease-in mt-20 custom-container">
          <div className="pt-20">
            <h3 className="text-3xl font-semibold text-gray-300">Cast</h3>
            <div className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto scrollbar mt-5">
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
          <h3 className="text-3xl font-semibold text-gray-300">Recommendations</h3>
          <div className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto scrollbar mt-5">
            {recommendations?.results?.map((recommend) => (
              <Link to={`/${recommend.media_type}/details/${recommend.id}`} key={recommend.id}>
                <Credit {...recommend} />
              </Link>
            ))}
          </div>
        </section>
      </Content>
    </>
  );
};

export default Details;
