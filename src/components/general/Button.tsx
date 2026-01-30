import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  disabled = false,
  type = "button",
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`btn button-01 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};