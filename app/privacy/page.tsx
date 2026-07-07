import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Gizlilik Politikası / Privacy Policy — Playbox",
  description:
    "Playbox uygulaması ve web sitesinde hangi verilerin toplandığı ve nasıl kullanıldığı. What data the Playbox app and website collect and how it is used.",
};

export default function PrivacyPage() {
  return <LegalPage doc="privacy" />;
}
