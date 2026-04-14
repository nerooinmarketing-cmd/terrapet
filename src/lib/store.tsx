import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: number;
  titleEn: string; titleEs: string; titleFr: string;
  descEn: string; descEs: string; descFr: string;
  imageUrl: string; videoUrl: string;
  linkText: string; offset?: boolean;
  
  // Popup fields
  images: string[];
  benefitsEn: string; benefitsEs: string; benefitsFr: string;
  compositionEn: string; compositionEs: string; compositionFr: string;
  directionsEn: string; directionsEs: string; directionsFr: string;
  amazonLink: string;
}

export interface GlobalData {
  logoText: string;
  logoUrl: string;
  logoLink: string;
  menu1En: string; menu1Es: string; menu1Fr: string; menu1Link: string;
  menu2En: string; menu2Es: string; menu2Fr: string; menu2Link: string;
  menu3En: string; menu3Es: string; menu3Fr: string; menu3Link: string;
  menu4En: string; menu4Es: string; menu4Fr: string; menu4Link: string;
  discountCode: string;
  discountLink: string;
}

export interface HomeData {
  badgeEn: string; badgeEs: string; badgeFr: string;
  titleEn: string; titleEs: string; titleFr: string;
  descEn: string; descEs: string; descFr: string;
  button1En: string; button1Es: string; button1Fr: string;
  button2En: string; button2Es: string; button2Fr: string;
  imageUrl: string;
}

export interface AboutData {
  badgeEn: string; badgeEs: string; badgeFr: string;
  titleEn: string; titleEs: string; titleFr: string;
  descEn: string; descEs: string; descFr: string;
  stat1Value: string; stat1LabelEn: string; stat1LabelEs: string; stat1LabelFr: string;
  stat2Value: string; stat2LabelEn: string; stat2LabelEs: string; stat2LabelFr: string;
  image1Url: string; image2Url: string;
}

export interface Review {
  id: number;
  name: string; location: string; initials: string; rating: number;
  textEn: string; textEs: string; textFr: string;
}

export interface FooterData {
  descEn: string; descEs: string; descFr: string;
  copyrightEn: string; copyrightEs: string; copyrightFr: string;
  
  // Navigation Links
  navTitleEn: string; navTitleEs: string; navTitleFr: string;
  navLink1En: string; navLink1Es: string; navLink1Fr: string; navLink1Url: string;
  navLink2En: string; navLink2Es: string; navLink2Fr: string; navLink2Url: string;
  navLink3En: string; navLink3Es: string; navLink3Fr: string; navLink3Url: string;
  navLink4En: string; navLink4Es: string; navLink4Fr: string; navLink4Url: string;

  // Information Links
  infoTitleEn: string; infoTitleEs: string; infoTitleFr: string;
  infoLink1En: string; infoLink1Es: string; infoLink1Fr: string; infoLink1Url: string;
  infoLink2En: string; infoLink2Es: string; infoLink2Fr: string; infoLink2Url: string;
  infoLink3En: string; infoLink3Es: string; infoLink3Fr: string; infoLink3Url: string;
  infoLink4En: string; infoLink4Es: string; infoLink4Fr: string; infoLink4Url: string;

  // Support
  supportTitleEn: string; supportTitleEs: string; supportTitleFr: string;
  supportDescEn: string; supportDescEs: string; supportDescFr: string;
  contactBtnEn: string; contactBtnEs: string; contactBtnFr: string; contactBtnUrl: string;

  // Social Links
  instagramUrl: string;
  twitterUrl: string;
  facebookUrl: string;
}

export interface DiscountLead {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  date: string;
}

export interface NewsletterLead {
  id: number;
  email: string;
  date: string;
}

export interface WelcomePopupData {
  isActive: boolean;
  imageUrl: string;
  videoUrl: string;
  titleEn: string; titleEs: string; titleFr: string;
  descEn: string; descEs: string; descFr: string;
  btn1TextEn: string; btn1TextEs: string; btn1TextFr: string;
  btn1Url: string;
  btn2TextEn: string; btn2TextEs: string; btn2TextFr: string;
}

