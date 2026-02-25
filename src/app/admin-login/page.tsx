"use client";

import Button from "@/components/general/Button";
import EyeIcon from "@/icons/EyeIcon";
import EyeSlashIcon from "@/icons/EyeSlashIcon";
import { ApiError } from "@/services/api/client";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawCallbackUrl = searchParams.get("from");
  const callbackUrl =
    rawCallbackUrl && rawCallbackUrl !== "/admin-login"
      ? rawCallbackUrl
      : "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginShowPassword, setLoginShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    form: "",
  });

  const handleToggle = () => setLoginShowPassword((prev) => !prev);

  const clearError = (field: "email" | "password") => {
    setErrors((prev) => ({ ...prev, [field]: "", form: "" }));
  };

  const validateClientSide = () => {
    const nextErrors = {
      email: "",
      password: "",
      form: "",
    };

    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      nextErrors.email = t("register_email_invalid_error");
    }

    if (password.length < 8) {
      nextErrors.password = t("register_password_min_error");
    }

    return nextErrors;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const clientErrors = validateClientSide();
    setErrors(clientErrors);

    if (Object.values(clientErrors).some(Boolean)) return;

    setLoading(true);
    try {
      const response = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, password }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({} as { error?: string }));
        throw new ApiError(response.status, payload.error || t("generic_error"));
      }

      setErrors({ email: "", password: "", form: "" });
      router.push(callbackUrl);
    } catch (err) {
      if (err instanceof ApiError) {
        const normalizedMessage = err.message.toLowerCase();
        if (normalizedMessage.includes("invalid email or password")) {
          setErrors({
            email: err.message,
            password: err.message,
            form: "",
          });
          return;
        }

        setErrors({ email: "", password: "", form: err.message || t("generic_error") });
      } else {
        setErrors({
          email: "",
          password: "",
          form: t("generic_error"),
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-13 flex items-center justify-center px-5">
      <div className="w-full max-w-[400px] flex flex-col gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="headline-06 text-gray-1">Admin Login</h1>
          <p className="body-01 text-gray-7">Sign in to access the admin panel.</p>
        </div>

        {errors.form && (
          <p className="body-03 text-red-400 text-center">{errors.form}</p>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-12">
          <div className="flex flex-col gap-8">
            <TextField
              autoComplete="nope"
              id="Email"
              type="email"
              label={t("email_label")}
              variant="standard"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError("email");
              }}
              disabled={loading}
              error={!!errors.email}
              helperText={errors.email}
              required
            />
            <TextField
              autoComplete="new-password"
              id="Password"
              label={t("password_label")}
              variant="standard"
              type={loginShowPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearError("password");
              }}
              disabled={loading}
              error={!!errors.password}
              helperText={errors.password}
              required
              slotProps={{
                htmlInput: { minLength: 8 },
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleToggle} edge="end">
                        {loginShowPassword
                          ? <EyeIcon size={24} color={"var(--color-gray-5)"} />
                          : <EyeSlashIcon size={24} color={"var(--color-gray-5)"} />
                        }
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>
          <Button type="submit" className="primary sm-md block" loading={loading}>
            {t("login_button")}
          </Button>
        </form>
      </div>
    </div>
  );
}