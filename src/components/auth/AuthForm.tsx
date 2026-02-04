"use client";

import Tabs from "@/components/general/Tabs";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Login from "./Login";

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
        <div>
            {activeTab === "login" ? <Login /> : <span className="text-gray-1">Register</span>}
        </div>
    </div>
  );
};

export default AuthForm;
