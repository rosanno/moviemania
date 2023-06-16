import Content from "../components/content/Content";

const NotFound = () => {
  return (
    <Content variant="secondary">
      <div className="mt-16 sm:mt-20 md:mt-32 px-4 sm:px-6">
        <div className="flex items-center justify-center h-[480px]">
          Not Found
        </div>
      </div>
    </Content>
  );
};

export default NotFound;
