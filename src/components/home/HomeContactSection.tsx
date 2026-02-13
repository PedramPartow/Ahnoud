"use client";

import { useTranslations } from "next-intl";
import Button from "../general/Button";

const HomeContactSection = () => {
  const t = useTranslations();

  return (
    <div className="w-full bg-primary-7 relative overflow-hidden">
      <div className="relative z-10 px-5 md:px-10 lg:px-20 py-16 md:py-24">
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-12">
          <div className="col-span-12 md:col-span-6 flex flex-col gap-6">
            <span className="subtitle-04 text-gray-13">
              {t("contact_us_label")}
            </span>
            <h2 className="headline-03 text-gray-13">
              {t("contact_heading")}
            </h2>
            <p className="body-03 text-gray-11">
              {t("contact_subtitle")}
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col gap-6">
            <div className="border-b border-gray-13/30">
              <input
                type="text"
                placeholder={t("full_name_placeholder")}
                className="w-full bg-transparent py-4 body-03 text-gray-13 placeholder:text-gray-10 outline-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-b border-gray-13/30">
                <input
                  type="email"
                  placeholder={t("email_placeholder")}
                  className="w-full bg-transparent py-4 body-03 text-gray-13 placeholder:text-gray-10 outline-none"
                />
              </div>
              <div className="border-b border-gray-13/30">
                <input
                  type="text"
                  placeholder={t("subject_placeholder")}
                  className="w-full bg-transparent py-4 body-03 text-gray-13 placeholder:text-gray-10 outline-none"
                />
              </div>
            </div>
            <div className="border-b border-gray-13/30">
              <textarea
                rows={1}
                placeholder={t("message_placeholder")}
                className="w-full bg-transparent py-4 body-03 text-gray-13 placeholder:text-gray-10 outline-none resize-none"
              />
            </div>
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
