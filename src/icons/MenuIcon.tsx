type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};

const MenuIcon = ({ size = 24, color = "currentColor", className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M1 17V15H23V17H1ZM1 9V7H23V9H1Z"
        fill={color || "currentColor"}
      />
    </svg>
  );
};

export default MenuIcon;
