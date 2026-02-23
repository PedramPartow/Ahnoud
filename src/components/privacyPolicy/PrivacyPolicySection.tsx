"use client";

import { useTranslations } from "next-intl";

interface SectionWithListProps {
  titleKey: string;
  introKey: string;
  itemKeys: string[];
  outroKey?: string;
}

interface SectionWithTextProps {
  titleKey: string;
  textKey: string;
}

const PrivacyPolicySection = () => {
  const t = useTranslations();

  const listSections: SectionWithListProps[] = [
    {
      titleKey: "privacy_section_1_title",
      introKey: "privacy_section_1_intro",
      itemKeys: [
        "privacy_section_1_item_1",
        "privacy_section_1_item_2",
        "privacy_section_1_item_3",
        "privacy_section_1_item_4",
      ],
    },
    {
      titleKey: "privacy_section_2_title",
      introKey: "privacy_section_2_intro",
      itemKeys: [
        "privacy_section_2_item_1",
        "privacy_section_2_item_2",
        "privacy_section_2_item_3",
        "privacy_section_2_item_4",
      ],
    },
    {
      titleKey: "privacy_section_3_title",
      introKey: "privacy_section_3_intro",
      itemKeys: [
        "privacy_section_3_item_1",
        "privacy_section_3_item_2",
        "privacy_section_3_item_3",
      ],
      outroKey: "privacy_section_3_outro",
    },
    {
      titleKey: "privacy_section_6_title",
      introKey: "privacy_section_6_intro",
      itemKeys: [
        "privacy_section_6_item_1",
        "privacy_section_6_item_2",
        "privacy_section_6_item_3",
        "privacy_section_6_item_4",
      ],
    },
  ];

  const textSections: SectionWithTextProps[] = [
    { titleKey: "privacy_section_4_title", textKey: "privacy_section_4_text" },
    { titleKey: "privacy_section_5_title", textKey: "privacy_section_5_text" },
    { titleKey: "privacy_section_7_title", textKey: "privacy_section_7_text" },
  ];

  const orderedSections = [
    { type: "list" as const, index: 0 },
    { type: "list" as const, index: 1 },
    { type: "list" as const, index: 2 },
    { type: "text" as const, index: 0 },
    { type: "text" as const, index: 1 },
    { type: "list" as const, index: 3 },
    { type: "text" as const, index: 2 },
  ];

  return (
    <div className="px-5 md:px-10 lg:px-20 pt-10 lg:pt-30 pb-20 lg:pb-40">
      <div className="w-full md:max-w-[80%] lg:max-w-[60%] mx-auto">
        <h1 className="headline-01 text-gray-1 mb-6 md:mb-10">
          {t("privacy_policy_title")}
        </h1>
        <p className="body-01 text-gray-1 mb-16 md:mb-20">
          {t("privacy_policy_intro")}
        </p>

        <div className="flex flex-col gap-16 md:gap-20">
          {orderedSections.map((section, i) => {
            if (section.type === "list") {
              const s = listSections[section.index];
              return (
                <div key={i} className="flex flex-col gap-4">
                  <h2 className="subtitle-03 text-gray-1">{t(s.titleKey)}</h2>
                  <p className="body-01 text-gray-5">{t(s.introKey)}</p>
                  <ul className="flex flex-col gap-1 ps-5">
                    {s.itemKeys.map((key) => (
                      <li key={key} className="body-01 text-gray-5 list-disc">
                        {t(key)}
                      </li>
                    ))}
                  </ul>
                  {s.outroKey && (
                    <p className="body-01 text-gray-5">{t(s.outroKey)}</p>
                  )}
                </div>
              );
            }
            const s = textSections[section.index];
            return (
              <div key={i} className="flex flex-col gap-4">
                <h2 className="subtitle-03 text-gray-1">{t(s.titleKey)}</h2>
                <p className="body-01 text-gray-5">{t(s.textKey)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicySection;