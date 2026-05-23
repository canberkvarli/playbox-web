"use client";

import { createContext, useContext, useEffect, useState, type ReactNode, createElement } from "react";

export type Lang = "tr" | "en";

export const dict = {
  tr: {
    nav: { how: "Nasıl Çalışır", sports: "Sporlar", partner: "Partner", app: "Uygulama" },
    hero: {
      kicker: "PLAYBOX TÜRKİYE",
      title1: "OYNAMAYA",
      title2: "HAZIR MISIN?",
      sub: "Şehrin her köşesinde, cebinden çıkan bir spor sahası. QR kodu okut, kapı açılsın, oyun başlasın.",
      ctaApp: "UYGULAMAYI İNDİR",
      ctaPartner: "PARTNER OL",
      soon: "Yakında",
      scroll: "Aşağı kaydır",
    },
    how: {
      kicker: "NASIL ÇALIŞIR",
      title: "Üç adım. Hepsi bu.",
      steps: [
        { n: "01", t: "BUL", d: "Yakındaki Playbox istasyonunu uygulamadan bul." },
        { n: "02", t: "AÇ", d: "Telefonunla yaklaş, Bluetooth ile kapı açılsın." },
        { n: "03", t: "OYNA", d: "Ekipmanı al, sahaya çık. Bitince iade et, seri yap." },
      ],
    },
    sports: {
      kicker: "SPORLAR",
      title: "Hangisini seçersen seç.",
      sub: "Her istasyon birden fazla sporu kapsar. Daha fazlası yolda.",
      items: [
        { emoji: "🏀", name: "BASKETBOL", gear: "Top + el bandı" },
        { emoji: "⚽", name: "FUTBOL", gear: "Top + dizlik" },
        { emoji: "🎾", name: "TENİS", gear: "Raket + top tüpü" },
        { emoji: "🏐", name: "VOLEYBOL", gear: "Top + diz desteği" },
        { emoji: "✨", name: "YAKINDA DAHA FAZLASI", gear: "Paddle, badminton, daha fazlası" },
      ],
    },
    players: {
      kicker: "OYUNCULAR İÇİN",
      title: "Aç. Oyna. Devam et.",
      sub: "Playbox uygulaması. İstasyonları bul, oyununu başlat, seriyi büyüt.",
      features: [
        "Bluetooth ile saniyeler içinde kapı açılır",
        "Sürtünmesiz ödeme. Telefonunla başla, telefonunla bitir",
        "Seri sistemi, istatistik ve arkadaş tablosu",
        "Türkçe + İngilizce arayüz",
      ],
      ios: "App Store",
      android: "Google Play",
      soon: "YAKINDA",
    },
    partners: {
      kicker: "PARTNERLER İÇİN",
      title: "MEKANINA PLAYBOX GETİR.",
      sub: "Sıfır kurulum maliyeti. Gelir paylaşımı. Yeni müşteri trafiği.",
      benefits: [
        { t: "Gelir paylaşımı", d: "Her oyundan pay al. Şeffaf raporlama, aylık ödeme." },
        { t: "Sıfır kurulum maliyeti", d: "İstasyonu biz kuruyoruz, biz bakımını yapıyoruz." },
        { t: "Yeni trafik", d: "Genç, aktif kitleyi mekanına çek. Uygulama içi yönlendirme." },
      ],
      form: {
        title: "Birlikte konuşalım.",
        sub: "Formu doldur, 48 saat içinde dönüş yapalım.",
        name: "Adın",
        venueType: "Mekan tipi",
        email: "E-posta",
        message: "Kısa mesaj (opsiyonel)",
        submit: "GÖNDER",
        sending: "GÖNDERİLİYOR...",
        success: "Aldık. 48 saat içinde döneceğiz. ⚡",
        error: "Bir şeyler ters gitti. Tekrar dene.",
        venueTypes: {
          cafe: "Kafe / Restoran",
          gym: "Spor salonu",
          park: "Park / Açık alan",
          school: "Okul / Üniversite",
          hotel: "Otel / Tatil köyü",
          other: "Diğer",
        },
      },
    },
    faq: {
      kicker: "SIKÇA SORULAN",
      title: "Aklındaki her şey.",
      items: [
        { q: "Şu an nerede istasyon var?", a: "İlk istasyonlarımız 2026 yazında İstanbul'da açılıyor. Diğer şehirler için bekleme listesine girebilirsin." },
        { q: "Nasıl ödeme yapıyorum?", a: "Uygulama üzerinden kayıtlı kartınla. Oyun başlamadan göstergeli ücret, bitince otomatik tahsilat." },
        { q: "Ekipman güvenli mi?", a: "Her istasyon kilitli ve sigortalı. Hasar durumunda küçük bir depozit dışında ek ücret yok." },
        { q: "Hangi sporları oynayabilirim?", a: "Şu an basketbol, futbol ve tenis. Voleybol ve paddle yolda." },
        { q: "Uygulama ne zaman çıkıyor?", a: "Beta yazın başında. App Store ve Google Play'de yer alacak." },
        { q: "Partner olmak ne kadar sürer?", a: "Formu doldur, 48 saat içinde dönüş yapıyoruz. Kurulum tipik olarak 2-3 hafta sürer." },
        { q: "Hangi şehirlerdesiniz?", a: "Önce İstanbul. Ardından Ankara ve İzmir. Bekleme listesine girersen şehrine geldiğimizde haber veriyoruz." },
        { q: "Başka bir sorum var?", a: "canberkvarli@gmail.com adresine mail at, hızlıca dönüyoruz." },
      ],
    },
    waitlist: {
      kicker: "BEKLEME LİSTESİ",
      title: "İlk haberi al.",
      sub: "Şehrine geldiğimizde sana yazalım.",
      placeholder: "e-posta adresin",
      submit: "BEKLEMEYE GİR",
      sending: "GÖNDERİLİYOR...",
      success: "Listedesin. Şehrine geldiğimizde haber veriyoruz. ⚡",
      error: "Bir şeyler ters gitti. Tekrar dene.",
    },
    footer: {
      tag: "Şehrin her köşesinde, cebinden çıkan bir spor sahası.",
      contact: "İletişim",
      legal: "© 2026 Playbox Türkiye. Tüm hakları saklıdır.",
    },
  },
  en: {
    nav: { how: "How it works", sports: "Sports", partner: "Partner", app: "App" },
    hero: {
      kicker: "PLAYBOX TÜRKİYE",
      title1: "READY",
      title2: "TO PLAY?",
      sub: "A sports court in every corner of the city, pulled straight from your pocket. Scan, unlock, play.",
      ctaApp: "DOWNLOAD THE APP",
      ctaPartner: "BECOME A PARTNER",
      soon: "Soon",
      scroll: "Scroll",
    },
    how: {
      kicker: "HOW IT WORKS",
      title: "Three steps. That's it.",
      steps: [
        { n: "01", t: "FIND", d: "Locate the nearest Playbox station in the app." },
        { n: "02", t: "UNLOCK", d: "Walk up. Bluetooth opens the gate in seconds." },
        { n: "03", t: "PLAY", d: "Grab the gear, hit the court. Return it, build your streak." },
      ],
    },
    sports: {
      kicker: "SPORTS",
      title: "Pick your game.",
      sub: "Every station carries multiple sports. More on the way.",
      items: [
        { emoji: "🏀", name: "BASKETBALL", gear: "Ball + wristband" },
        { emoji: "⚽", name: "FOOTBALL", gear: "Ball + shin guards" },
        { emoji: "🎾", name: "TENNIS", gear: "Racket + ball tube" },
        { emoji: "🏐", name: "VOLLEYBALL", gear: "Ball + knee guard" },
        { emoji: "✨", name: "MORE SOON", gear: "Padel, badminton, and more" },
      ],
    },
    players: {
      kicker: "FOR PLAYERS",
      title: "Tap. Play. Repeat.",
      sub: "The Playbox app. Find stations, start your session, level up your streak.",
      features: [
        "Bluetooth unlocks the gate in seconds",
        "Frictionless pay. Start with your phone, end with your phone",
        "Streaks, stats, and a friends leaderboard",
        "Turkish + English UI",
      ],
      ios: "App Store",
      android: "Google Play",
      soon: "SOON",
    },
    partners: {
      kicker: "FOR PARTNERS",
      title: "BRING PLAYBOX TO YOUR VENUE.",
      sub: "Zero install cost. Revenue share. New foot traffic.",
      benefits: [
        { t: "Revenue share", d: "Earn on every session. Transparent reporting, monthly payout." },
        { t: "Zero install cost", d: "We install and maintain the station, end to end." },
        { t: "Fresh traffic", d: "Pull a young, active crowd to your venue. In-app routing." },
      ],
      form: {
        title: "Let's talk.",
        sub: "Drop your details. We'll reply within 48 hours.",
        name: "Your name",
        venueType: "Venue type",
        email: "Email",
        message: "Short message (optional)",
        submit: "SEND",
        sending: "SENDING...",
        success: "Got it. We'll be in touch within 48h. ⚡",
        error: "Something went wrong. Try again.",
        venueTypes: {
          cafe: "Cafe / Restaurant",
          gym: "Gym",
          park: "Park / Open space",
          school: "School / University",
          hotel: "Hotel / Resort",
          other: "Other",
        },
      },
    },
    faq: {
      kicker: "FAQ",
      title: "Everything on your mind.",
      items: [
        { q: "Where are stations live right now?", a: "Our first stations open in Istanbul, summer 2026. Other cities, join the waitlist." },
        { q: "How do payments work?", a: "Through the app with your saved card. Upfront pricing, automatic charge when you wrap up." },
        { q: "Is the gear secure?", a: "Every station is locked and insured. A small deposit covers any damage. No surprise fees." },
        { q: "Which sports can I play?", a: "Basketball, football, tennis today. Volleyball and padel coming." },
        { q: "When does the app launch?", a: "Beta drops early summer. Available on App Store and Google Play." },
        { q: "How fast can I become a partner?", a: "Send the form. We reply within 48h. Install typically takes 2 to 3 weeks." },
        { q: "Which cities are you in?", a: "Istanbul first. Ankara and Izmir next. Join the waitlist for your city." },
        { q: "Other questions?", a: "Email canberkvarli@gmail.com. We're quick." },
      ],
    },
    waitlist: {
      kicker: "WAITLIST",
      title: "Be the first to know.",
      sub: "We'll write when we land in your city.",
      placeholder: "your email",
      submit: "JOIN WAITLIST",
      sending: "SENDING...",
      success: "You're in. We'll write when we land in your city. ⚡",
      error: "Something went wrong. Try again.",
    },
    footer: {
      tag: "A sports court in every corner of the city, pulled from your pocket.",
      contact: "Contact",
      legal: "© 2026 Playbox Türkiye. All rights reserved.",
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
