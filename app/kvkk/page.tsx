import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni — Playbox",
  description:
    "Playbox'ın 6698 sayılı KVKK kapsamındaki kişisel veri işleme faaliyetlerine ilişkin aydınlatma metni.",
};

export default function KvkkPage() {
  return <LegalPage doc="kvkk" />;
}
