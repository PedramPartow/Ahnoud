type IconProps = {
    size?: number;
    color?: string;
    className?: string;
  };
  
export function ArrowUpTailIcon({
    size = 24,
    color
  }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 20V7.825L5.4 13.425L4 12L12 4L20 12L18.6 13.425L13 7.825V20H11Z" fill={color}/>
        </svg>
    );
}