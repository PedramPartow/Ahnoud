type IconProps = {
    size?: number;
    color?: string;
    className?: string;
  };
  
export function AddIcon({
    size = 24,
    color
  }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 13.0001H5V11.0001H11V5.00012H13V11.0001H19V13.0001H13V19.0001H11V13.0001Z" fill={color || "currentColor"}/>
        </svg>
    );
}