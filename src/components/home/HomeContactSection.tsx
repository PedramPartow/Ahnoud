"use client";

import TextField from "@mui/material/TextField";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Button from "../general/Button";

const HomeContactSection = () => {
  const t = useTranslations();

  return (
    <div className="w-full flex-1 bg-primary-7 relative overflow-hidden">
      <div className="absolute md:hidden bottom-0 left-5 w-[335px] h-[335px] translate-y-[5%] opacity-10">
        <Image
          src="/images/vector-2.png"
          alt=""
          fill
          sizes="(min-width: 768px) 335px, 200px"
          className="object-contain"
          aria-hidden="true"
        />
      </div>
      <div className="hidden absolute md:block bottom-0 left-[15%] w-[450px] h-[450px] lg:w-[600px] lg:h-[600px] translate-y-[5%] opacity-10">
        <Image
          src="/images/vector-2.png"
          alt=""
          fill
          sizes="(min-width: 768px) 600px, 200px"
          className="object-contain"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 px-5 md:px-10 lg:px-20 py-20 md:py-25">
        <div className="grid grid-cols-12 gap-y-10 md:gap-y0">
          <div className="grid grid-cols-12 md:col-span-6 xl:col-span-7 gap-6">
            <div className="col-span-12 md:col-span-2">
              <span className="subtitle-04 text-gray-13">
                {t("contact_us_label")}
              </span>
            </div>
            <div className="col-span-12 md:col-span-10 flex flex-col gap-3 md:gap-6 lg:gap-8">
              <h2 className="headline-04 text-gray-13">
                {t("contact_heading")}
              </h2>
              <p className="body-01 text-gray-13">
                {t("contact_subtitle")}
              </p>
            </div>
          </div>
          <div className="md:mt-50 col-span-12 md:col-span-6 xl:col-span-5 flex flex-col gap-8 md:gap-6">
            <div className="grid grid-cols-1 xl:grid-cols-2">
              <TextField
                variant="standard"
                label={t("full_name_placeholder")}
                type="text"
              />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <TextField
                variant="standard"
                label={t("email_placeholder")}
                type="email"
                fullWidth
              />
              <TextField
                variant="standard"
                label={t("subject_placeholder")}
                type="text"
                fullWidth
              />
            </div>
            <TextField
              variant="standard"
              label={t("message_placeholder")}
              multiline
              minRows={1}
              fullWidth
            />
            <div className="pt-4">
              <Button className="dark md" type="submit">
                {t("get_in_touch_button")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContactSection;