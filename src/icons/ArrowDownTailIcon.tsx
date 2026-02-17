type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};

const ArrowDownTailIcon = ({ size = 24, color = "currentColor", className }: IconProps) => {
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
        d="M11 4V16.175L5.4 10.575L4 12L12 20L20 12L18.6 10.575L13 16.175V4H11Z"
        fill={color || "currentColor"}
      />
    </svg>
  );
};

export default ArrowDownTailIcon;
