type IconProps = {
    size?: number;
    color?: string;
    className?: string;
  };
  
export function AddToCartIcon({
    size = 24,
    color = '#0C1211',
  }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_564_7640" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect width="24" height="24" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask0_564_7640)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3 22V6H7C7 4.9 7.39167 3.95833 8.175 3.175C8.95833 2.39167 9.9 2 11 2C12.1 2 13.0417 2.39167 13.825 3.175C14.6083 3.95833 15 4.9 15 6H19V12H17V8H15V11H13V8H9V11H7V8H5V20H12V22H3ZM13 6H9C9 5.45 9.19583 4.97917 9.5875 4.5875C9.97917 4.19583 10.45 4 11 4C11.55 4 12.0208 4.19583 12.4125 4.5875C12.8042 4.97917 13 5.45 13 6Z" fill={color}/>
        <path d="M17 19H14V17H17V14H19V17H22V19H19V22H17V19Z" fill="#0C1211"/>
        </g>
        </svg>
    );
}