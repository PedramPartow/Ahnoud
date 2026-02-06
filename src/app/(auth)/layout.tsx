import AuthHeader from "@/components/auth/AuthHeader";
import { getTranslations } from "next-intl/server";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/SmokedWizard.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex min-h-screen w-full flex-col md:px-20 pt-6">
        <AuthHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex justify-between items-center w-full">
            <span className="subtitle-04 text-gray-1">
              {t("account_title")}
            </span>
            <div className="w-full max-w-xl">
              {children}
            </div>
            <span className="subtitle-04 text-gray-1">
              {t("account_subtitle")}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}