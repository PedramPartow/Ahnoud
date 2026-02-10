type IconProps = {
    size?: number;
    color?: string;
    className?: string;
  };
  
const ShoppingBagIcon = ({
    size = 24,
    color = "currentColor",
  }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 20V4H4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4H16V20H0ZM2 18H14V6H12V9H10V6H6V9H4V6H2V18ZM6 4H10C10 3.45 9.80417 2.97917 9.4125 2.5875C9.02083 2.19583 8.55 2 8 2C7.45 2 6.97917 2.19583 6.5875 2.5875C6.19583 2.97917 6 3.45 6 4Z" fill={color || "currentColor"}/>
        </svg>
    );
}

export default ShoppingBagIcon;