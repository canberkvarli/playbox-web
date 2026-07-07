import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Kullanım Koşulları / Terms of Use — Playbox",
  description:
    "Playbox uygulaması ve web sitesinin kullanım koşulları. Terms of use for the Playbox app and website.",
};

export default function TermsPage() {
  return <LegalPage doc="terms" />;
}
