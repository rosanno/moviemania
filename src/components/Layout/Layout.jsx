import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "../Navbar";
import NavMobile from "../NavMobile";
import Search from "../Search";
import BackdropBlur from "../Backdrop/BackdropBlur";

const Layout = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
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
        <Navbar setIsMobileNavOpen={setIsMobileNavOpen} setIsSearch={setIsSearch} />
        <NavMobile isMobileNavOpen={isMobileNavOpen} setIsMobileNavOpen={setIsMobileNavOpen} />
      </header>

      <main className="min-h-screen overflow-hidden sm:overflow-visible">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
