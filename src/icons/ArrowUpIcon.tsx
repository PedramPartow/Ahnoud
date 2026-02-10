type IconProps = {
    size?: number;
    color?: string;
    className?: string;
  };
  
  export function ArrowUpIcon({
    size = 24,
    color
  }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 7.99999L6 14L7.4 15.4L12 10.8L16.6 15.4L18 14L12 7.99999Z" fill={color || "currentColor"}/>
        </svg>
    );
}