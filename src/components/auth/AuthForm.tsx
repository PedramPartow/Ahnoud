"use client";

import Tabs from "@/components/general/Tabs";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Button from "../general/Button";
import AppleIcon from "../icons/AppleIcon";
import GoogleIcon from "../icons/GoogleIcon";
import Login from "./Login";
import Register from "./Register";

const AuthForm = () => {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<"register" | "login">("register");

  return (
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
            {activeTab === "login" ? <Login /> : <Register />}
            <div className="relative flex items-center justify-center">
                <span className="absolute h-px w-full bg-gray-1-alpha-20" aria-hidden />
                <span className="relative z-10 bg-gray-13 px-2 subtitle-04 text-gray-5">
                    {t('or_label')}
                </span>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <Button className="outline-gray md">
                    <GoogleIcon size={24} />
                    {t('google_label')}
                </Button>
                <Button className="outline-gray md">
                    <AppleIcon size={24} />
                    {t('apple_label')}
                </Button>
            </div>
        </div>
    </div>
  );
};

export default AuthForm;