import { Link, useLocation } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";

const Navbar = ({ setIsMobileNavOpen }) => {
  const { pathname } = useLocation();
  const [navbarColor, setNavbarColor] = useState("bg-transparent"); // Initial color of the navbar

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 50) {
        setNavbarColor("bg-black/75 backdrop-blur shadow"); // Change to your desired color class when scrolling
      } else {
        setNavbarColor("bg-transparent"); // Change to your initial color class when not scrolling
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`fixed z-10 inset-x-0 ${navbarColor}`}>
      <div className="custom-container flex items-center justify-between space-x-10 p-3 md:p-6">
        <div>
          <span className="text-white text-lg font-semibold">
            Movie<span className="text-red-600 font-extrabold">Mania</span>
          </span>
        </div>
        <nav className="hidden md:block py-28 md:p-0 px-10 w-full">
          <ul className="flex items-center">
            <li className={`nav__links ${pathname === "/" && "text-rose-500"}`}>
              <Link to="/">Home</Link>
            </li>
            <li
              className={`nav__links ${
                pathname === "/popular-movies" && "text-rose-500"
              }`}
            >
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
        <div className="flex items-center space-x-3">
          <button className="ml-auto">
            <LuSearch className="text-xl text-white" />
          </button>
          <button
            onClick={() => setIsMobileNavOpen(true)}
            className="md:hidden"
          >
            <GiHamburgerMenu className="text-2xl text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
