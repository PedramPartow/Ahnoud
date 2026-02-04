import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  style?: React.CSSProperties;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  disabled = false,
  type = "button",
  style,
  href,
  ...props
}) => {
  const classes = `btn button-01 ${className} ${disabled ? "disabled" : ""}`.trim();

  if (href) {
    return (
      <Link
        href={disabled ? "#" : href}
        className={classes}
        style={style}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      type={type}
      className={classes}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;