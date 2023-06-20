import { useEffect, useState } from "react";

export const useLogoFilter = (data) => {
  const [logo, setLogo] = useState();

  useEffect(() => {
    const logo = data?.logos?.find((logo) => logo.iso_639_1 === "en" || logo.iso_639_1 === null);
    setLogo(logo);
  }, [data]);

  return {
    logo,
  };
};
