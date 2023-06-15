import React from "react";

const Section = ({ children }) => {
  return (
    <section className="md:pl-6 px-2 md:pt-14 xl:ml-7 2xl:ml-28">
      {children}
    </section>
  );
};

export default Section;
