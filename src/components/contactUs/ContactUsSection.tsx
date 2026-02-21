"use client";

import CallIcon from "@/icons/CallIcon";
import LocationIcon from "@/icons/LocationIcon";
import MailIcon from "@/icons/MailIcon";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import React, { useState, type FormEvent } from "react";
import Button from "../general/Button";

const ContactMap = dynamic(
  () => import("./ContactMap"),
  { ssr: false }
) as React.ComponentType<{ lat: number; lng: number }>;

const ContactUsSection = () => {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="w-full px-5 md:px-10 lg:px-20 pt-10 md:pt-16 pb-16 md:pb-25">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-10 lg:gap-20">
        {/* Left - Form */}
        <div className="flex flex-col">
          <h1 className="headline-01 text-gray-1 mb-4 md:mb-6">
            {t.rich("contact_page_title", { br: () => <br /> })}
          </h1>
          <p className="subtitle-03 text-gray-7 mb-10 md:mb-14 max-w-[340px]">
            {t("contact_page_subtitle")}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-0">
            <input
              type="text"
              name="fullName"
              placeholder={t("full_name_placeholder")}
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-10 py-4 text-gray-1 body-03 placeholder:text-gray-7 outline-none focus:border-primary-7 transition-colors"
            />
            <input
              type="email"
              name="email"
              placeholder={t("email_placeholder")}
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-10 py-4 text-gray-1 body-03 placeholder:text-gray-7 outline-none focus:border-primary-7 transition-colors"
            />
            <input
              type="text"
              name="subject"
              placeholder={t("subject_placeholder")}
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-10 py-4 text-gray-1 body-03 placeholder:text-gray-7 outline-none focus:border-primary-7 transition-colors"
            />
            <textarea
              name="message"
              placeholder={t("message_placeholder")}
              rows={1}
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-10 py-4 text-gray-1 body-03 placeholder:text-gray-7 outline-none focus:border-primary-7 transition-colors resize-none"
            />

            <div className="mt-8 md:mt-10">
              <Button className="primary sm-md" type="submit">
                {t("get_in_touch_button")}
              </Button>
            </div>
          </form>
        </div>
        <div className="hidden lg:block absolute top-0 left-1/2 h-full w-px -translate-x-1/2 border-l border-gray-1-alpha-20" />
        {/* Right - Contact Details */}
        <div className="flex flex-col">
          <h2 className="subtitle-03 text-gray-1 mb-8 md:mb-10">
            {t.rich("contact_details_title", { br: () => <br /> })}
          </h2>

          {/* Mail */}
          <div className="flex items-start gap-3 mb-8">
            <MailIcon size={20} className="text-primary-7 mt-0.5 shrink-0" />
            <div>
              <span className="button-01 text-gray-1 block">{t("contact_mail_label")}</span>
              <span className="body-03 text-gray-5">{t("footer_email")}</span>
            </div>
          </div>

          {/* Office & WhatsApp */}
          <div className="flex gap-10 md:gap-14 mb-8">
            <div className="flex items-start gap-3">
              <CallIcon size={20} className="text-primary-7 mt-0.5 shrink-0" />
              <div>
                <span className="button-01 text-gray-1 block">{t("contact_office_label")}</span>
                <span className="body-03 text-gray-5">{t("contact_office_phone")}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CallIcon size={20} className="text-primary-7 mt-0.5 shrink-0" />
              <div>
                <span className="button-01 text-gray-1 block">{t("contact_whatsapp_label")}</span>
                <span className="body-03 text-gray-5">{t("contact_whatsapp_phone")}</span>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3 mb-8">
            <LocationIcon
              size={20}
              className="text-primary-7 mt-0.5 shrink-0"
            />
            <div>
              <span className="button-01 text-gray-1 block">{t("contact_address_label")}</span>
              <span className="body-03 text-gray-5">
                {t("footer_address_line1")}
                <br />
                {t("footer_address_line2")}
              </span>
            </div>
          </div>

          {/* Map */}
          <div className="w-full w-full h-[335px] md:h-[632px] md:w-[570px] overflow-hidden">
            <ContactMap lat={25.2048} lng={55.2708} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
