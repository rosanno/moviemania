import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../Navbar";
import NavMobile from "../NavMobile";
import Search from "../Search";
import BackdropBlur from "../Backdrop/BackdropBlur";
import Footer from "../Footer";

const Layout = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState("");

  const onClose = () => {
    setIsSearch(false);
    setQuery("");
  };

  return (
    <>
      <header>
        <BackdropBlur onClose={onClose} isOpen={isSearch} />
        <Search isSearch={isSearch} query={query} setQuery={setQuery} onClose={onClose} />
        <Navbar setIsSearch={setIsSearch} />
        <NavMobile />
      </header>

      <main className="overflow-hidden sm:overflow-visible">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;
