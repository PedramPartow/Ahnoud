"use client";

import { useState } from "react";
import Link from "next/link";
import { EyeIcon } from "@/components/icons/EyeIcon";
import { EyeSlashIcon } from "@/components/icons/EyeSlashIcon";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { AppleIcon } from "@/components/icons/AppleIcon";
import Input from "@/components/general/Input";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
      {/* Email */}
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="you@example.com"
        description="Use the email you signed up with."
      />

      {/* Password with eye toggle */}
      <div className="relative">
        <Input
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          description="At least 8 characters."
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-0 bottom-3 p-1 text-gray-5 hover:text-gray-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-5 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-13"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeSlashIcon size={20} className="text-current" />
          ) : (
            <EyeIcon size={20} className="text-current" />
          )}
        </button>
      </div>

      {/* Helper links */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-5">Do you need help?</span>
        <Link
          href="/auth/reset-password"
          className="text-primary-5 hover:text-primary-4 no-underline hover:underline"
        >
          Reset Password
        </Link>
      </div>

      {/* Log In button */}
      <button type="submit" className="btn button-01 primary md block">
        Log In
      </button>

      {/* Or divider */}
      <div className="relative flex items-center justify-center">
        <span className="absolute h-px w-full bg-gray-9" aria-hidden />
        <span className="relative z-10 bg-gray-13 px-3 text-sm text-gray-5">
          Or
        </span>
      </div>

      {/* Social login */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="btn button-01 dark md flex items-center justify-center gap-2"
        >
          <GoogleIcon size={20} color="#fff" />
          <span>Google</span>
        </button>
        <button
          type="button"
          className="btn button-01 dark md flex items-center justify-center gap-2"
        >
          <AppleIcon size={20} color="#fff" />
          <span>Apple</span>
        </button>
      </div>
    </form>
  );
}
