type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};

const SampleIcon = ({ size = 24, color, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M21 15.999V8.00102C21 7.28702 20.618 6.62702 19.998 6.27302L12.99 2.26002C12.377 1.90902 11.624 1.90902 11.011 2.26002L4.002 6.27302C3.382 6.62802 3 7.28702 3 8.00102V15.998C3 16.712 3.382 17.372 4.002 17.726L11.01 21.739C11.623 22.09 12.376 22.09 12.989 21.739L19.997 17.726C20.618 17.372 21 16.713 21 15.999V15.999Z" stroke={color || "currentColor"} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.9991 12L3.28906 17.03" stroke={color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 12L20.71 6.97" stroke={color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 12V2" stroke={color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 12V22" stroke={color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.9991 12L3.28906 6.97" stroke={color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 12L20.71 17.03" stroke={color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default SampleIcon;
