export type Lang = "mn" | "en";

export const translations = {
  meta: {
    title: {
      mn: "НЭГДи Процессор – Төлбөрийн технологийн шийдэл",
      en: "NEGDi Processor – Payment Technology Solutions",
    },
    description: {
      mn: "НЭГДи Процессор нь банк, санхүүгийн байгууллагуудад зориулсан картын процессинг, төлбөрийн гарц, fraud management зэрэг дэвшилтэт шийдлүүдийг санал болгож байна.",
      en: "NEGDi Processor offers advanced card processing, payment gateway, fraud management solutions for banks and financial institutions.",
    },
  },
  nav: {
    services: { mn: "Үйлчилгээ", en: "Services" },
    payment: { mn: "Төлбөрийн гарц", en: "Payment Gateway" },
    about: { mn: "Бидний тухай", en: "About Us" },
    team: { mn: "Манай баг", en: "Our Team" },
    partners: { mn: "Хамтрагчид", en: "Partners" },
    contact: { mn: "НЭГДи-е", en: "Contact" },
  },
  hero: {
    tagline: {
      mn: "Бизнесийн өсөлтийн боломжийг бүтээгч",
      en: "Building Opportunities for Business Growth",
    },
    headline: {
      mn: "Дэвшилтэт төлбөрийн технологийн шийдэл",
      en: "Advanced Payment Technology Solutions",
    },
    subtitle: {
      mn: "Инновацлаг, найдвартай, аюулгүй төлбөрийн шийдлүүдээр урт хугацааны түншлэлийг бий болгоно.",
      en: "To establish long-lasting partnerships through innovative, reliable and secure payment solutions.",
    },
    cta1: { mn: "Үйлчилгээ харах", en: "VIEW SERVICES" },
    cta2: { mn: "Холбоо барих", en: "CONTACT US" },
  },
  services: {
    title: { mn: "Манай үйлчилгээ", en: "Our Services" },
    subtitle: {
      mn: "Банк, санхүүгийн байгууллагуудад зориулсан дэвшилтэт шийдлүүд",
      en: "Advanced solutions for banks and financial institutions",
    },
    learnMore: { mn: "Дэлгэрэнгүй", en: "Learn more" },
    collapse: { mn: "Хураах", en: "Collapse" },
  },
  paymentGateway: {
    title: { mn: "Төлбөрийн гарц", en: "Payment Gateway" },
    description: {
      mn: "Манай төлбөрийн гарц нь таны бизнес, хэрэглэгч, санхүүгийн байгууллагуудыг холбож, аюулгүй, хялбар гүйлгээг хангадаг.",
      en: "Our payment gateway acts as the vital bridge between your business, your customers, and financial institutions, ensuring smooth and secure transactions every time.",
    },
    features: [
      { mn: "Бүх төрлийн картын дэмжлэг", en: "All card types supported" },
      { mn: "Real-time гүйлгээний мониторинг", en: "Real-time transaction monitoring" },
      { mn: "PCI DSS стандарт", en: "PCI DSS compliant" },
      { mn: "Олон валютын дэмжлэг", en: "Multi-currency support" },
      { mn: "Хялбар интеграци", en: "Easy API integration" },
      { mn: "24/7 техникийн дэмжлэг", en: "24/7 technical support" },
    ],
    cta: { mn: "Дэлгэрэнгүй мэдэх", en: "LEARN MORE" },
  },
  about: {
    title: { mn: "Бидний тухай", en: "About Us" },
    subtitle: {
      mn: "НЭГДи Процессор нь Монголын төлбөрийн технологийн салбарт тэргүүлэгч компани юм.",
      en: "NEGDi Processor is a leading payment technology company in Mongolia.",
    },
    blocks: [
      {
        icon: "Eye",
        title: { mn: "Алсын хараа", en: "Vision" },
        description: {
          mn: "Монголын төлбөрийн системийг дэлхийн жишигт хүргэх, дэвшилтэт технологиор удирдагч байх.",
          en: "To bring Mongolia's payment systems to global standards through cutting-edge technology leadership.",
        },
      },
      {
        icon: "Target",
        title: { mn: "Эрхэм зорилго", en: "Mission" },
        description: {
          mn: "Инновацлаг, найдвартай, аюулгүй төлбөрийн шийдлүүдээр урт хугацааны түншлэлийг бий болгох.",
          en: "To establish long-lasting partnerships through innovative, reliable, and secure payment solutions.",
        },
      },
      {
        icon: "Gem",
        title: { mn: "Үнэт зүйлс", en: "Our Values" },
        description: {
          mn: "Шинэлэг байдал, найдвартай байдал, аюулгүй байдал, хэрэглэгч төвтэй хандлага.",
          en: "Innovation, reliability, security, and customer-centric approach.",
        },
      },
    ],
  },
  team: {
    title: { mn: "Манай баг", en: "Our Team" },
    subtitle: {
      mn: "Туршлагатай мэргэжилтнүүдийн баг",
      en: "A team of experienced professionals",
    },
  },
  partners: {
    title: { mn: "Хамтрагч байгууллагууд", en: "Our Partners" },
    subtitle: {
      mn: "Бидний хамтран ажилладаг байгууллагууд",
      en: "Organizations we partner with",
    },
  },
  contact: {
    title: { mn: "Холбоо барих", en: "Contact Us" },
    subtitle: {
      mn: "Бидэнтэй холбогдоход бэлэн байна",
      en: "We're ready to connect with you",
    },
    form: {
      name: { mn: "Нэр", en: "Name" },
      email: { mn: "И-мэйл", en: "Email" },
      phone: { mn: "Утасны дугаар", en: "Phone" },
      message: { mn: "Мессеж", en: "Message" },
      submit: { mn: "ИЛГЭЭХ", en: "SEND MESSAGE" },
      success: { mn: "Амжилттай илгээгдлээ!", en: "Message sent successfully!" },
      error: { mn: "Алдаа гарлаа. Дахин оролдоно уу.", en: "An error occurred. Please try again." },
    },
    info: {
      company: "NEGDi Processor LLC",
      address: {
        mn: "Хан-Уул дүүрэг, 15-р хороо, Үйлдвэр, Богд жавзан дамба гудамж 12 байр, 1 тоот",
        en: "Khan-Uul District, 15th Khoroo, Factory, Bogd Javzan Damba Street, Building 12, Unit 1",
      },
      phone: "+976-7509-2211",
      email: "hello@negdi.mn",
    },
  },
  footer: {
    rights: {
      mn: "© 2026 NEGDi Processor LLC. Бүх эрх хуулиар хамгаалагдсан.",
      en: "© 2026 NEGDi Processor LLC. All rights reserved.",
    },
  },
  admin: {
    login: {
      title: { mn: "Админ нэвтрэх", en: "Admin Login" },
      email: { mn: "И-мэйл", en: "Email" },
      password: { mn: "Нууц үг", en: "Password" },
      submit: { mn: "Нэвтрэх", en: "Sign In" },
      error: { mn: "И-мэйл эсвэл нууц үг буруу байна", en: "Invalid email or password" },
    },
    sidebar: {
      dashboard: { mn: "Хянах самбар", en: "Dashboard" },
      services: { mn: "Үйлчилгээ", en: "Services" },
      team: { mn: "Манай баг", en: "Team" },
      partners: { mn: "Хамтрагчид", en: "Partners" },
      logout: { mn: "Гарах", en: "Logout" },
    },
  },
} as const;

export function t(obj: { mn: string; en: string }, lang: Lang): string {
  return obj[lang];
}
