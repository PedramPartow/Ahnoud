"use client"

import { useTranslations } from 'next-intl';
import Image from "next/image";
import HomeIcon from "@/icons/HomeIcon";
import Button from "../general/Button";

const AuthHeader = () => {
  const t = useTranslations();

  return (
    <div className="flex justify-between align-center">
        <Image
            src="/images/Logo.svg"
            alt="ahnoud logo"
            className='w-[33px] h-[40px] md:w-[40px] md:h-[48px]'
            width={40}
            height={48}
        />
        <Button className="blur-gray sm-md" href="/home">
            <HomeIcon size={24} />
            <span className="hidden md:inline">{t("account_btn")}</span>
        </Button>
    </div>
  );
};

export default AuthHeader;  