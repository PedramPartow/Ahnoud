import React from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  description?: string;
  /**
   * Optional left icon shown in the header row
   */
  startIcon?: React.ReactNode;
  /**
   * Optional right icon shown in the header row
   */
  endIcon?: React.ReactNode;
  /**
   * Error message. When provided, input is styled as error.
   */
  error?: string;
  className?: string;
  containerClassName?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  description,
  startIcon,
  endIcon,
  error,
  className = "",
  containerClassName = "",
  type = "text",
  ...props
}) => {
  const inputId = id || (label ? label.replace(/\s+/g, "-").toLowerCase() : undefined);
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  const hasStatusText = !!error || !!description;

  return (
    <div className={`flex flex-col gap-2 w-full ${containerClassName}`}>
      {(label || startIcon || endIcon) && (
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {startIcon && (
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-4 text-gray-5">
                {startIcon}
              </span>
            )}
            {label && (
              <label
                htmlFor={inputId}
                className="button-01 text-gray-1 cursor-pointer select-none"
              >
                {label}
              </label>
            )}
          </div>
          {endIcon && (
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-4 text-gray-5">
              {endIcon}
            </span>
          )}
        </div>
      )}

      <div
        className={[
          "flex items-center border-b",
          error ? "border-red-500" : "border-gray-3 focus-within:border-primary-7",
        ].join(" ")}
      >
        <input
          id={inputId}
          type={type}
          className={[
            "w-full bg-transparent py-2 body-03 text-gray-1 placeholder:text-gray-7",
            "outline-none border-none",
            className,
          ].join(" ")}
          aria-describedby={[descriptionId, errorId].filter(Boolean).join(" ") || undefined}
          aria-invalid={!!error || undefined}
          {...props}
        />
      </div>

      {hasStatusText && (
        <p
          id={error ? errorId : descriptionId}
          className={`caption-01 ${
            error ? "text-red-400" : "text-gray-7"
          }`}
        >
          {error || description}
        </p>
      )}
    </div>
  );
};

export default Input;

