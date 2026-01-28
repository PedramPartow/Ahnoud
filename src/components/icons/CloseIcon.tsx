type IconProps = {
    size?: number;
    color?: string;
    className?: string;
  };
  
  export function CloseIcon({
    size = 24,
    color
  }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M5.00015 4L3.58594 5.41421L10.6572 12.4855L3.58638 19.5563L5.00059 20.9706L12.0714 13.8997L19.1423 20.9706L20.5565 19.5563L13.4857 12.4855L20.5569 5.41421L19.1427 4L12.0714 11.0713L5.00015 4Z" fill={color}/>
        </svg>
    );
  }