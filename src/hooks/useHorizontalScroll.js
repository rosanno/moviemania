import { useRef } from "react";

const useHorizontalScroll = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -600,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;

      if (Math.round(scrollLeft + clientWidth) >= scrollRef.current.scrollWidth) {
        // Scroll reached the end, scroll back to the beginning
        scrollRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        // Scroll by a fixed amount to the right
        scrollRef.current.scrollBy({
          left: 600,
          behavior: "smooth",
        });
      }
    }
  };

  return { scrollRef, scrollLeft, scrollRight };
};

export default useHorizontalScroll;
