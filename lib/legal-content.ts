import type { Lang } from "@/lib/i18n";

export type LegalSection = {
  h: string;
  /** Paragraphs; items starting with "- " render as list items. */
  body: string[];
};

export type LegalDoc = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export type LegalDocKey = "kvkk" | "privacy" | "terms";

export const CONTACT_EMAIL = "canberkvarli@gmail.com";

// [KÖŞELİ PARANTEZ] içindeki alan (tam ticari unvan + adres) şirket kuruluşu
// tamamlandığında güncellenmelidir.
export const legalDocs: Record<LegalDocKey, Record<Lang, LegalDoc>> = {
  kvkk: {
    tr: {
      title: "KVKK Aydınlatma Metni",
      updated: "Son güncelleme: 7 Temmuz 2026",
      intro:
        "Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (\"KVKK\") uyarınca, Playbox mobil uygulaması ve playbox web sitesi (birlikte \"Hizmet\") üzerinden işlenen kişisel verilerinize ilişkin olarak veri sorumlusu sıfatıyla sizleri bilgilendirmek amacıyla hazırlanmıştır.",
      sections: [
        {
          h: "1. Veri Sorumlusu",
          body: [
            "Veri sorumlusu: Playbox Sport [tam ticari unvan ve adres, şirket kuruluşu tamamlandığında eklenecektir].",
            `İletişim: ${CONTACT_EMAIL}`,
          ],
        },
        {
          h: "2. İşlenen Kişisel Veriler",
          body: [
            "Hizmet kapsamında aşağıdaki kişisel veri kategorileri işlenmektedir:",
            "- Kimlik bilgileri: ad, soyad",
            "- İletişim bilgileri: e-posta adresi, telefon numarası",
            "- Konum bilgisi: yakınınızdaki istasyonları gösterebilmek için cihaz konumunuz (yalnızca izin vermeniz hâlinde)",
            "- Finansal bilgiler: ödeme işlemi kayıtları; kart bilgileriniz tarafımızca saklanmaz, iyzico tarafından işlenir",
            "- İşlem güvenliği bilgileri: IP adresi, cihaz kimliği, uygulama giriş kayıtları",
            "- Kullanım verileri: uygulama içi etkileşimler, çökme raporları ve analitik veriler",
            "- Web sitesi formları: bekleme listesi için e-posta adresiniz; sponsorluk formu için ad, şirket, e-posta ve mesajınız",
          ],
        },
        {
          h: "3. İşleme Amaçları",
          body: [
            "Kişisel verileriniz aşağıdaki amaçlarla işlenir:",
            "- Hesabınızın oluşturulması ve yönetilmesi",
            "- Size en yakın istasyonun gösterilmesi ve ekipman kiralama hizmetinin sunulması",
            "- Ödemelerin alınması ve faturalandırma",
            "- Hizmet güvenliğinin sağlanması, kötüye kullanımın önlenmesi",
            "- Bekleme listesi ve sponsorluk taleplerinize ilişkin sizinle iletişim kurulması",
            "- Hizmetin geliştirilmesi, hataların tespiti ve performans analizi",
            "- Yasal yükümlülüklerin yerine getirilmesi",
          ],
        },
        {
          h: "4. Hukuki Sebepler",
          body: [
            "Kişisel verileriniz KVKK'nın 5. maddesinde yer alan aşağıdaki hukuki sebeplere dayanılarak işlenir:",
            "- Sözleşmenin kurulması ve ifası (m. 5/2-c): hesap, kiralama ve ödeme işlemleri",
            "- Hukuki yükümlülüğün yerine getirilmesi (m. 5/2-ç): vergi ve ticari mevzuat kayıtları",
            "- Meşru menfaat (m. 5/2-f): hizmet güvenliği, hata tespiti ve iyileştirme",
            "- Açık rıza (m. 5/1): konum verisi ve tercihe bağlı pazarlama iletileri",
          ],
        },
        {
          h: "5. Kişisel Verilerin Aktarılması",
          body: [
            "Kişisel verileriniz, yalnızca yukarıdaki amaçlarla sınırlı olmak üzere aşağıdaki taraflara aktarılabilir:",
            "- Barındırma ve altyapı sağlayıcıları (ör. Vercel)",
            "- Veri tabanı, kimlik doğrulama ve arka uç hizmetleri: Supabase",
            "- Ödeme hizmeti sağlayıcısı: iyzico (iyzi Ödeme ve Elektronik Para Hizmetleri A.Ş.)",
            "- Analitik ve çökme raporlama sağlayıcısı: Google Firebase (Analytics ve Crashlytics)",
            "- Yetkili kamu kurum ve kuruluşları (yasal zorunluluk hâlinde)",
            "Altyapı sağlayıcılarımızın sunucuları yurt dışında bulunabilir; bu durumda aktarım KVKK'nın 9. maddesine uygun olarak gerçekleştirilir.",
          ],
        },
        {
          h: "6. Toplama Yöntemi",
          body: [
            "Kişisel verileriniz; mobil uygulama, web sitesi formları ve Hizmet'in kullanımı sırasında otomatik yollarla (log kayıtları, analitik araçlar) elektronik ortamda toplanır.",
          ],
        },
        {
          h: "7. Saklama Süresi",
          body: [
            "Kişisel verileriniz, işleme amaçlarının gerektirdiği süre boyunca ve ilgili mevzuatta öngörülen asgari saklama sürelerine uygun olarak saklanır; sürenin sonunda silinir, yok edilir veya anonim hâle getirilir.",
          ],
        },
        {
          h: "8. KVKK Madde 11 Kapsamındaki Haklarınız",
          body: [
            "KVKK'nın 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işleme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde/yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini isteme, silinmesini veya yok edilmesini isteme, bu işlemlerin aktarılan üçüncü kişilere bildirilmesini isteme, münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme ve zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahipsiniz.",
            `Başvurularınızı ${CONTACT_EMAIL} adresine iletebilirsiniz. Başvurunuz en geç 30 gün içinde ücretsiz olarak sonuçlandırılır.`,
          ],
        },
      ],
    },
    en: {
      title: "KVKK Privacy Notice",
      updated: "Last updated: July 7, 2026",
      intro:
        "This notice is provided under Turkish Law No. 6698 on the Protection of Personal Data (\"KVKK\") to inform you, in our capacity as data controller, about the personal data processed through the Playbox mobile app and the Playbox website (together, the \"Service\"). The Turkish version of this notice is the legally binding text; this English version is provided for convenience.",
      sections: [
        {
          h: "1. Data Controller",
          body: [
            "Data controller: Playbox Sport [full legal name and address to be added once incorporation is complete].",
            `Contact: ${CONTACT_EMAIL}`,
          ],
        },
        {
          h: "2. Personal Data We Process",
          body: [
            "The following categories of personal data are processed through the Service:",
            "- Identity: first and last name",
            "- Contact: email address, phone number",
            "- Location: your device location to show nearby stations (only with your permission)",
            "- Financial: payment transaction records; your card details are not stored by us and are processed by iyzico",
            "- Security: IP address, device identifier, sign-in logs",
            "- Usage: in-app interactions, crash reports and analytics data",
            "- Website forms: your email for the waitlist; name, company, email and message for the sponsorship form",
          ],
        },
        {
          h: "3. Purposes of Processing",
          body: [
            "Your personal data is processed to:",
            "- Create and manage your account",
            "- Show you the nearest station and provide the equipment rental service",
            "- Collect payments and issue invoices",
            "- Keep the Service secure and prevent misuse",
            "- Contact you about waitlist and sponsorship requests",
            "- Improve the Service, detect errors and analyse performance",
            "- Comply with legal obligations",
          ],
        },
        {
          h: "4. Legal Bases",
          body: [
            "Processing relies on the legal grounds set out in Article 5 of the KVKK:",
            "- Performance of a contract (Art. 5/2-c): account, rental and payment operations",
            "- Compliance with a legal obligation (Art. 5/2-ç): tax and commercial records",
            "- Legitimate interest (Art. 5/2-f): service security, error detection and improvement",
            "- Explicit consent (Art. 5/1): location data and optional marketing communications",
          ],
        },
        {
          h: "5. Data Transfers",
          body: [
            "Your personal data may be shared, strictly for the purposes above, with:",
            "- Hosting and infrastructure providers (e.g. Vercel)",
            "- Database, authentication and backend services: Supabase",
            "- Payment provider: iyzico (iyzi Ödeme ve Elektronik Para Hizmetleri A.Ş.)",
            "- Analytics and crash-reporting provider: Google Firebase (Analytics and Crashlytics)",
            "- Competent public authorities where legally required",
            "Our infrastructure providers may host data abroad; any such transfer is carried out in accordance with Article 9 of the KVKK.",
          ],
        },
        {
          h: "6. Collection Methods",
          body: [
            "Personal data is collected electronically through the mobile app, website forms, and automated means during your use of the Service (logs, analytics tools).",
          ],
        },
        {
          h: "7. Retention",
          body: [
            "Personal data is retained for as long as required by the processing purposes and by minimum statutory retention periods, after which it is deleted, destroyed or anonymised.",
          ],
        },
        {
          h: "8. Your Rights under Article 11",
          body: [
            "Under Article 11 of the KVKK you have the right to: learn whether your data is processed; request information about processing; learn the purpose of processing and whether data is used accordingly; know the third parties to whom data is transferred in Türkiye or abroad; request correction of incomplete or inaccurate data; request deletion or destruction; request notification of these operations to third parties; object to results produced exclusively by automated analysis; and claim compensation for damages.",
            `You can submit requests to ${CONTACT_EMAIL}. Requests are resolved free of charge within 30 days at the latest.`,
          ],
        },
      ],
    },
  },

  privacy: {
    tr: {
      title: "Gizlilik Politikası",
      updated: "Son güncelleme: 7 Temmuz 2026",
      intro:
        "Bu Gizlilik Politikası, Playbox mobil uygulamasını ve web sitesini (birlikte \"Hizmet\") kullandığınızda hangi verileri topladığımızı, nasıl kullandığımızı ve haklarınızı açıklar. Kişisel verilerin işlenmesine ilişkin ayrıntılı yasal bilgilendirme için KVKK Aydınlatma Metni'ne bakabilirsiniz.",
      sections: [
        {
          h: "1. Topladığımız Veriler",
          body: [
            "- Hesap bilgileri: ad, soyad, e-posta, telefon numarası",
            "- Konum: yakınınızdaki Playbox istasyonlarını göstermek için (yalnızca izninizle; izni cihaz ayarlarından istediğiniz an kapatabilirsiniz)",
            "- Ödeme bilgileri: ödemeler iyzico üzerinden işlenir; kart bilgileriniz sunucularımızda saklanmaz",
            "- Kullanım ve cihaz verileri: uygulama etkileşimleri, çökme raporları, cihaz modeli, işletim sistemi, IP adresi",
            "- Web sitesi: bekleme listesi e-postanız, sponsorluk formu bilgileriniz ve dil tercihiniz (tarayıcınızda yerel olarak saklanır)",
          ],
        },
        {
          h: "2. Verileri Nasıl Kullanıyoruz",
          body: [
            "- Hizmeti sunmak: istasyon bulma, kilit açma, kiralama süresinin takibi",
            "- Ödemeleri işlemek ve makbuz/fatura göndermek",
            "- Hesap güvenliğini sağlamak ve kötüye kullanımı önlemek",
            "- Hizmeti iyileştirmek: hata tespiti, performans ve kullanım analizi",
            "- Sizinle iletişim kurmak: hizmet bildirimleri ve (izin verdiyseniz) duyurular",
          ],
        },
        {
          h: "3. Veri Paylaşımı",
          body: [
            "Verilerinizi satmayız. Yalnızca hizmetin çalışması için gereken sağlayıcılarla paylaşırız:",
            "- Barındırma: Vercel (web sitesi ve API altyapısı)",
            "- Veri tabanı ve kimlik doğrulama: Supabase (hesap ve kiralama verileriniz burada saklanır)",
            "- Ödeme: iyzico",
            "- Analitik ve çökme raporları: Google Firebase",
            "- E-posta iletimi: bekleme listesi ve form yanıtları için e-posta hizmet sağlayıcımız",
            "Yasal bir zorunluluk hâlinde yetkili mercilerle paylaşım yapılabilir.",
          ],
        },
        {
          h: "4. Çerezler ve Yerel Depolama",
          body: [
            "Web sitemiz reklam veya takip çerezi kullanmaz. Yalnızca dil tercihinizi tarayıcınızın yerel depolamasında saklarız.",
          ],
        },
        {
          h: "5. Veri Güvenliği",
          body: [
            "Verileriniz aktarım sırasında şifrelenir (HTTPS/TLS). Erişim, yalnızca görevi gereği ihtiyaç duyan kişilerle sınırlıdır. Hiçbir sistemin %100 güvenli olmadığını hatırlatırız; bir ihlal hâlinde yasal yükümlülüklerimize uygun olarak sizi ve ilgili kurumları bilgilendiririz.",
          ],
        },
        {
          h: "6. Saklama ve Silme",
          body: [
            "Hesabınızı sildiğinizde kişisel verileriniz, yasal saklama yükümlülükleri saklı kalmak kaydıyla makul bir süre içinde silinir veya anonimleştirilir.",
            `Hesap ve veri silme talepleriniz için: ${CONTACT_EMAIL}`,
          ],
        },
        {
          h: "7. Çocukların Gizliliği",
          body: [
            "Hizmet 13 yaşın altındaki çocuklara yönelik değildir. 13 yaşından küçük bir kullanıcıya ait veri topladığımızı fark edersek bu veriyi sileriz.",
          ],
        },
        {
          h: "8. Değişiklikler ve İletişim",
          body: [
            "Bu politikayı zaman zaman güncelleyebiliriz; önemli değişiklikleri Hizmet üzerinden duyururuz.",
            `Sorularınız için: ${CONTACT_EMAIL}`,
          ],
        },
      ],
    },
    en: {
      title: "Privacy Policy",
      updated: "Last updated: July 7, 2026",
      intro:
        "This Privacy Policy explains what data we collect, how we use it, and your rights when you use the Playbox mobile app and website (together, the \"Service\"). For the detailed legal disclosure required under Turkish data protection law, see the KVKK Privacy Notice.",
      sections: [
        {
          h: "1. Data We Collect",
          body: [
            "- Account: first and last name, email, phone number",
            "- Location: to show nearby Playbox stations (only with your permission; you can revoke it any time in device settings)",
            "- Payments: processed by iyzico; your card details are never stored on our servers",
            "- Usage and device data: in-app interactions, crash reports, device model, OS, IP address",
            "- Website: your waitlist email, sponsorship form details, and your language preference (stored locally in your browser)",
          ],
        },
        {
          h: "2. How We Use Data",
          body: [
            "- To provide the Service: finding stations, unlocking, tracking rental sessions",
            "- To process payments and send receipts/invoices",
            "- To keep accounts secure and prevent misuse",
            "- To improve the Service: error detection, performance and usage analysis",
            "- To communicate with you: service notices and (if you opt in) announcements",
          ],
        },
        {
          h: "3. Data Sharing",
          body: [
            "We do not sell your data. We share it only with providers needed to run the Service:",
            "- Hosting: Vercel (website and API infrastructure)",
            "- Database and authentication: Supabase (your account and rental data is stored here)",
            "- Payments: iyzico",
            "- Analytics and crash reporting: Google Firebase",
            "- Email delivery: our email provider, for waitlist and form responses",
            "We may disclose data to competent authorities where legally required.",
          ],
        },
        {
          h: "4. Cookies and Local Storage",
          body: [
            "Our website uses no advertising or tracking cookies. We only store your language preference in your browser's local storage.",
          ],
        },
        {
          h: "5. Security",
          body: [
            "Data is encrypted in transit (HTTPS/TLS) and access is limited to those who need it to operate the Service. No system is 100% secure; in the event of a breach we will notify you and the relevant authorities as required by law.",
          ],
        },
        {
          h: "6. Retention and Deletion",
          body: [
            "When you delete your account, your personal data is deleted or anonymised within a reasonable period, subject to statutory retention obligations.",
            `For account and data deletion requests: ${CONTACT_EMAIL}`,
          ],
        },
        {
          h: "7. Children's Privacy",
          body: [
            "The Service is not directed at children under 13. If we learn we have collected data from a child under 13, we will delete it.",
          ],
        },
        {
          h: "8. Changes and Contact",
          body: [
            "We may update this policy from time to time; material changes will be announced through the Service.",
            `Questions: ${CONTACT_EMAIL}`,
          ],
        },
      ],
    },
  },

  terms: {
    tr: {
      title: "Kullanım Koşulları",
      updated: "Son güncelleme: 7 Temmuz 2026",
      intro:
        "Bu Kullanım Koşulları (\"Koşullar\"), Playbox mobil uygulamasını ve web sitesini (birlikte \"Hizmet\") kullanımınızı düzenler. Hizmeti kullanarak bu Koşulları kabul etmiş olursunuz.",
      sections: [
        {
          h: "1. Hizmetin Tanımı",
          body: [
            "Playbox, spor sahalarının yakınına yerleştirilen akıllı istasyonlardan spor ekipmanı kiralamanızı sağlayan bir platformdur. Uygulama üzerinden istasyonu bulur, kilidini açar, ekipmanı kullanır ve süreniz bittiğinde iade edersiniz.",
          ],
        },
        {
          h: "2. Hesap ve Uygunluk",
          body: [
            "- Hizmeti kullanmak için doğru ve güncel bilgilerle hesap oluşturmanız gerekir.",
            "- 18 yaşından küçükseniz Hizmeti veli/vasi onayıyla kullanabilirsiniz.",
            "- Hesabınızın güvenliğinden ve hesabınız üzerinden yapılan işlemlerden siz sorumlusunuz.",
          ],
        },
        {
          h: "3. Kiralama Kuralları",
          body: [
            "- Ekipman, kiralama süresi boyunca sizin sorumluluğunuzdadır.",
            "- Ekipmanı amacına uygun kullanmalı, süre sonunda aynı istasyona hasarsız iade etmelisiniz.",
            "- Kaybolan, çalınan veya hasar gören ekipman için uygulamada belirtilen bedel tahsil edilebilir.",
            "- İade edilmeyen ekipman, kayıp olarak değerlendirilebilir ve ilgili bedel yansıtılır.",
          ],
        },
        {
          h: "4. Ücretler ve Ödeme",
          body: [
            "- Kiralama ücretleri, oturum başlamadan önce uygulamada gösterilir.",
            "- Ödemeler, kayıtlı ödeme yönteminizden iyzico aracılığıyla tahsil edilir.",
            "- Depozito uygulanması hâlinde tutar ve iade koşulları uygulamada belirtilir.",
            "- Cayma hakkı ve iade koşulları, mesafeli sözleşmelere ilişkin mevzuata tabidir; hizmet ifasına başlanmış oturumlar için iade yapılmayabilir.",
          ],
        },
        {
          h: "5. Yasaklı Davranışlar",
          body: [
            "Aşağıdakiler yasaktır:",
            "- İstasyonlara veya ekipmana zarar vermek, kurcalamak",
            "- Hizmeti hukuka aykırı bir amaçla veya başkalarının haklarını ihlal edecek şekilde kullanmak",
            "- Hesabınızı üçüncü kişilere devretmek veya kiralamak",
            "- Hizmetin güvenlik önlemlerini aşmaya çalışmak",
          ],
        },
        {
          h: "6. Sorumluluğun Sınırlandırılması",
          body: [
            "Spor aktiviteleri doğası gereği risk içerir; Hizmet kapsamında kiralanan ekipmanı kendi sorumluluğunuzda kullanırsınız. Playbox, zorunlu tüketici mevzuatından doğan haklarınız saklı kalmak üzere, dolaylı zararlardan sorumlu tutulamaz. Hizmet \"olduğu gibi\" sunulur; kesintisiz veya hatasız çalışacağı garanti edilmez.",
          ],
        },
        {
          h: "7. Fikri Mülkiyet",
          body: [
            "Hizmet'e ilişkin tüm marka, logo, tasarım ve yazılımlar Playbox'a veya lisans verenlerine aittir. Size yalnızca Hizmeti kullanmanız için sınırlı, devredilemez bir lisans tanınır.",
          ],
        },
        {
          h: "8. Askıya Alma ve Fesih",
          body: [
            "Bu Koşulları ihlal etmeniz hâlinde hesabınızı askıya alabilir veya kapatabiliriz. Hesabınızı istediğiniz zaman uygulama üzerinden veya bize yazarak kapatabilirsiniz.",
          ],
        },
        {
          h: "9. Değişiklikler",
          body: [
            "Koşullarda değişiklik yapabiliriz; önemli değişiklikler Hizmet üzerinden duyurulur. Değişiklik sonrası Hizmeti kullanmaya devam etmeniz, güncel Koşulları kabul ettiğiniz anlamına gelir.",
          ],
        },
        {
          h: "10. Uygulanacak Hukuk ve İletişim",
          body: [
            "Bu Koşullar Türkiye Cumhuriyeti hukukuna tabidir. Uyuşmazlıklarda İstanbul mahkemeleri ve icra daireleri yetkilidir; tüketiciler, yasal hakları çerçevesinde bulundukları yerdeki tüketici hakem heyetlerine ve tüketici mahkemelerine başvurabilir.",
            `İletişim: ${CONTACT_EMAIL}`,
          ],
        },
      ],
    },
    en: {
      title: "Terms of Use",
      updated: "Last updated: July 7, 2026",
      intro:
        "These Terms of Use (\"Terms\") govern your use of the Playbox mobile app and website (together, the \"Service\"). By using the Service you agree to these Terms. The Turkish version is the legally binding text; this English version is provided for convenience.",
      sections: [
        {
          h: "1. The Service",
          body: [
            "Playbox is a platform that lets you rent sports equipment from smart stations placed next to courts and fields. You find a station in the app, unlock it, use the gear, and return it when your session ends.",
          ],
        },
        {
          h: "2. Accounts and Eligibility",
          body: [
            "- You must create an account with accurate, up-to-date information to use the Service.",
            "- If you are under 18, you may use the Service only with parental/guardian consent.",
            "- You are responsible for the security of your account and for all activity under it.",
          ],
        },
        {
          h: "3. Rental Rules",
          body: [
            "- Equipment is your responsibility for the duration of the rental session.",
            "- You must use the gear as intended and return it undamaged to the same station when your session ends.",
            "- Lost, stolen or damaged equipment may be charged at the amount stated in the app.",
            "- Equipment that is not returned may be treated as lost and charged accordingly.",
          ],
        },
        {
          h: "4. Fees and Payment",
          body: [
            "- Rental fees are shown in the app before a session starts.",
            "- Payments are collected from your saved payment method via iyzico.",
            "- If a deposit applies, its amount and refund conditions are stated in the app.",
            "- Withdrawal and refund rights are subject to distance-contract regulations; sessions already started may not be refundable.",
          ],
        },
        {
          h: "5. Prohibited Conduct",
          body: [
            "The following are prohibited:",
            "- Damaging or tampering with stations or equipment",
            "- Using the Service for unlawful purposes or in a way that violates others' rights",
            "- Transferring or renting your account to third parties",
            "- Attempting to circumvent the Service's security measures",
          ],
        },
        {
          h: "6. Limitation of Liability",
          body: [
            "Sports activities carry inherent risk; you use rented equipment at your own responsibility. To the extent permitted by mandatory consumer law, Playbox is not liable for indirect damages. The Service is provided \"as is\" without a guarantee of uninterrupted or error-free operation.",
          ],
        },
        {
          h: "7. Intellectual Property",
          body: [
            "All trademarks, logos, designs and software relating to the Service belong to Playbox or its licensors. You are granted only a limited, non-transferable licence to use the Service.",
          ],
        },
        {
          h: "8. Suspension and Termination",
          body: [
            "We may suspend or close your account if you breach these Terms. You may close your account at any time in the app or by writing to us.",
          ],
        },
        {
          h: "9. Changes",
          body: [
            "We may amend these Terms; material changes will be announced through the Service. Continued use after changes means you accept the updated Terms.",
          ],
        },
        {
          h: "10. Governing Law and Contact",
          body: [
            "These Terms are governed by the laws of the Republic of Türkiye. Istanbul courts and enforcement offices have jurisdiction; consumers may also apply to consumer arbitration boards and consumer courts where they reside, within their statutory rights.",
            `Contact: ${CONTACT_EMAIL}`,
          ],
        },
      ],
    },
  },
};
