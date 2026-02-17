type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};

const ArrowDownIcon = ({ size = 24, color = "currentColor", className }: IconProps) => {
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
        d="M12 15.4L6 9.4L7.4 8L12 12.6L16.6 8L18 9.4L12 15.4Z"
        fill={color || "currentColor"}
      />
    </svg>
  );
};

export default ArrowDownIcon;
