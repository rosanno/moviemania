import { useGetPopularPeopleQuery } from "../services/api";

const PopularPeople = () => {
  const { data: people } = useGetPopularPeopleQuery();
  return <div>PopularPeople</div>;
};

export default PopularPeople;