interface AppState {
  language: 'en' | 'es' | 'fr';
  setLanguage: (lang: 'en' | 'es' | 'fr') => void;
  adminLang: 'en' | 'tr';
  setAdminLang: (lang: 'en' | 'tr') => void;
  globalData: GlobalData;
  updateGlobal: (data: GlobalData) => void;
  products: Product[];
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  homeData: HomeData;
  updateHome: (data: HomeData) => void;
  aboutData: AboutData;
  updateAbout: (data: AboutData) => void;
  reviews: Review[];
  updateReview: (review: Review) => void;
  footerData: FooterData;
  updateFooter: (data: FooterData) => void;
  discountLeads: DiscountLead[];
  addDiscountLead: (lead: Omit<DiscountLead, 'id' | 'date'>) => void;
  deleteDiscountLead: (id: number) => void;
  newsletterLeads: NewsletterLead[];
  addNewsletterLead: (email: string) => void;
  deleteNewsletterLead: (id: number) => void;
  welcomePopupData: WelcomePopupData;
  updateWelcomePopup: (data: WelcomePopupData) => void;
}

const defaultPopupFields = {
  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD3sygrqrC44uuuoStIths0D-SmjV4bMgbhJf4udUWv8soJ1jkl4oedV2NdEuoq5eatEClBNNNXQ0ndh_xZ5Wzm3rsUwEhbkC-L3BNx1tkcjL-sWB_dIoFJfGWQqsY4y8Kok0sN0eZvC_DAyfhvQEs2f4pIzI_q-ynNTQUKsqCaKdPdgOMZCzcrjOd-tAu0RszOD4SiHpB3fMSPAcYZDSq6ayLNXPcvnKMOq7Oc9WyAw0TYf6FzmjGFV-syEu6OwPyWpJ2xl2CR_RZE",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDUn6zpVQsSeZCVEbl0GvWckUIUa6x5_tBOMVt2-qlHpac4f5Vxm_IclRA1UjrQfamu7RMQmzb-dUVOm2eDpV1CtWzH8AxeH6jrH9ORp0bZXEtTJ3zGbQ-RlzAZDJLbuq8CEWo8z8RoO7P-laEFhd4y21B5p8xZufZ4OFzfAgFyGA18au7U2IkXEhkuGfQi1L2ReUfGdy98eWTHY4Fxz9qOAZ5TGsU_kRxxAR8T-HDnOTRrqqLYX68JPzXwmcFYBxGyCOE2QDk5BlBh",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCDzVsREyREtcz8alO_DUAxk5bV19eirloJQ4yyI4MlW2cP6JNYX2N3giWmEuOIYLXOpewGOr4ke4FkFRugzJVc89qQ2I6PfTAfvwZ7n60rHD_q__mRWPxzrcx1gkmAzk2TG-8gq1DMevG2VGNj3AlVs8WiMVMvIig-7Sg2CRTlCZEBhZKiBhXGzAoVjV_NzQ9ZT6dc-KdjnhQUZ__Ln1wbolOMaWa__7uH63tKaZZ3A4tr_46Z6ygFGha0BnWl0GhBf6_kjHnvXLXR",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAC8A9vdHhpXN9OSLzl51MEi94ozV_3z7i_vZnxO5lvtrsWv0yle8_kAuL6PbIiARwGtGEkgmIJP4Vv7I6PkSlyTTzgYRxU154rlHCQQ77X9J8ez8PN0CqzwA09x3trZrSdKYDfMo7fJIWH2_ZwKfdli4NrXXtIFNESuhZdmBGfwEhqCHfNEDwkiqtL_3Bi6S4MJicrIVVEGij8vpj1bvufNfAF6LJVb1jZx_4I6ptHRz3DDRJYKys2IwiDE0dQ2HN5BhLcA_QHgNyd",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC2iJbiXH7bIUJ6oAyxCwjsc_U8rWTABvpUMHeSbfQiV7faD_G7i7j1_bUnWafEPOmKAwrrBYVkAk5E2FBsc7rH8M3oLtLfegERWOIB4tRtEfSa6iFhEStwAtGfL19doWJRe5HGRdz6HTdJ9_fe0oaL85wLKIQrIDQGBI0i_BocGznW7xVM4eDcEbBnTQhUbdew4cpLw-2ZGul17BWLgWEUfrWYL3UxO5PSG24s9__z7BDbjlv1P2GXtRVJ3eUuuvsDK6ul2h2FbAdi"
  ],
  benefitsEn: "Effective against a wide range of bacteria\nLong-lasting formula for overnight relief\nEasy to apply gel consistency",
  benefitsEs: "Eficaz contra una amplia gama de bacterias\nFórmula de larga duración para alivio nocturno\nConsistencia de gel fácil de aplicar",
  benefitsFr: "Efficace contre une large gamme de bactéries\nFormule longue durée pour un soulagement nocturne\nConsistance de gel facile à appliquer",
  compositionEn: "Our proprietary blend includes high-purity L-Glutamine, Omega-3 Phospholipids, and Bio-Available Zinc, synthesized in a sterile lab environment to ensure maximum bioavailability.",
  compositionEs: "Nuestra mezcla patentada incluye L-Glutamina de alta pureza, fosfolípidos Omega-3 y zinc biodisponible, sintetizados en un entorno de laboratorio estéril para garantizar la máxima biodisponibilidad.",
  compositionFr: "Notre mélange exclusif comprend de la L-Glutamine de haute pureté, des phospholipides oméga-3 et du zinc biodisponible, synthétisés dans un environnement de laboratoire stérile pour assurer une biodisponibilité maximale.",
  directionsEn: "Sanitize contact area with a sterile damp cloth.\nAdminister 1cm dosage into the lower orbital cavity.",
  directionsEs: "Desinfecte el área de contacto con un paño húmedo estéril.\nAdministre una dosis de 1 cm en la cavidad orbital inferior.",
  directionsFr: "Désinfectez la zone de contact avec un chiffon humide stérile.\nAdministrez une dose de 1 cm dans la cavité orbitaire inférieure.",
  amazonLink: "#"
};

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    titleEn: "Vetromycin Eye Ointment", titleEs: "Pomada Oftálmica Vetromycin", titleFr: "Pommade Ophtalmique Vetromycin",
    descEn: "10.00IU/g+5mg/g Pet Eye Ointment (Oxytetracycline HCl with Polymyxin B Sulfate). Effective against a wide range of bacteria.",
    descEs: "10.00IU/g+5mg/g Pomada Oftálmica para Mascotas. Eficaz contra una amplia gama de bacterias.",
    descFr: "10.00IU/g+5mg/g Pommade Ophtalmique pour Animaux. Efficace contre une large gamme de bactéries.",
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800",
    videoUrl: "", linkText: "Discover Benefits",
    ...defaultPopupFields
  }
];

