"use client";

import TextField from '@mui/material/TextField';
import { useTranslations } from "next-intl";
import { useState } from 'react';
import Button from "../general/Button";
import SetNewPassword from './SetNewPassword';

const ResetPassword = () => {
  const [newPass, setNewPass] = useState(false);
  const t = useTranslations();

  if (newPass) {
    return (
      <SetNewPassword />
    );
  }

  const handleIt = () => {
    setNewPass(true);
  }

  return (
    <div className="flex flex-col items-stretch gap-8">
      <div className="flex flex-col items-stretch gap-6 text-center">
        <h1 className="headline-06  text-gray-1">{t("enter_your_email_title")}</h1>
        <h2 className="body-01 text-gray-7">{t("enter_your_email_subtitle")}</h2>
      </div>
      <div className="flex flex-col items-stretch gap-12">
        <TextField autoComplete="nope" id="Email" label={t('email_label')} variant="standard" />
        <Button className="primary block md" onClick={handleIt}>{t("receive_reset_link_button")}</Button>
      </div>
    </div>
  );
};

export default ResetPassword;