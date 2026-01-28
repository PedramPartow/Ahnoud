type IconProps = {
    size?: number;
    color?: string;
    className?: string;
  };
  
  export function ArrowLeftUpIcon({
    size = 24,
    color
  }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.6 20L19 18.6L7.4 7H14V5H4V15H6V8.4L17.6 20Z" fill={color}/>
        </svg>
    );
}