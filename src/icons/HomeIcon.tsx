type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};

const HomeIcon = ({ size = 24, color = "currentColor", className }: IconProps) => {
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
        d="M3 22V8.67579L12.0476 2L21.0952 8.67579V22H13.6271V15.1578H10.4681V22H3ZM5.08791 19.8393H8.38055V12.9972H15.7147V19.8393H19.0073V9.75613L12.0476 4.67024L5.08791 9.75613V19.8393Z"
        fill={color}
      />
    </svg>
  );
};

export default HomeIcon;
