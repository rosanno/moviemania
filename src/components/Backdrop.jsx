import { useEffect, useState } from "react";

const Backdrop = ({ src, isAlwaysDisplayed, setIsVideoPlayed }) => {
  const [isDisplayed, setIsDisplayed] = useState(true);

  useEffect(() => {
    const firstTimeout = setTimeout(() => {
      if (isAlwaysDisplayed) {
        setIsDisplayed(false);
        setIsVideoPlayed(true);
      }
    }, 10000);

    const secondTimeout = setTimeout(() => {
      if (isAlwaysDisplayed) {
        setIsDisplayed(true);
        setIsVideoPlayed(false);
      }
    }, 60000);

    return () => {
      clearTimeout(firstTimeout);
      clearTimeout(secondTimeout);
    };
  }, [isAlwaysDisplayed, setIsVideoPlayed]);

  return (
    <>
      {isDisplayed ? (
        <div className="absolute inset-0 bg-background-dark" />
      ) : null}
      <img
        src={`https://image.tmdb.org/t/p/original${src}`}
        alt="Backdrop"
        sizes="100vw"
        className={`
       ${isDisplayed ? "opacity-100" : "xl:opacity-0"}
      object-cover w-full brightness-110 transition-all duration-1000 ease-in`}
      />
    </>
  );
};

export default Backdrop;
