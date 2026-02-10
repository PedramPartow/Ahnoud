type IconProps = {
    size?: number;
    color?: string;
    className?: string;
  };
  
const ArrowLeftTailIcon = ({ size = 24, color = "currentColor"}: IconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 11H7.825L13.425 5.4L12 4L4 12L12 20L13.425 18.6L7.825 13H20V11Z" fill={color || "currentColor"}/>
    </svg>
  );
}

export default ArrowLeftTailIcon;