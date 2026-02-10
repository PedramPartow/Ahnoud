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
    );
};

export default HomeHeaderSection;
