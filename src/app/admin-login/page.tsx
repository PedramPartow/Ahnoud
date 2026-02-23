"use client";

import Button from "@/components/general/Button";
import EyeIcon from "@/icons/EyeIcon";
import EyeSlashIcon from "@/icons/EyeSlashIcon";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("from") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (result?.error) {
      router.push(callbackUrl);
    } else {
      router.push(callbackUrl);
    }
  }

  return (
    <div className="min-h-screen bg-gray-13 flex items-center justify-center px-5">
      <div className="w-full max-w-[400px] flex flex-col gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="headline-06 text-gray-1">Admin Login</h1>
          <p className="body-01 text-gray-7">Sign in to access the admin panel.</p>
        </div>

        {error && (
          <p className="body-03 text-red-400 text-center">{error}</p>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-12">
          <div className="flex flex-col gap-8">
            <TextField
              fullWidth
              autoComplete="email"
              label="Email"
              variant="standard"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              autoComplete="current-password"
              label="Password"
              variant="standard"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                      {showPassword
                        ? <EyeIcon size={24} color="var(--color-gray-5)" />
                        : <EyeSlashIcon size={24} color="var(--color-gray-5)" />
                      }
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Button type="submit" className="primary sm-md block" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}