"use client";

import ArrowDownIcon from "@/icons/ArrowDownIcon";
import ArrowDownTailIcon from "@/icons/ArrowDownTailIcon";
import MenuIcon from "@/icons/MenuIcon";
import ShoppingBagIcon from "@/icons/ShoppingBagIcon";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Button from "../general/Button";

const HomeHeaderSection = () => {
    const t = useTranslations();

    return (
        <>
            <div className="flex items-center justify-between">
                <Image
                    src="/images/Logo.svg"
                    alt="ahnoud logo"
                    className="w-[33px] h-[40px] md:w-[40px] md:h-[48px]"
                    width={40}
                    height={48}
                />
                <div className="flex items-center gap-4 md:gap-10">
                    <div className="hidden md:flex items-center gap-8">
                        <Button className="dark sm-md" href="/home">
                            {t("home_label")}
                        </Button>
                        <Button className="dark sm-md">
                            {t("products_label")}
                            <ArrowDownIcon />
                        </Button>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <Button className="outline-gray sm-md">
                            <ShoppingBagIcon />
                        </Button>
                        <Button className="outline-gray sm-md">
                            <MenuIcon />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="place-self-center relative mt-16 md:mt-24 mb-40">
                <span className="headline-01 text-gray-1 absolute top-0 md:top-[10%] z-10 w-max left-1/2 -translate-x-1/2 text-center md:text-start md:left-[-450px] md:translate-x-0">
                    {t.rich('luxury_section_label', {
                        br: () => <br />
                    })}
                </span>
                <Image 
                    src="/images/section-one.png" 
                    alt="Home Header Section"
                    height={756}
                    width={570}
                    className="h-[326px] w-[246px] md:h-[756px] md:w-[570px] object-cover brightness-50" 
                    priority
                />
                <span className="headline-01 text-gray-1 absolute bottom-0 md:bottom-[10%] z-10 w-max left-1/2 -translate-x-1/2 text-center md:text-end md:left-auto md:right-[-450px] md:translate-x-0">
                    {t.rich('authenticity_section_label', {
                        br: () => <br />
                    })}
                </span>
            </div>
            <div className="flex flex-col items-center md:flex-row md:items-start md:absolute md:translate-x-0 md:left-20 md:top-[60%] gap-2">
                <span className="caption-01 text-gray-1 text-center md:text-start">{t.rich('scroll_to_learn_more_label', {
                    br: () => <br />
                })}</span>
                <ArrowDownTailIcon size={24} color="var(--color-gray-1)" />
            </div>
            <div className="w-full grid grid-cols-12 mb-12 md:mb-40">
                <span className="col-span-12 md:col-span-9 col-start-1 md:col-start-3 subtitle-01 text-gray-10 text-center md:text-start">{t.rich('hero_subtitle', {
                    brand: (chunks) => <span className="text-gray-1">{chunks}</span>
                })}</span>
            </div>
        </>
    );
};

export default HomeHeaderSection;