const INITIAL_GLOBAL: GlobalData = {
  logoText: "Mete Pet",
  logoUrl: "",
  logoLink: "/",
  menu1En: "Home", menu1Es: "Inicio", menu1Fr: "Accueil", menu1Link: "#home",
  menu2En: "The Apothecary", menu2Es: "La Botica", menu2Fr: "L'Apothicaire", menu2Link: "#products",
  menu3En: "Journal", menu3Es: "Diario", menu3Fr: "Journal", menu3Link: "#reviews",
  menu4En: "Our Philosophy", menu4Es: "Nuestra Filosofía", menu4Fr: "Notre Philosophie", menu4Link: "#about",
  discountCode: "METEPT05",
  discountLink: "#products",
};

const INITIAL_HOME: HomeData = {
  badgeEn: "The Modern Apothecary", badgeEs: "El Boticario Moderno", badgeFr: "L'Apothicaire Moderne",
  titleEn: "How to Use\nVetromycin", titleEs: "Cómo Usar\nVetromycin", titleFr: "Comment Utiliser\nVetromycin",
  descEn: "10.00IU/g+5mg/g Pet Eye Ointment\n(Oxytetracycline HCl with Polymyxin B Sulfate)",
  descEs: "10.00IU/g+5mg/g Pomada Oftálmica para Mascotas\n(Oxitetraciclina HCl con Sulfato de Polimixina B)",
  descFr: "10.00IU/g+5mg/g Pommade Ophtalmique pour Animaux\n(Oxytétracycline HCl avec Sulfate de Polymyxine B)",
  button1En: "Explore Products", button1Es: "Explorar Productos", button1Fr: "Explorer les Produits",
  button2En: "About Us", button2Es: "Sobre Nosotros", button2Fr: "À Propos",
  imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=1200"
};

const INITIAL_ABOUT: AboutData = {
  badgeEn: "Our Story", badgeEs: "Nuestra Historia", badgeFr: "Notre Histoire",
  titleEn: "ABOUT METE PET", titleEs: "SOBRE METE PET", titleFr: "À PROPOS DE METE PET",
  descEn: "Mete Pet is dedicated to providing premium care for your companions. We believe that pet care should be a ritual of love, offering the best medical and wellness essentials.",
  descEs: "Mete Pet se dedica a brindar atención premium para sus compañeros. Creemos que el cuidado de las mascotas debe ser un ritual de amor, ofreciendo los mejores elementos esenciales médicos y de bienestar.",
  descFr: "Mete Pet se consacre à fournir des soins de qualité supérieure à vos compagnons. Nous pensons que les soins aux animaux de compagnie doivent être un rituel d'amour, offrant les meilleurs produits médicaux et de bien-être.",
  stat1Value: "12k+", stat1LabelEn: "Happy Pets", stat1LabelEs: "Mascotas Felices", stat1LabelFr: "Animaux Heureux",
  stat2Value: "100%", stat2LabelEn: "Ethically Sourced", stat2LabelEs: "Origen Ético", stat2LabelFr: "Source Éthique",
  image1Url: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=1000",
  image2Url: "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=800"
};

const INITIAL_REVIEWS: Review[] = [
  {
    id: 1, name: "Eleanor Vance", location: "London, UK", initials: "EV", rating: 5,
    textEn: "The Vitality Nectar has completely transformed Jasper's energy. At 11, he's moving like a puppy again.",
    textEs: "El Néctar de Vitalidad ha transformado completamente la energía de Jasper. A los 11 años, se mueve como un cachorro de nuevo.",
    textFr: "Le Nectar de Vitalité a complètement transformé l'énergie de Jasper. À 11 ans, il bouge à nouveau comme un chiot."
  },
  {
    id: 2, name: "Julian Rossi", location: "Milan, IT", initials: "JR", rating: 5,
    textEn: "I finally found a brand that respects my home's aesthetic while providing the best possible nutrition.",
    textEs: "Finalmente encontré una marca que respeta la estética de mi hogar mientras proporciona la mejor nutrición posible.",
    textFr: "J'ai enfin trouvé une marque qui respecte l'esthétique de ma maison tout en offrant la meilleure nutrition possible."
  },
  {
    id: 3, name: "Sarah Jenkins", location: "New York, US", initials: "SJ", rating: 5,
    textEn: "Their commitment to ethical sourcing and rigorous quality standards is exactly what the pet industry missed.",
    textEs: "Su compromiso con el abastecimiento ético y los rigurosos estándares de calidad es exactamente lo que le faltaba a la industria de mascotas.",
    textFr: "Leur engagement envers un approvisionnement éthique et des normes de qualité rigoureuses est exactement ce qui manquait à l'industrie des animaux de compagnie."
  }
];

