import type { Metadata } from "next";
import { Bebas_Neue, Instrument_Serif, Inter } from "next/font/google";
import { Toaster } from "sonner";
import { I18nProvider } from "@/lib/i18n";
import { LenisProvider } from "@/lib/lenis-provider";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const instrument = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://playbox-web.vercel.app"),
  title: {
    default: "Playbox · Oynamaya hazır mısın?",
    template: "%s · Playbox",
  },
  description:
    "Şehrin her köşesinde, cebinden çıkan bir spor sahası. Türkiye'nin Bluetooth ile açılan spor istasyonları.",
  keywords: ["playbox", "spor", "basketbol", "futbol", "tenis", "türkiye", "istanbul"],
  authors: [{ name: "Playbox Türkiye" }],
  openGraph: {
    title: "Playbox · Oynamaya hazır mısın?",
    description: "Şehrin her köşesinde, cebinden çıkan bir spor sahası.",
    type: "website",
    locale: "tr_TR",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Playbox · Oynamaya hazır mısın?",
    description: "Şehrin her köşesinde, cebinden çıkan bir spor sahası.",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${bebas.variable} ${instrument.variable} ${inter.variable}`}>
      <body className="bg-ink text-paper antialiased">
        <I18nProvider>
          <LenisProvider>
            {children}
            <Toaster
              position="bottom-center"
              toastOptions={{
                style: {
                  background: "#1a1f3a",
                  color: "#ffffff",
                  border: "1px solid #e87527",
                  fontFamily: "var(--font-inter)",
                },
              }}
            />
          </LenisProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
