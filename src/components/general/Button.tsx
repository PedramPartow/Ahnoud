import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  style?: React.CSSProperties;
  href?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  disabled = false,
  type = "button",
  style,
  href,
  loading = false,
  ...props
}) => {
  const isDisabled = disabled || loading;
  const classes = `btn button-01 ${className} ${isDisabled ? "disabled" : ""}`.trim();

  const content = loading ? <CircularProgress size={20} color="inherit" /> : children;

  if (href) {
    return (
      <Link
        href={isDisabled ? "#" : href}
        className={classes}
        style={style}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      disabled={isDisabled}
      type={type}
      className={classes}
      style={style}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;