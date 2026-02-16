"use client";

import ArrowDownIcon from "@/icons/ArrowDownIcon";
import ArrowDownTailIcon from "@/icons/ArrowDownTailIcon";
import MenuIcon from "@/icons/MenuIcon";
import ShoppingBagIcon from "@/icons/ShoppingBagIcon";
import UserCircleIcon from "@/icons/UserCircleIcon";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import Button from "../general/Button";
import MenuOverlay from "../general/MenuOverlay";

function getAuthToken(): string | undefined {
    if (typeof document === "undefined") return undefined;
    const match = document.cookie.match(/(?:^|;\s*)auth_token=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : undefined;
}

const emptySubscribe = () => () => {};

const HomeHeaderSection = () => {
    const t = useTranslations();
    const isLoggedIn = useSyncExternalStore(
        emptySubscribe,
        () => !!getAuthToken(),
        () => false
    );

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
            <div className="flex items-center justify-between">
                <Image
                    src="/images/Logo.svg"
                    alt="ahnoud logo"
                    className="w-[33px] h-[40px] md:w-[40px] md:h-[48px]"
                    width={40}
                    height={48}
                />
                <div className="flex items-center gap-4 md:gap-6 lg:gap-10">
                    <div className="hidden md:flex items-center gap-4 lg:gap-8">
                        {/* <Button className="dark sm-md" href="/home">
                            {t("home_label")}
                        </Button> */}
                        <Button className="dark sm-md">
                            {t("products_label")}
                            <ArrowDownIcon />
                        </Button>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        {isLoggedIn ? (
                            <Button className="outline-gray sm-md">
                                <ShoppingBagIcon />
                            </Button>
                        ) : (
                            <>
                                <Button href="/auth" className="hidden! md:inline-flex! primary sm-md">{t('join_or_login_button')}</Button>
                                <Button className="md:hidden! primary sm-md"><UserCircleIcon size={24} /></Button>
                            </>
                        )}
                        <Button className="outline-gray sm-md" onClick={() => setMenuOpen(true)}>
                            <MenuIcon />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-fit mx-auto relative my-25 md:mt-[90px] md:mb-28 lg:mb-40">
                <span className="headline-01 text-gray-1 absolute top-[-20%] md:top-[10%] z-10 w-max left-1/2 -translate-x-1/2 text-center md:text-start rtl:md:right-[max(-450px,calc(-50vw_+_300px))] ltr:md:left-[max(-450px,calc(-50vw_+_300px))] md:translate-x-0">
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
                <span className="headline-01 text-gray-1 absolute bottom-[-20%] md:bottom-[10%] z-10 w-max left-1/2 -translate-x-1/2 text-center md:text-start md:left-auto rtl:left-[max(-450px,calc(-50vw_+_300px))] ltr:md:right-[max(-450px,calc(-50vw_+_300px))] md:translate-x-0">
                    {t.rich('authenticity_section_label', {
                        br: () => <br />
                    })}
                </span>
            </div>
            <div 
                className="flex flex-col items-center md:flex-row md:items-start md:absolute 
                md:start-10 lg:start-20 md:top-[75%] lg:top-[60%] gap-2 mb-16 md:mb-0"
            >
                <span className="caption-01 text-gray-1 text-center md:text-start">{t.rich('scroll_to_learn_more_label', {
                    br: () => <br />
                })}</span>
                <ArrowDownTailIcon size={24} color="var(--color-gray-1)" />
            </div>
            <div className="w-full mb-12 md:mb-20 lg:mb-40 text-start md:max-w-6xl mx-auto">
                <span className="col-span-12 md:col-span-9 col-start-1 md:col-start-3 subtitle-01 text-gray-10">
                    <Image src="/images/Star.svg" width={45} height={45} alt="star" className="inline-block align-middle me-2 w-6 h-6 md:w-[45px] md:h-[45px]" />
                    {t.rich('hero_subtitle', {
                        brand: (chunks) => <span className="text-gray-1 subtitle-01">{chunks}</span>
                    })}
                </span>
            </div>
        </>
    );
};

export default HomeHeaderSection;