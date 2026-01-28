type IconProps = {
    size?: number;
    color?: string;
    className?: string;
  };
  
export function RemoveIcon({
    size = 24,
    color
  }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 13.0001V11.0001H19V13.0001H5Z" fill={color}/>
        </svg>
    );
}