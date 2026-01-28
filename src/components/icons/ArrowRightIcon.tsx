type IconProps = {
    size?: number;
    color?: string;
    className?: string;
  };
  
  export function ArrowRightIcon({
    size = 24,
    color
  }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.7008 11.7L9.70078 17.7L8.30078 16.3L12.9008 11.7L8.30078 7.10001L9.70078 5.70001L15.7008 11.7Z" fill={color}/>
        </svg>
    );
}