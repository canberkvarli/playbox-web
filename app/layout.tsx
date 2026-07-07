import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { I18nProvider } from "@/lib/i18n";
import { LenisProvider } from "@/lib/lenis-provider";
import "./globals.css";

const archivo = localFont({
  src: [
    { path: "./fonts/ArchivoExpanded-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/ArchivoExpanded-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/ArchivoExpanded-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "./fonts/ArchivoExpanded-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://playbox.com.tr"),
  title: {
    default: "Playbox · Bul. Aç. Oyna.",
    template: "%s · Playbox",
  },
  description:
    "Sahaların yanında akıllı spor istasyonları. Uygulamadan en yakın Playbox'ı bul, Bluetooth ile aç, ekipmanı al, oyna. Türkiye'nin anlık spor ekipmanı ağı.",
  keywords: ["playbox", "spor", "ekipman", "basketbol", "futbol", "tenis", "voleybol", "türkiye", "istanbul", "kiralama"],
  authors: [{ name: "Playbox Türkiye" }],
  alternates: {
    languages: { "tr-TR": "/", "en-US": "/?lang=en" },
  },
  openGraph: {
    title: "Playbox · Bul. Aç. Oyna.",
    description: "Sahaların yanında akıllı spor istasyonları. Bul, aç, oyna.",
    type: "website",
    locale: "tr_TR",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Playbox · Bul. Aç. Oyna.",
    description: "Sahaların yanında akıllı spor istasyonları. Bul, aç, oyna.",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${archivo.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="grain bg-asphalt text-concrete antialiased">
        <I18nProvider>
          <LenisProvider>
            {children}
            <Toaster
              position="bottom-center"
              toastOptions={{
                style: {
                  background: "#202127",
                  color: "#f4f3ee",
                  border: "1px solid #d6fb3c",
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "13px",
                  letterSpacing: "0.02em",
                },
              }}
            />
          </LenisProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
