import { Link } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";
import { AiFillYoutube, AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="bg-action-dark w-full h-full mt-28">
      <div className="w-full max-w-[1300px] mx-auto py-14 grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div className="ml-10">
          <h3 className="text-lg font-semibold">About Us</h3>
          <p className="text-xs leading-5 text-gray-300 mt-2">
            ReelFlix is a groundbreaking movie web app that redefines the cinematic experience. With an extensive
            library spanning genres, eras, and cultures, it unlocks a world of captivating storytelling. Discover the
            perfect movie for every mood, engage with a vibrant community, and dive into behind-the-scenes content.
            ReelFlix brings the magic of movies to your fingertips, allowing you to explore, discover, and let the
            stories unfold.
          </p>
        </div>
        <div className="ml-10">
          <Link to="/" className=" flex items-center gap-1">
            <div className="text-white text-lg font-extrabold flex items-center">
              Mo
              <img src="/cinema.png" className="w-7 object-contain" alt="" />
              ie
              <span className="text-yellow-500">Mania</span>
            </div>
          </Link>
          <ul>
            <li className="text-xs mt-2">
              <Link to="/">Home</Link>
            </li>
            <li className="text-xs mt-2">
              <Link to="/popular-movies">Popular Movies</Link>
            </li>
            <li className="text-xs mt-2">
              <Link to="/tv-shows">TV Shows</Link>
            </li>
            <li className="text-xs mt-2">
              <Link to="/popular-people">Popular people</Link>
            </li>
          </ul>
        </div>
        <div className="ml-10">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <ul>
            <li className="text-xs mt-2 flex items-center gap-2">
              <BsFacebook className="text-2xl text-[#0D89F0]" />
              <span>Facebook</span>
            </li>
            <li className="text-xs mt-2 flex items-center gap-2">
              <AiFillYoutube className="text-2xl text-[#FF0000]" />
              <span>Youtube</span>
            </li>
            <li className="text-xs mt-2 flex items-center gap-2">
              <AiFillInstagram className="text-2xl text-white" />
              <span>Instagram</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
