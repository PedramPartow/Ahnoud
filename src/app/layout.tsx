import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import "../styles/globals.css";
import { env } from "process";
import MuiProvider from './mui-provider';

export const metadata: Metadata = {
  title: "Ahnoud",
  description: "Ahnoud Portfolio Website",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={env.LANG} dir={env.LANG === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <MuiProvider>
          <NextIntlClientProvider>
            {children}
          </NextIntlClientProvider>
        </MuiProvider>
      </body>
    </html>
  );
}