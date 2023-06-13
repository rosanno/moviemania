import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

// eslint-disable-next-line react/prop-types
const NavMobile = ({ isMobileNavOpen, setIsMobileNavOpen }) => {
  return (
    <div
      className={`bg-black fixed z-30 h-screen inset-0 ${
        !isMobileNavOpen
          ? "-translate-y-full transition-transform"
          : "translate-y-0"
      } duration-300`}
    >
      <button onClick={() => setIsMobileNavOpen(false)}>
        <AiOutlineClose className="text-white absolute right-6 text-3xl" />
      </button>
      <nav className="py-28 px-10">
        <ul>
          <li className="nav__links">
            <Link to="/">Home</Link>
          </li>
          <li className="nav__links">
            <Link to="/popular-movies">Popular Movies</Link>
          </li>
          <li className="nav__links">
            <Link to="/tv-shows">TV Shows</Link>
          </li>
          <li className="nav__links">
            <Link to="/popular-people">Popular people</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavMobile;
