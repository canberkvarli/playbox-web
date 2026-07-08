"use client";

import { createContext, useContext, useEffect, useState, type ReactNode, createElement } from "react";

export type Lang = "tr" | "en";

export const dict = {
  tr: {
    nav: { how: "Nasıl", sports: "Sporlar", players: "Oyuncular", sponsors: "Sponsorlar", app: "Uygulamayı Al" },
    ticker: ["BASKETBOL", "FUTBOL", "TENİS", "VOLEYBOL", "BUL", "AÇ", "OYNA", "İADE ET", "SERİ YAP"],
    hero: {
      kicker: "PLAYBOX · TÜRKİYE",
      title1: "SAHAYA İN.",
      title2: "GERİSİ BİZDE.",
      sub: "Sahaların yanında akıllı spor istasyonları. En yakınını bul, telefonunla aç, ekipmanı kap, oyna. Ekipman derdi yok.",
      ctaApp: "UYGULAMAYI AL",
      ctaWaitlist: "BEKLEME LİSTESİ",
      soon: "yakında",
      scroll: "kaydır",
      stats: [
        { n: "4", label: "spor" },
        { n: "7/24", label: "açık" },
        { n: "2 sn", label: "bluetooth" },
      ],
    },
    how: {
      kicker: "NASIL ÇALIŞIR",
      title: "DÖRT ADIM. HEPSİ BU.",
      steps: [
        { n: "01", t: "BUL", d: "Uygulamadan en yakın Playbox istasyonunu haritada bul." },
        { n: "02", t: "AÇ", d: "Telefonunla yaklaş, Bluetooth ile kapak saniyeler içinde açılsın." },
        { n: "03", t: "OYNA", d: "Ekipmanı al, sahaya çık. Süre telefonunda işliyor." },
        { n: "04", t: "İADE ET", d: "Bitince istasyona geri koy. Seriyi büyüt, tekrar oyna." },
      ],
    },
    sports: {
      kicker: "SPORLAR",
      title: "HANGİSİNİ SEÇERSEN SEÇ.",
      sub: "Her istasyon birden fazla sporu taşır. Dahası yolda.",
      items: [
        { emoji: "🏀", name: "BASKETBOL", gear: "Top + el bandı", tag: "IST-KADIKOY-07" },
        { emoji: "⚽", name: "FUTBOL", gear: "Top + dizlik", tag: "IST-BESIKTAS-03" },
        { emoji: "🎾", name: "TENİS", gear: "Raket + top tüpü", tag: "IST-MODA-01" },
        { emoji: "🏐", name: "VOLEYBOL", gear: "Top + diz desteği", tag: "IST-CADDEBOSTAN-05" },
      ],
      more: "PADDLE · BADMINTON · DAHA FAZLASI YOLDA",
    },
    players: {
      kicker: "OYUNCULAR İÇİN",
      title: "AÇ. OYNA. DEVAM ET.",
      sub: "Playbox uygulaması. İstasyonları bul, oyununu başlat, seriyi büyüt.",
      features: [
        { t: "saniyede aç", d: "Bluetooth ile kapak anında açılır. Kod yok, sıra yok." },
        { t: "sürtünmesiz ödeme", d: "Telefonunla başla, telefonunla bitir. Göstergeli, şeffaf ücret." },
        { t: "seri sistemi", d: "İstatistik, rozet ve arkadaş tablosu. Oynadıkça büyür." },
        { t: "türkçe + i̇ngilizce", d: "İki dilde arayüz. Sen nasıl istersen." },
      ],
      ios: "App Store",
      android: "Google Play",
      soon: "YAKINDA",
    },
    sponsors: {
      kicker: "SPONSORLAR",
      title: "OYUNU GÜÇLENDİR.",
      sub: "Logon sahada. Desteğin oyunculara ücretsiz oyun saati olarak dönüyor. Gerisi bizde.",
      benefits: [
        { n: "01", t: "GÖRÜNÜRLÜK", d: "Logon istasyonda ve uygulamada." },
        { n: "02", t: "ÜCRETSİZ SAAT", d: "Desteğin oyunculara bedava oyun olur." },
        { n: "03", t: "SIFIR UĞRAŞ", d: "Kurulum da bakım da bizde." },
        { n: "04", t: "YEREL ETKİ", d: "Mahallenin sporu seninle ayakta." },
      ],
      wallLabel: "SENİN LOGON BURADA · 6 SLOT AÇIK",
      form: {
        title: "KONUŞALIM.",
        sub: "Formu doldur, birlikte planlayalım.",
        name: "Adın",
        company: "Marka / şirket",
        email: "E-posta",
        message: "Ne sunmak istersin? (opsiyonel)",
        submit: "GÖNDER",
        sending: "GÖNDERİLİYOR...",
        success: "Aldık. Yakında yazıyoruz. ⚡",
        error: "Bir şeyler ters gitti. Tekrar dene.",
      },
    },
    waitlist: {
      kicker: "BEKLEME LİSTESİ",
      title: "İLK HABERİ AL.",
      sub: "Şehrine geldiğimizde ilk sana yazalım.",
      placeholder: "e-posta adresin",
      submit: "BEKLEMEYE GİR",
      sending: "GÖNDERİLİYOR...",
      success: "Listedesin. Şehrine geldiğimizde haber veriyoruz. ⚡",
      error: "Bir şeyler ters gitti. Tekrar dene.",
    },
    faq: {
      kicker: "SIKÇA SORULAN",
      title: "AKLINDAKİ HER ŞEY.",
      items: [
        { q: "Şu an nerede istasyon var?", a: "İlk istasyonlarımız 2026 yazında İstanbul'da açılıyor. Diğer şehirler için bekleme listesine gir." },
        { q: "Nasıl ödeme yapıyorum?", a: "Uygulamadan kayıtlı kartınla. Oyun başlamadan göstergeli ücret, bitince otomatik tahsilat." },
        { q: "Ekipman güvenli mi?", a: "Her istasyon kilitli ve sigortalı. Küçük bir depozit dışında ek ücret yok." },
        { q: "Hangi sporları oynayabilirim?", a: "Şu an basketbol, futbol, tenis ve voleybol. Paddle ve badminton yolda." },
        { q: "Uygulama ne zaman çıkıyor?", a: "Beta yazın başında. App Store ve Google Play'de olacak." },
        { q: "Sponsor olmak istiyorum, nasıl olur?", a: "Sponsorlar bölümündeki formu doldur. Logon volt duvarına, desteğin oyunculara ücretsiz saate dönüşür." },
        { q: "Başka bir sorum var?", a: "canberkvarli@gmail.com adresine yaz, hızlıca dönüyoruz." },
      ],
    },
    footer: {
      tag: "Sahaların yanında akıllı spor istasyonları. Sahaya in, gerisi bizde.",
      city: "TÜRKİYE'YE GELİYOR · İSTANBUL İLK",
      contact: "İletişim",
      legal: "© 2026 Playbox Türkiye. Tüm hakları saklıdır.",
      kvkk: "KVKK",
      privacy: "Gizlilik",
      terms: "Koşullar",
    },
  },
  en: {
    nav: { how: "How", sports: "Sports", players: "Players", sponsors: "Sponsors", app: "Get the App" },
    ticker: ["BASKETBALL", "FOOTBALL", "TENNIS", "VOLLEYBALL", "FIND", "OPEN", "PLAY", "RETURN", "STREAK"],
    hero: {
      kicker: "PLAYBOX · TÜRKİYE",
      title1: "HIT THE COURT.",
      title2: "GEAR'S ON US.",
      sub: "Smart sports stations right by the courts. Find the nearest one, open it with your phone, grab the gear, play. No gear to own.",
      ctaApp: "GET THE APP",
      ctaWaitlist: "JOIN WAITLIST",
      soon: "soon",
      scroll: "scroll",
      stats: [
        { n: "4", label: "sports" },
        { n: "7/24", label: "open" },
        { n: "2 sec", label: "bluetooth" },
      ],
    },
    how: {
      kicker: "HOW IT WORKS",
      title: "FOUR STEPS. THAT'S IT.",
      steps: [
        { n: "01", t: "FIND", d: "Locate the nearest Playbox station on the map in the app." },
        { n: "02", t: "OPEN", d: "Walk up. Bluetooth pops the hatch in seconds." },
        { n: "03", t: "PLAY", d: "Grab the gear, hit the court. Your session runs on your phone." },
        { n: "04", t: "RETURN", d: "Drop it back when you're done. Build your streak, play again." },
      ],
    },
    sports: {
      kicker: "SPORTS",
      title: "PICK YOUR GAME.",
      sub: "Every station carries multiple sports. More on the way.",
      items: [
        { emoji: "🏀", name: "BASKETBALL", gear: "Ball + wristband", tag: "IST-KADIKOY-07" },
        { emoji: "⚽", name: "FOOTBALL", gear: "Ball + shin guards", tag: "IST-BESIKTAS-03" },
        { emoji: "🎾", name: "TENNIS", gear: "Racket + ball tube", tag: "IST-MODA-01" },
        { emoji: "🏐", name: "VOLLEYBALL", gear: "Ball + knee guard", tag: "IST-CADDEBOSTAN-05" },
      ],
      more: "PADEL · BADMINTON · MORE ON THE WAY",
    },
    players: {
      kicker: "FOR PLAYERS",
      title: "TAP. PLAY. REPEAT.",
      sub: "The Playbox app. Find stations, start your session, grow your streak.",
      features: [
        { t: "open in seconds", d: "Bluetooth pops the hatch instantly. No codes, no queue." },
        { t: "frictionless pay", d: "Start with your phone, end with your phone. Upfront, transparent pricing." },
        { t: "streak system", d: "Stats, badges and a friends leaderboard. Grows as you play." },
        { t: "turkish + english", d: "Bilingual UI. However you like it." },
      ],
      ios: "App Store",
      android: "Google Play",
      soon: "SOON",
    },
    sponsors: {
      kicker: "SPONSORS",
      title: "POWER THE PLAY.",
      sub: "Your logo on the court. Your support comes back to players as free play hours. We handle the rest.",
      benefits: [
        { n: "01", t: "VISIBILITY", d: "Your logo on stations and in the app." },
        { n: "02", t: "FREE HOURS", d: "Your support becomes free play time." },
        { n: "03", t: "ZERO HASSLE", d: "We install it, we maintain it." },
        { n: "04", t: "LOCAL IMPACT", d: "Keep the neighborhood's game alive." },
      ],
      wallLabel: "YOUR LOGO HERE · 6 SLOTS OPEN",
      form: {
        title: "LET'S TALK.",
        sub: "Drop your details and we'll plan it together.",
        name: "Your name",
        company: "Brand / company",
        email: "Email",
        message: "What would you like to offer? (optional)",
        submit: "SEND",
        sending: "SENDING...",
        success: "Got it. We'll be in touch soon. ⚡",
        error: "Something went wrong. Try again.",
      },
    },
    waitlist: {
      kicker: "WAITLIST",
      title: "BE THE FIRST TO KNOW.",
      sub: "We'll write you first when we land in your city.",
      placeholder: "your email",
      submit: "JOIN WAITLIST",
      sending: "SENDING...",
      success: "You're in. We'll write when we land in your city. ⚡",
      error: "Something went wrong. Try again.",
    },
    faq: {
      kicker: "FAQ",
      title: "EVERYTHING ON YOUR MIND.",
      items: [
        { q: "Where are stations live right now?", a: "Our first stations open in Istanbul, summer 2026. For other cities, join the waitlist." },
        { q: "How do payments work?", a: "Through the app with your saved card. Upfront pricing, automatic charge when you wrap up." },
        { q: "Is the gear secure?", a: "Every station is locked and insured. A small deposit covers damage. No surprise fees." },
        { q: "Which sports can I play?", a: "Basketball, football, tennis and volleyball today. Padel and badminton coming." },
        { q: "When does the app launch?", a: "Beta drops early summer. Available on the App Store and Google Play." },
        { q: "I want to sponsor, how does it work?", a: "Fill the form in the Sponsors section. Your logo goes on the volt wall, your support becomes free hours for players." },
        { q: "Other questions?", a: "Email canberkvarli@gmail.com. We're quick." },
      ],
    },
    footer: {
      tag: "Smart sports stations right by the courts. Hit the court, gear's on us.",
      city: "COMING TO TÜRKIYE · ISTANBUL FIRST",
      contact: "Contact",
      legal: "© 2026 Playbox Türkiye. All rights reserved.",
      kvkk: "KVKK",
      privacy: "Privacy",
      terms: "Terms",
    },
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: typeof dict.tr };
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("tr");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("playbox-lang") as Lang | null)) || "tr";
    setLangState(saved);
    document.documentElement.lang = saved;
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("playbox-lang", l);
      document.documentElement.lang = l;
    }
  };

  return createElement(I18nContext.Provider, { value: { lang, setLang, t: dict[lang] } }, children);
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
