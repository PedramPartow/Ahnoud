"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { authApi } from "@/services/api/auth";
import { ApiError } from "@/services/api/client";
import { toastUtils } from "@/services/toast";
import Button from "../general/Button";

interface VerifyEmailProps {
  email: string;
  onResendSuccess: () => void;
}

const VerifyEmail = ({ email, onResendSuccess }: VerifyEmailProps) => {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    if (!email) {
      toastUtils.error(t("register_email_required_for_resend_error"));
      return;
    }

    setLoading(true);

    try {
      const response = await authApi.resendConfirmation(email);
      const successMessage = typeof response?.message === "string" ? response.message.trim() : "";
      if (successMessage) {
        toastUtils.success(successMessage);
      }
      onResendSuccess();
    } catch (err) {
      if (err instanceof ApiError) {
        toastUtils.error(err.message || t("resend_error_message"));
      } else {
        toastUtils.error(t("resend_error_message"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-stretch gap-12">
      <div className="flex flex-col items-stretch gap-6 text-center">
        <h1 className="headline-06  text-gray-1">{t("verify_email_title")}</h1>
        <h2 className="body-01 text-gray-7">{t("verify_email_subtitle")}</h2>
      </div>
      <div className="w-full h-[1px] bg-gray-10"></div>
      <div className="flex flex-col items-stretch gap-10 text-center px-6">
        <span className="caption-01 text-gray-7">{t("Didnot_get_email_subtitle")}</span>
        <Button className="dark block sm" onClick={handleResend} loading={loading}>
          {t("resend_label")}
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmail;