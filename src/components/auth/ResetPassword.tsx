"use client";

import { authApi } from "@/services/api/auth";
import { ApiError } from "@/services/api/client";
import { toastUtils } from "@/services/toast";
import TextField from "@mui/material/TextField";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";
import Button from "../general/Button";
import SetNewPassword from "./SetNewPassword";

const ResetPassword = ({ setResetPassword }: { setResetPassword: () => void }) => {
  const [newPass, setNewPass] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    form: "",
  });
  const t = useTranslations();

  if (newPass) {
    return (
      <SetNewPassword />
    );
  }

  const clearError = (field: "email") => {
    setErrors((prev) => ({ ...prev, [field]: "", form: "" }));
  };

  const validateClientSide = () => {
    const nextErrors = {
      email: "",
      form: "",
    };

    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      nextErrors.email = t("register_email_invalid_error");
    }

    return nextErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const clientErrors = validateClientSide();
    setErrors(clientErrors);

    if (Object.values(clientErrors).some(Boolean)) return;

    setLoading(true);
    try {
      const response = await authApi.resendConfirmation(trimmedEmail);
      const successMessage = typeof response?.message === "string" ? response.message.trim() : "";
      if (successMessage) {
        toastUtils.success(successMessage);
        setResetPassword();
        return;
      }

      setErrors({ email: "", form: "" });
      setNewPass(true);
    } catch (err) {
      if (err instanceof ApiError) {
        setErrors((prev) => ({
          ...prev,
          form: err.message || t("resend_error_message"),
        }));
      } else {
        setErrors((prev) => ({ ...prev, form: t("resend_error_message") }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col items-stretch gap-8" onSubmit={handleSubmit}>
      <div className="flex flex-col items-stretch gap-6 text-center">
        <h1 className="headline-06  text-gray-1">{t("enter_your_email_title")}</h1>
        <h2 className="body-01 text-gray-7">{t("enter_your_email_subtitle")}</h2>
      </div>
      <div className="flex flex-col items-stretch gap-12">
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
        {errors.form && <span className="body-03 text-red-500 text-center">{errors.form}</span>}
        <Button type="submit" className="primary block sm-md" loading={loading}>
          {t("receive_reset_link_button")}
        </Button>
      </div>
    </form>
  );
};

export default ResetPassword;