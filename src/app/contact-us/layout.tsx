import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Ahnoud",
  description:
    "Get in touch with Ahnoud. Reach us by email, phone, or WhatsApp. Visit our office at Sheikh Zayed Road, Downtown Dubai.",
  openGraph: {
    title: "Contact Us | Ahnoud",
    description:
      "Get in touch with Ahnoud. Reach us by email, phone, or WhatsApp for any inquiries about our luxury products.",
    type: "website",
    url: "/contact-us",
  },
  alternates: {
    canonical: "/contact-us",
  },
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