const INITIAL_FOOTER: FooterData = {
  descEn: "Nurturing the profound bond between human and kin through intentional design, scientific rigor, and restorative botanical care.",
  descEs: "Fomentando el profundo vínculo entre humanos y sus seres queridos a través del diseño intencional, el rigor científico y el cuidado botánico restaurador.",
  descFr: "Nourrir le lien profond entre l'homme et ses proches grâce à un design intentionnel, une rigueur scientifique et des soins botaniques réparateurs.",
  copyrightEn: "© 2024 Mete Pet. All rights reserved.",
  copyrightEs: "© 2024 Mete Pet. Todos los derechos reservados.",
  copyrightFr: "© 2024 Mete Pet. Tous droits réservés.",
  
  navTitleEn: "NAVIGATION", navTitleEs: "NAVEGACIÓN", navTitleFr: "NAVIGATION",
  navLink1En: "The Collections", navLink1Es: "Las Colecciones", navLink1Fr: "Les Collections", navLink1Url: "#products",
  navLink2En: "Brand Philosophy", navLink2Es: "Filosofía de Marca", navLink2Fr: "Philosophie de Marque", navLink2Url: "#about",
  navLink3En: "The Journal", navLink3Es: "El Diario", navLink3Fr: "Le Journal", navLink3Url: "#reviews",
  navLink4En: "Press & Media", navLink4Es: "Prensa y Medios", navLink4Fr: "Presse et Médias", navLink4Url: "#",

  infoTitleEn: "INFORMATION", infoTitleEs: "INFORMACIÓN", infoTitleFr: "INFORMATION",
  infoLink1En: "Partnerships", infoLink1Es: "Asociaciones", infoLink1Fr: "Partenariats", infoLink1Url: "#",
  infoLink2En: "Privacy Policy", infoLink2Es: "Política de Privacidad", infoLink2Fr: "Politique de Confidentialité", infoLink2Url: "#",
  infoLink3En: "Terms of Use", infoLink3Es: "Términos de Uso", infoLink3Fr: "Conditions d'Utilisation", infoLink3Url: "#",
  infoLink4En: "Connect With Us", infoLink4Es: "Conéctate con Nosotros", infoLink4Fr: "Connectez-vous avec Nous", infoLink4Url: "#",

  supportTitleEn: "SUPPORT", supportTitleEs: "SOPORTE", supportTitleFr: "SUPPORT",
  supportDescEn: "Need assistance with your sanctuary essentials? Our care team is here to help.",
  supportDescEs: "¿Necesita ayuda con los elementos esenciales de su santuario? Nuestro equipo de atención está aquí para ayudar.",
  supportDescFr: "Besoin d'aide avec les essentiels de votre sanctuaire ? Notre équipe de soins est là pour vous aider.",
  contactBtnEn: "CONTACT US", contactBtnEs: "CONTÁCTENOS", contactBtnFr: "NOUS CONTACTER", contactBtnUrl: "#",

  instagramUrl: "#",
  twitterUrl: "#",
  facebookUrl: "#",
};

