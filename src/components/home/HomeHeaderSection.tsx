"use client";

import ArrowDownIcon from "@/icons/ArrowDownIcon";
import MenuIcon from "@/icons/MenuIcon";
import ShoppingBagIcon from "@/icons/ShoppingBagIcon";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Button from "../general/Button";

const HomeHeaderSection = () => {
    const t = useTranslations();

    return (
        <>
            <div className="w-full block">
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
            </div>
            <div className="place-self-center relative mt-[90px] mb-[160px]">
                <span className="headline-01 text-gray-1 absolute top-[10%] left-[-450px] z-10"
                    dangerouslySetInnerHTML={{ __html: t('luxury_section_label') }}
                />
                <Image 
                    src="/images/section-one.png" 
                    alt="Home Header Section"
                    height={756}
                    width={570}
                    className="h-[326px] w-[246px] md:h-[756px] md:w-[570px] object-cover brightness-50" 
                    priority
                />
                <span className="headline-01 text-gray-1 absolute bottom-[10%] right-[-450px] z-10"
                    dangerouslySetInnerHTML={{ __html: t('authenticity_section_label') }}
                />
            </div>
            <div className="w-full grid grid-cols-12 mb-[160px]">
                <span className="col-span-9 col-start-3 subtitle-01 text-gray-10 text-start">{t.rich('hero_subtitle', {
                    brand: (chunks) => <span className="text-gray-1">{chunks}</span>
                })}</span>
            </div>
        </>
    );
};

export default HomeHeaderSection;