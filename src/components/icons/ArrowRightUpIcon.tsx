type IconProps = {
    size?: number;
    color?: string;
    className?: string;
  };
  
  export function ArrowRightUpIcon({
    size = 24,
    color
  }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.4 20L4 18.6L15.6 7H9V5H19V15H17V8.4L5.4 20Z" fill={color}/>
        </svg>
    );
}