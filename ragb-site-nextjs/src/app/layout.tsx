import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { site } from "../data/site";

const description =
  "Consultoria regulatória para empresas que buscam clareza sobre requisitos, estratégia e próximos passos no Brasil.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Leggare | Consultoria regulatória",
    template: "%s | Leggare",
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: site.name,
    title: "Leggare | Consultoria regulatória",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Leggare | Consultoria regulatória",
    description,
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
      <body>{children}</body>
    </html>
  );
}
