const Button = ({ children, icon, variant }) => {
  let style = "";

  switch (variant) {
    case "primary":
      style = "bg-action-dark transition-color duration-300 w-full";
      break;
  }

  if (icon) {
    return (
      <button
        className={`${style} rounded flex items-center justify-center gap-3 text-white text-lg py-2`}
      >
        {icon}
        {children}
      </button>
    );
  }

  return <button>{children}</button>;
};

export default Button;
