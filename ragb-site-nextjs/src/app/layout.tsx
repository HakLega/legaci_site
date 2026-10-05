import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { site } from "../data/site";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: site.name,
  url: site.url,
  description: site.description,
  email: site.email,
  telephone: site.phone,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Leggare | Consultoria regulatória",
    template: "%s | Leggare",
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: site.name,
    title: "Leggare | Consultoria regulatória",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Leggare | Consultoria regulatória",
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
