import { useEffect } from "react";
import Content from "../components/content/Content";

const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Content variant="secondary">
      <div className="mt-16 sm:mt-20 md:mt-32 px-4 sm:px-6">
        <div className="flex flex-col space-y-2 items-center justify-center h-[480px]">
          <h1 className="text-6xl font-bold">404</h1>
          <span>Not Found</span>
        </div>
      </div>
    </Content>
  );
};

export default NotFound;