const INITIAL_WELCOME_POPUP: WelcomePopupData = {
  isActive: false,
  imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800",
  videoUrl: "",
  titleEn: "Welcome to Mete Pet", titleEs: "Bienvenido a Mete Pet", titleFr: "Bienvenue chez Mete Pet",
  descEn: "Discover our premium pet care products designed for the well-being of your furry friends.",
  descEs: "Descubre nuestros productos premium para el cuidado de mascotas diseñados para el bienestar de tus amigos peludos.",
  descFr: "Découvrez nos produits de soins pour animaux haut de gamme conçus pour le bien-être de vos amis à fourrure.",
  btn1TextEn: "Buy on Amazon", btn1TextEs: "Comprar en Amazon", btn1TextFr: "Acheter sur Amazon",
  btn1Url: "#",
  btn2TextEn: "Explore Site", btn2TextEs: "Explorar Sitio", btn2TextFr: "Explorer le Site"
};

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'es' | 'fr'>('en');
  const [adminLang, setAdminLang] = useState<'en' | 'tr'>(() => {
    return (localStorage.getItem('app_admin_lang') as 'en' | 'tr') || 'en';
  });
  
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('app_products_v2');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [globalData, setGlobalData] = useState<GlobalData>(() => {
    const saved = localStorage.getItem('app_global_v2');
    if (!saved) return INITIAL_GLOBAL;
    const parsed = JSON.parse(saved);
    return {
      ...INITIAL_GLOBAL,
      ...parsed,
      menu1En: parsed.menu1En || INITIAL_GLOBAL.menu1En,
      menu1Es: parsed.menu1Es || INITIAL_GLOBAL.menu1Es,
      menu1Fr: parsed.menu1Fr || INITIAL_GLOBAL.menu1Fr,
      menu1Link: parsed.menu1Link || INITIAL_GLOBAL.menu1Link,
      menu2En: parsed.menu2En || INITIAL_GLOBAL.menu2En,
      menu2Es: parsed.menu2Es || INITIAL_GLOBAL.menu2Es,
      menu2Fr: parsed.menu2Fr || INITIAL_GLOBAL.menu2Fr,
      menu2Link: parsed.menu2Link || INITIAL_GLOBAL.menu2Link,
      menu3En: parsed.menu3En || INITIAL_GLOBAL.menu3En,
      menu3Es: parsed.menu3Es || INITIAL_GLOBAL.menu3Es,
      menu3Fr: parsed.menu3Fr || INITIAL_GLOBAL.menu3Fr,
      menu3Link: parsed.menu3Link || INITIAL_GLOBAL.menu3Link,
      menu4En: parsed.menu4En || INITIAL_GLOBAL.menu4En,
      menu4Es: parsed.menu4Es || INITIAL_GLOBAL.menu4Es,
      menu4Fr: parsed.menu4Fr || INITIAL_GLOBAL.menu4Fr,
      menu4Link: parsed.menu4Link || INITIAL_GLOBAL.menu4Link,
      discountCode: parsed.discountCode || INITIAL_GLOBAL.discountCode,
      discountLink: parsed.discountLink || INITIAL_GLOBAL.discountLink,
    };
  });
  
  const [homeData, setHomeData] = useState<HomeData>(() => {
    const saved = localStorage.getItem('app_home_v2');
    if (!saved) return INITIAL_HOME;
    const parsed = JSON.parse(saved);
    return {
      ...INITIAL_HOME,
      ...parsed,
      button1En: parsed.button1En || INITIAL_HOME.button1En,
      button1Es: parsed.button1Es || INITIAL_HOME.button1Es,
      button1Fr: parsed.button1Fr || INITIAL_HOME.button1Fr,
      button2En: parsed.button2En || INITIAL_HOME.button2En,
      button2Es: parsed.button2Es || INITIAL_HOME.button2Es,
      button2Fr: parsed.button2Fr || INITIAL_HOME.button2Fr,
    };
  });

  const [aboutData, setAboutData] = useState<AboutData>(() => {
    const saved = localStorage.getItem('app_about_v2');
    return saved ? JSON.parse(saved) : INITIAL_ABOUT;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('app_reviews_v2');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [footerData, setFooterData] = useState<FooterData>(() => {
    const saved = localStorage.getItem('app_footer_v2');
    if (!saved) return INITIAL_FOOTER;
    const parsed = JSON.parse(saved);
    return {
      ...INITIAL_FOOTER,
      ...parsed,
    };
  });

  const [discountLeads, setDiscountLeads] = useState<DiscountLead[]>(() => {
    const saved = localStorage.getItem('app_discount_leads');
    return saved ? JSON.parse(saved) : [];
  });

  const [newsletterLeads, setNewsletterLeads] = useState<NewsletterLead[]>(() => {
    const saved = localStorage.getItem('app_newsletter_leads');
    return saved ? JSON.parse(saved) : [];
  });

  const [welcomePopupData, setWelcomePopupData] = useState<WelcomePopupData>(() => {
    const saved = localStorage.getItem('app_welcome_popup_v2');
    if (!saved) return INITIAL_WELCOME_POPUP;
    const parsed = JSON.parse(saved);
    return {
      ...INITIAL_WELCOME_POPUP,
      ...parsed,
    };
  });

  useEffect(() => { localStorage.setItem('app_products_v2', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('app_global_v2', JSON.stringify(globalData)); }, [globalData]);
  useEffect(() => { localStorage.setItem('app_home_v2', JSON.stringify(homeData)); }, [homeData]);
  useEffect(() => { localStorage.setItem('app_about_v2', JSON.stringify(aboutData)); }, [aboutData]);
  useEffect(() => { localStorage.setItem('app_reviews_v2', JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem('app_footer_v2', JSON.stringify(footerData)); }, [footerData]);
  useEffect(() => { localStorage.setItem('app_discount_leads', JSON.stringify(discountLeads)); }, [discountLeads]);
  useEffect(() => { localStorage.setItem('app_newsletter_leads', JSON.stringify(newsletterLeads)); }, [newsletterLeads]);
  useEffect(() => { localStorage.setItem('app_welcome_popup_v2', JSON.stringify(welcomePopupData)); }, [welcomePopupData]);
  useEffect(() => { localStorage.setItem('app_admin_lang', adminLang); }, [adminLang]);

  const updateProduct = (updated: Product) => setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  const addProduct = (product: Product) => setProducts(prev => [...prev, product]);
  const deleteProduct = (id: number) => setProducts(prev => prev.filter(p => p.id !== id));
  const updateGlobal = (data: GlobalData) => setGlobalData(data);
  const updateHome = (data: HomeData) => setHomeData(data);
  const updateAbout = (data: AboutData) => setAboutData(data);
  const updateReview = (updated: Review) => setReviews(prev => prev.map(r => r.id === updated.id ? updated : r));
  const updateFooter = (data: FooterData) => setFooterData(data);
  const updateWelcomePopup = (data: WelcomePopupData) => setWelcomePopupData(data);

  const addDiscountLead = (leadData: Omit<DiscountLead, 'id' | 'date'>) => {
    setDiscountLeads(prev => {
      const newId = prev.length > 0 ? Math.max(...prev.map(l => l.id)) + 1 : 1;
      const newLead: DiscountLead = {
        ...leadData,
        id: newId,
        date: new Date().toISOString()
      };
      return [newLead, ...prev];
    });
  };

  const deleteDiscountLead = (id: number) => {
    setDiscountLeads(prev => prev.filter(l => l.id !== id));
  };

  const addNewsletterLead = (email: string) => {
    setNewsletterLeads(prev => {
      const newId = prev.length > 0 ? Math.max(...prev.map(l => l.id)) + 1 : 1;
      const newLead: NewsletterLead = {
        id: newId,
        email,
        date: new Date().toISOString()
      };
      return [newLead, ...prev];
    });
  };

  const deleteNewsletterLead = (id: number) => {
    setNewsletterLeads(prev => prev.filter(l => l.id !== id));
  };

  return (
    <AppContext.Provider value={{ 
      language, setLanguage, 
      adminLang, setAdminLang,
      globalData, updateGlobal,
      products, updateProduct, addProduct, deleteProduct,
      homeData, updateHome,
      aboutData, updateAbout,
      reviews, updateReview,
      footerData, updateFooter,
      discountLeads, addDiscountLead, deleteDiscountLead,
      newsletterLeads, addNewsletterLead, deleteNewsletterLead,
      welcomePopupData, updateWelcomePopup
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
