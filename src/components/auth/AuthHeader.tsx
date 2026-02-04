"use client"

import { useTranslations } from 'next-intl';
import Image from "next/image";
import Button from "../general/Button";
import HomeIcon from "../icons/HomeIcon";

const AuthHeader = () => {
  const t = useTranslations();

  return (
    <div className="flex justify-between align-center">
        <Image
            src="/svg/Logo.svg"
            alt="ahnoud logo"
            width={40}
            height={48}
        />
        <Button className="blur-gray md" href="/home">
            <HomeIcon size={24} />
            {t("account_btn")}
        </Button>
    </div>
  );
};

export default AuthHeader;  