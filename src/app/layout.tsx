import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { cookies } from 'next/headers';
import { env } from "process";
import "../styles/globals.css";
import MuiProvider from './mui-provider';
import QueryProvider from './query-provider';
import ToastProvider from "./toast-provider";

export const metadata: Metadata = {
  title: "Ahnoud",
  description: "Ahnoud Portfolio Website",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const store = await cookies();
  const locale = store.get('locale')?.value || 'en';

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <QueryProvider>
          <MuiProvider direction={locale === 'ar' ? 'rtl' : 'ltr'}>
            <NextIntlClientProvider>
              {children}
              <ToastProvider />
            </NextIntlClientProvider>
          </MuiProvider>
        </QueryProvider>
      </body>
    </html>
  );
}