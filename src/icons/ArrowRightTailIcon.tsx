type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};

const ArrowRightTailIcon = ({ size = 24, color = "currentColor", className }: IconProps) => {
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
        d="M4 13H16.175L10.575 18.6L12 20L20 12L12 4L10.575 5.4L16.175 11H4L4 13Z"
        fill={color || "currentColor"}
      />
    </svg>
  );
};

export default ArrowRightTailIcon;
