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
            className='hidden md:block'
            width={40}
            height={48}
        />
        <Image
            src="/svg/Logo.svg"
            alt="ahnoud logo"
            className='block md:hidden'
            width={33}
            height={40}
        />
        <Button className="blur-gray md" href="/home">
            <HomeIcon size={24} />
            <span className="hidden md:inline">{t("account_btn")}</span>
        </Button>
    </div>
  );
};

export default AuthHeader;  