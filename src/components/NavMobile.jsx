import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const NavMobile = ({ isMobileNavOpen, setIsMobileNavOpen }) => {
  return (
    <div
      className={`bg-background-dark fixed z-50 h-screen inset-0 ${
        !isMobileNavOpen
          ? "-translate-y-full transition-transform"
          : "translate-y-0"
      } duration-300`}
    >
      <button onClick={() => setIsMobileNavOpen(false)}>
        <AiOutlineClose className="text-white absolute right-6 text-3xl" />
      </button>
      <nav className="py-32 px-10">
        <ul>
          <li onClick={() => setIsMobileNavOpen(false)} className="nav__links">
            <Link to="/">Home</Link>
          </li>
          <li onClick={() => setIsMobileNavOpen(false)} className="nav__links">
            <Link to="/popular-movies">Popular Movies</Link>
          </li>
          <li onClick={() => setIsMobileNavOpen(false)} className="nav__links">
            <Link to="/tv-shows">TV Shows</Link>
          </li>
          <li onClick={() => setIsMobileNavOpen(false)} className="nav__links">
            <Link to="/popular-people">Popular people</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavMobile;
