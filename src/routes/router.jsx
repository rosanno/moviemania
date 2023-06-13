import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../views/Home";
import PopularMovies from "../views/PopularMovies";
import TvShows from "../views/TvShows";
import PopularPeople from "../views/PopularPeople";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/popular-movies",
        element: <PopularMovies />,
      },
      {
        path: "/tv-shows",
        element: <TvShows />,
      },
      {
        path: "/popular-people",
        element: <PopularPeople />,
      },
    ],
  },
]);
