type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};

const RemoveIcon = ({ size = 24, color, className }: IconProps) => {
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
        d="M5 13.0001V11.0001H19V13.0001H5Z"
        fill={color || "currentColor"}
      />
    </svg>
  );
};

export default RemoveIcon;
