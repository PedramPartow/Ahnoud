"use client";

import CallIcon from "@/icons/CallIcon";
import LocationIcon from "@/icons/LocationIcon";
import MailIcon from "@/icons/MailIcon";
import TextField from "@mui/material/TextField";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Script from "next/script";
import React, { type FormEvent } from "react";
import Button from "../general/Button";

const ContactMap = dynamic(
  () => import("./ContactMap"),
  { ssr: false }
) as React.ComponentType<{ lat: number; lng: number }>;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Ahnoud",
  url: "https://ahnoud.com",
  email: "ahnoud@info.com",
  telephone: "+97141234567",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Sheikh Zayed Road",
    addressLocality: "Downtown Dubai",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.2048,
    longitude: 55.2708,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+97141234567",
      contactType: "customer service",
    },
    {
      "@type": "ContactPoint",
      telephone: "+97143217654",
      contactType: "customer service",
      availableLanguage: ["English", "Arabic"],
    },
  ],
};

const ContactUsSection = () => {
  const t = useTranslations();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Script
        id="contact-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section aria-label="Contact Us" className="w-full px-5 md:px-10 lg:px-20 pt-10 md:pt-16 pb-16 md:pb-25">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="flex flex-col gap-6 md:gap-16 col-span-1 lg:col-span-4 lg:col-span-4 lg:col-start-2">
            <header>
              <h1 className="headline-01 text-gray-1">
                {t.rich("contact_page_title", { br: () => <br /> })}
              </h1>
              <p className="subtitle-03 text-gray-7 mt-4 md:mt-6">
                {t("contact_page_subtitle")}
              </p>
            </header>

            <form onSubmit={handleSubmit} aria-label="Contact form" className="flex flex-col mt-6 md:mt-0 gap-8 md:gap-10">
              <TextField autoComplete="name" id="FullName" name="fullName" label={t("full_name_placeholder")} variant="standard" />
              <TextField autoComplete="email" id="Email" name="email" type="email" label={t("email_placeholder")} variant="standard" />
              <TextField autoComplete="off" id="Subject" name="subject" label={t("subject_placeholder")} variant="standard" />
              <TextField autoComplete="off" id="Message" name="message" label={t("message_placeholder")} variant="standard" multiline />

              <div className="block w-full">
                <Button className="primary sm-md" type="submit">
                  {t("get_in_touch_button")}
                </Button>
              </div>
            </form>
          </div>

          <div className="hidden lg:block absolute top-0 left-1/2 h-full w-px -translate-x-1/2 border-l border-gray-1-alpha-20" />
          <div className="lg:hidden -mx-5 md:-mx-10 h-px bg-gray-1-alpha-20" />

          <aside aria-label="Contact details" className="flex flex-col gap-10 md:mt-25 grid-cols-1 lg:grid-cols-12 lg:col-span-4 lg:col-start-8">
            <h2 className="headline-06 text-gray-1">
              {t.rich("contact_details_title", { br: () => <br /> })}
            </h2>

            <address className="not-italic flex flex-col gap-10">
              <div className="flex flex-col gap-3">
                <MailIcon size={40} className="text-secondary-11 w-8 h-8 md:w-10 md:h-10 shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="subtitle-03 text-gray-1">{t("contact_mail_label")}</span>
                  <a href="mailto:ahnoud@info.com" className="body-01 text-gray-5 hover:text-primary-7 transition-colors">
                    {t("footer_email")}
                  </a>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-10 md:gap-14">
                <div className="flex flex-col gap-3">
                  <CallIcon size={40} className="text-secondary-11 w-8 h-8 md:w-10 md:h-10 shrink-0" />
                  <div className="flex flex-col gap-1">
                    <span className="subtitle-03 text-gray-1">{t("contact_office_label")}</span>
                    <a href="tel:+97141234567" className="body-01 text-gray-5 hover:text-primary-7 transition-colors">
                      {t("contact_office_phone")}
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <CallIcon size={40} className="text-secondary-11 w-8 h-8 md:w-10 md:h-10 shrink-0" />
                  <div className="flex flex-col gap-1">
                    <span className="subtitle-03 text-gray-1">{t("contact_whatsapp_label")}</span>
                    <a
                      href="https://wa.me/97143217654"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="body-01 text-gray-5 hover:text-primary-7 transition-colors"
                    >
                      {t("contact_whatsapp_phone")}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-3">
                <LocationIcon size={40} className="text-secondary-11 w-8 h-8 md:w-10 md:h-10 shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="subtitle-03 text-gray-1">{t("contact_address_label")}</span>
                  <span className="body-01 text-gray-5">
                    {t("footer_address_line1")}
                    <br />
                    {t("footer_address_line2")}
                  </span>
                </div>
              </div>
            </address>

            <div className="w-full h-[335px] md:h-[632px] md:w-[570px] overflow-hidden md:mt-10" role="img" aria-label="Office location on map">
              <ContactMap lat={25.2048} lng={55.2708} />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default ContactUsSection;