const Grid = ({ children, variant }) => {
  if (variant === "primary") {
    return <div>{children}</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
      {children}
    </div>
  );
};

export default Grid;
