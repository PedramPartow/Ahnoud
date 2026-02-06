"use client";

import { useTranslations } from "next-intl";
import Button from "../general/Button";

const VerifyEmail = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-stretch gap-12">
      <div className="flex flex-col items-stretch gap-6 text-center">
        <h1 className="headline-06  text-gray-1">{t("verify_email_title")}</h1>
        <h2 className="body-01 text-gray-7">{t("verify_email_subtitle")}</h2>
      </div>
      <div className="w-full h-[1px] bg-gray-10"></div>
      <div className="flex flex-col items-stretch gap-10 text-center px-6">
        <span className="caption-01 text-gray-7">{t("Didnot_get_email_subtitle")}</span>
        <Button className="dark block sm">{t("resend_label")}</Button>
      </div>
    </div>
  );
};

export default VerifyEmail;