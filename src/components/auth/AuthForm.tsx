"use client";

import Tabs from "@/components/general/Tabs";
import { useTranslations } from "next-intl";
import { useState } from "react";
import AppleIcon from "@/icons/AppleIcon";
import ArrowLeftTailIcon from "@/icons/ArrowLeftTailIcon";
import GoogleIcon from "@/icons/GoogleIcon";
import Button from "../general/Button";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from './ResetPassword';
import VerifyEmail from './VerifyEmail';

const AuthForm = () => {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<"register" | "login">("register");
  const [verifyRegister, setVerifyRegister] = useState<boolean>(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [registerEmail, setRegisterEmail] = useState('');

  if (verifyRegister) {
    return (
        <div className="flex flex-col gap-4 my-6 md:my-16">
            <Button className="blur-gray sm-md md:w-12!" onClick={() => setVerifyRegister((prev) => !prev)}><ArrowLeftTailIcon size={24}/><span className="md:hidden">{t("back_label")}</span></Button>
            <div className="flex flex-col md:p-16 bg-gray-13">
                <VerifyEmail
                  email={registerEmail}
                  onResendSuccess={() => {
                    setActiveTab("login");
                    setVerifyRegister(false);
                  }}
                />
            </div>
        </div>
    );
  }

  if (resetPassword) {
    return (
        <div className="flex flex-col gap-4 my-6 md:my-16">
            <Button className="blur-gray sm-md md:w-12!" onClick={() => setResetPassword((prev) => !prev)}><ArrowLeftTailIcon size={24}/><span className="md:hidden">{t("back_label")}</span></Button>
            <div className="flex flex-col md:p-16 bg-gray-13">
                <ResetPassword />
            </div>
        </div>
    );
  }

  return (
    <div className="flex flex-col md:p-16 bg-gray-13 my-6 md:my-16">
        <div className="flex flex-col items-stretch gap-8">
            <div className="flex flex-col justify-center items-center gap-3 text-center">
                <h1 className="headline-06 text-gray-1">{t("login_or_join_title")}</h1>
                <h2 className="body-01 text-gray-7">{t("login_or_join_subtitle")}</h2>
            </div>
            <Tabs
                tabs={[
                    { id: "register", label: t("register_button") },
                    { id: "login", label: t("login_button") },
                ]}
                activeId={activeTab}
                onChange={(id) => setActiveTab(id as "register" | "login")}
            />
            <div className="flex flex-col gap-8">
                {activeTab === "login" ? (
                    <Login setResetPassword={setResetPassword} />
                ) : (
                    <Register setVerifyRegister={setVerifyRegister} email={registerEmail} setEmail={setRegisterEmail} />
                )}
                <div className="relative flex items-center justify-center">
                    <span className="absolute h-px w-full bg-gray-1-alpha-20" aria-hidden />
                    <span className="relative z-10 bg-gray-13 px-2 subtitle-04 text-gray-5">
                        {t('or_label')}
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <Button className="outline-gray sm-md">
                        <GoogleIcon size={24} />
                        {t('google_label')}
                    </Button>
                    <Button className="outline-gray sm-md">
                        <AppleIcon size={24} />
                        {t('apple_label')}
                    </Button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AuthForm;