import { Link, useLocation } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const NavMobile = ({ isMobileNavOpen, setIsMobileNavOpen }) => {
  const { pathname } = useLocation();

  return (
    <div
      className={`bg-background-dark fixed z-50 h-screen inset-0 ${
        !isMobileNavOpen ? "-translate-y-full transition-transform" : "translate-y-0"
      } duration-300`}
    >
      <button onClick={() => setIsMobileNavOpen(false)}>
        <AiOutlineClose className="text-white absolute right-6 text-3xl" />
      </button>
      <nav className="py-32 px-10">
        <ul>
          <li className={`nav__links ${pathname === "/" && "text-yellow-500"}`}>
            <Link to="/">Home</Link>
          </li>
          <li className={`nav__links ${pathname === "/popular-movies" && "text-yellow-500"}`}>
            <Link to="/popular-movies">Movies</Link>
          </li>
          <li className={`nav__links ${pathname === "/tv-shows" && "text-yellow-500"}`}>
            <Link to="/tv-shows">TV Shows</Link>
          </li>
          <li className={`nav__links ${pathname === "/popular-people" && "text-yellow-500"}`}>
            <Link to="/popular-people">Popular people</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavMobile;
