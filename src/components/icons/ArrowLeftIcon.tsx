type IconProps = {
    size?: number;
    color?: string;
    className?: string;
  };
  
const ArrowLeftIcon = ({ size = 24, color= "currentColor" }: IconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.29922 11.7L14.2992 5.70001L15.6992 7.10001L11.0992 11.7L15.6992 16.3L14.2992 17.7L8.29922 11.7Z" fill={color || "currentColor"}/>
    </svg>
  );
}

export default ArrowLeftIcon;