"use client";

import TextField from "@mui/material/TextField";
import { useTranslations } from "next-intl";
import Button from "../general/Button";

const darkFieldSx = {
  "& .MuiInput-root:before": {
    borderBottomColor: "var(--color-gray-13-alpha-30, rgba(255,255,255,0.3))",
  },
  "& .MuiInput-root:hover:not(.Mui-disabled):before": {
    borderBottomColor: "var(--color-gray-13-alpha-30, rgba(255,255,255,0.3))",
  },
  "& .MuiInput-root:after": {
    borderBottomColor: "var(--color-gray-13)",
  },
  "& .MuiInputBase-input": {
    color: "var(--color-gray-13)",
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0px 1000px var(--color-primary-7) inset",
      WebkitTextFillColor: "var(--color-gray-13)",
      caretColor: "var(--color-gray-13)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "var(--color-gray-10)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "var(--color-gray-13)",
  },
  "& .MuiInputLabel-root.MuiInputLabel-shrink": {
    color: "var(--color-gray-13)",
  },
};

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
            <TextField
              variant="standard"
              label={t("full_name_placeholder")}
              type="text"
              fullWidth
              sx={darkFieldSx}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                variant="standard"
                label={t("email_placeholder")}
                type="email"
                fullWidth
                sx={darkFieldSx}
              />
              <TextField
                variant="standard"
                label={t("subject_placeholder")}
                type="text"
                fullWidth
                sx={darkFieldSx}
              />
            </div>
            <TextField
              variant="standard"
              label={t("message_placeholder")}
              multiline
              minRows={1}
              fullWidth
              sx={darkFieldSx}
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
