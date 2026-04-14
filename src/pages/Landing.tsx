import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useAppContext, Product } from "../lib/store";
import ProductPopup from "../components/ProductPopup";
import DiscountPopup from "../components/DiscountPopup";
import WelcomePopup from "../components/WelcomePopup";
import WeatherWidget from "../components/WeatherWidget";

export default function Landing() {
  const { products, homeData, aboutData, reviews, footerData, globalData, language, setLanguage, addNewsletterLead } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDiscountPopupOpen, setIsDiscountPopupOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = (en: string, es: string, fr: string) => language === 'es' ? es : language === 'fr' ? fr : en;

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      addNewsletterLead(newsletterEmail);
      setIsNewsletterSubscribed(true);
      setNewsletterEmail("");
      setTimeout(() => setIsNewsletterSubscribed(false), 3000);
    }
  };

  return (
    <div className="bg-new-surface font-body text-on-surface antialiased min-h-screen">
      <WelcomePopup />
      
      {/* TopNavBar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 h-20 flex justify-between items-center px-6 ${isScrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm dark:shadow-none' : 'bg-transparent'}`}>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-emerald-900 dark:text-emerald-50 tracking-tight font-headline">
            {globalData.logoText || "Clean Care Editorial"}
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-emerald-900 dark:text-emerald-50 font-medium hover:text-emerald-600 transition-colors">Home</a>
          <a href="#products" className="text-emerald-900 dark:text-emerald-50 font-medium hover:text-emerald-600 transition-colors">Products</a>
          <a href="#reviews" className="text-emerald-900 dark:text-emerald-50 font-medium hover:text-emerald-600 transition-colors">Reviews</a>
          <a href="#about" className="text-emerald-900 dark:text-emerald-50 font-medium hover:text-emerald-600 transition-colors">About</a>
        </div>

        <div className="flex items-center gap-4">
          <WeatherWidget />
          <div className="flex items-center gap-2 text-[10px] font-bold font-headline text-emerald-900 dark:text-emerald-400">
            <button 
              onClick={() => setLanguage('en')} 
              className={`hover:text-emerald-600 transition-colors ${language === 'en' ? 'text-emerald-600 underline underline-offset-4' : 'opacity-40'}`}
            >
              EN
            </button>
            <span className="opacity-20">|</span>
            <button 
              onClick={() => setLanguage('es')} 
              className={`hover:text-emerald-600 transition-colors ${language === 'es' ? 'text-emerald-600 underline underline-offset-4' : 'opacity-40'}`}
            >
              ESP
            </button>
            <span className="opacity-20">|</span>
            <button 
              onClick={() => setLanguage('fr')} 
              className={`hover:text-emerald-600 transition-colors ${language === 'fr' ? 'text-emerald-600 underline underline-offset-4' : 'opacity-40'}`}
            >
              FR
            </button>
          </div>
          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden">
            <span className="material-symbols-outlined text-emerald-900">menu</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 p-6 space-y-4 shadow-xl z-40 md:hidden"
        >
          <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-bold font-headline text-emerald-900">Home</a>
          <a href="#products" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-bold font-headline text-emerald-900">Products</a>
          <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-bold font-headline text-emerald-900">Reviews</a>
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-bold font-headline text-emerald-900">About</a>
          <a href="/admin" className="block text-lg font-bold font-headline text-new-primary pt-4 border-t border-gray-100">Admin Dashboard</a>
        </motion.div>
      )}

      <main className="pt-20">
        {/* Hero Section */}
        <section className="px-6 py-12 bg-gradient-to-b from-primary-container to-new-surface overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto items-center">
            <div className="space-y-4 flex-1">
              <span className="inline-block px-4 py-1.5 bg-on-primary-container/10 text-on-primary-container text-xs font-bold tracking-widest rounded-full uppercase">
                {t(homeData.badgeEn, homeData.badgeEs, homeData.badgeFr) || "Professional Pet Care"}
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold font-headline text-emerald-900 leading-[1.1] tracking-tight">
                {t(homeData.titleEn, homeData.titleEs, homeData.titleFr) || "Premium Care For Every Soul."}
              </h1>
              <p className="text-new-secondary text-lg max-w-md">
                {t(homeData.descEn, homeData.descEs, homeData.descFr) || "Clinical excellence meets compassionate grooming for your companion's lifelong health."}
              </p>
            </div>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] lg:aspect-square shadow-2xl flex-1 w-full">
              <img 
                alt="Premium Pet Care" 
                className="w-full h-full object-cover" 
                src={homeData.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuBVF7g5pbXA7ii1hxVY2HyTDyq04yaJNw0xdwTmUmW0RHiDGkk2cSP46fSYTr7qcQVm5TbSSfbUqryfcVr4pogH0FSFnmr4ejz129VTSHEN8SBpCrAHoNSYoQranh0oQf28PbWgFqR8SO1hX1Hw31qsh4AUTehyqZjxRxSSttC1J9QZ2JH-4MxGCd-umpJPAJ0rkXdec08Mlvb7lqXyOyddxYM7v1RVKfEvm2NbVIgrnz5FFZznBY3LT3GJT-CU8ZrIRnRm2yM0Femv"}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold font-headline text-emerald-900 tracking-tight mb-4">
                  {t("Our Products", "Nuestros Productos", "Nos Produits")}
                </h2>
                <p className="text-new-secondary text-lg leading-relaxed">
                  {t(
                    "Expertly formulated treatments for common ophthalmic conditions, from seasonal allergies to chronic dry eye.",
                    "Tratamientos formulados por expertos para afecciones oftálmicas comunes, desde alergias estacionales hasta ojo seco crónico.",
                    "Traitements formulés par des experts pour les affections ophtalmiques courantes, des allergies saisonnières à la sécheresse oculaire chronique."
                  )}
                </p>
              </div>
              <a href="#" className="flex items-center gap-2 text-emerald-700 font-bold hover:text-emerald-900 transition-colors group">
                {t("View Full Catalog", "Ver Catálogo Completo", "Voir le Catalogue Complet")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-[3rem] p-6 md:p-8 flex flex-col shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100">
                  <div 
                    className="aspect-[4/3] bg-gray-50 rounded-[2.5rem] overflow-hidden cursor-pointer mb-8" 
                    onClick={() => setSelectedProduct(product)}
                  >
                    <img 
                      alt={t(product.titleEn, product.titleEs, product.titleFr)} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                      src={product.imageUrl}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="mb-4">
                      <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold tracking-widest rounded-full uppercase mb-4">
                        {t("Clinical Care", "Cuidado Clínico", "Soin Clinique")}
                      </span>
                      <h3 className="font-headline font-bold text-3xl text-emerald-900 mb-3">
                        {t(product.titleEn, product.titleEs, product.titleFr)}
                      </h3>
                      <p className="text-new-secondary text-lg leading-relaxed line-clamp-2">
                        {t(product.descEn, product.descEs, product.descFr)}
                      </p>
                    </div>

                    <div className="mt-auto pt-8 flex items-center justify-between border-t border-gray-50">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-900/60">
                          {t("Sterile Solution", "Solución Estéril", "Solution Stérile")}
                        </span>
                      </div>
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="px-6 py-3 bg-emerald-50 text-emerald-700 font-bold rounded-full text-xs tracking-wide hover:bg-emerald-100 transition-colors"
                      >
                        {t("View Details", "Ver Detalles", "Voir les Détails")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-20 px-6 bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
            <div className="space-y-4 flex-1">
              <h2 className="text-4xl md:text-5xl font-extrabold font-headline text-emerald-900 tracking-tight">
                {t(aboutData.titleEn, aboutData.titleEs, aboutData.titleFr) || "Our Philosophy"}
              </h2>
              <p className="text-on-surface-variant leading-relaxed text-lg">
                {t(aboutData.descEn, aboutData.descEs, aboutData.descFr) || "Founded in our clinical sanctuary, we believe pet care should be rigorous yet gentle. We bridge the gap between high-end editorial aesthetics and uncompromising medical standards."}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 flex-1 w-full">
              <div className="bg-surface-container-low p-8 rounded-3xl text-center flex flex-col items-center justify-center aspect-square">
                <span className="material-symbols-outlined text-new-primary text-4xl mb-4">shield</span>
                <p className="text-sm font-bold uppercase tracking-widest text-new-secondary">
                  {t(aboutData.stat1LabelEn, aboutData.stat1LabelEs, aboutData.stat1LabelFr) || "Safety Tested"}
                </p>
                <p className="text-2xl font-bold font-headline text-emerald-900 mt-2">{aboutData.stat1Value}</p>
              </div>
              <div className="bg-surface-container-low p-8 rounded-3xl text-center flex flex-col items-center justify-center aspect-square">
                <span className="material-symbols-outlined text-new-primary text-4xl mb-4">potted_plant</span>
                <p className="text-sm font-bold uppercase tracking-widest text-new-secondary">
                  {t(aboutData.stat2LabelEn, aboutData.stat2LabelEs, aboutData.stat2LabelFr) || "Organic Base"}
                </p>
                <p className="text-2xl font-bold font-headline text-emerald-900 mt-2">{aboutData.stat2Value}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Discount Section */}
        <section className="py-20 px-6 md:px-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto bg-emerald-900 rounded-[2.5rem] p-12 md:p-20 text-center text-white overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 space-y-8 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-[10px] font-bold tracking-widest uppercase">
                <span className="material-symbols-outlined text-[14px]">star</span> Special Offer
              </div>
              <h2 className="font-headline font-bold text-4xl md:text-6xl">Get Discount Code</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto font-light">
                Fill out the form now and instantly get your special discount code for your next purchase!
              </p>
              <button 
                onClick={() => setIsDiscountPopupOpen(true)}
                className="bg-white text-emerald-900 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-all shadow-xl"
              >
                Generate Code
              </button>
            </div>
          </motion.div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="py-16 px-6 bg-tertiary-container/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-emerald-900">
                {t("Voices of Trust", "Voces de Confianza", "Voix de Confiance")}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-sm flex flex-col">
                  <div className="flex gap-1 text-primary-fixed-dim mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <p className="text-on-surface italic leading-relaxed mb-6 flex-1">
                    "{t(review.textEn, review.textEs, review.textFr)}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 overflow-hidden flex items-center justify-center font-bold text-emerald-900">
                      {review.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-emerald-900 text-sm">{review.name}</span>
                      <span className="text-xs text-on-surface-variant">{review.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 w-full rounded-t-[2rem] mt-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 px-8 py-16 w-full">
          <div className="space-y-6 lg:col-span-4">
            <span className="text-2xl font-bold text-emerald-800 dark:text-emerald-100 font-headline">
              {globalData.logoText || "Clean Care Editorial"}
            </span>
            <p className="text-slate-500 font-inter text-sm leading-relaxed">
              {t(footerData.descEn, footerData.descEs, footerData.descFr) || "High-end clinical pet care. Curated for the modern companion."}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-8 lg:justify-items-end">
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-400 text-sm">
                {t(footerData.navTitleEn, footerData.navTitleEs, footerData.navTitleFr) || "Navigation"}
              </h4>
              <nav className="flex flex-col gap-3">
                <a className="text-slate-500 hover:text-emerald-600 text-sm transition-colors" href={footerData.navLink1Url}>{t(footerData.navLink1En, footerData.navLink1Es, footerData.navLink1Fr)}</a>
                <a className="text-slate-500 hover:text-emerald-600 text-sm transition-colors" href={footerData.navLink2Url}>{t(footerData.navLink2En, footerData.navLink2Es, footerData.navLink2Fr)}</a>
                <a className="text-slate-500 hover:text-emerald-600 text-sm transition-colors" href={footerData.navLink3Url}>{t(footerData.navLink3En, footerData.navLink3Es, footerData.navLink3Fr)}</a>
              </nav>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-400 text-sm">
                {t(footerData.infoTitleEn, footerData.infoTitleEs, footerData.infoTitleFr) || "Support"}
              </h4>
              <nav className="flex flex-col gap-3">
                <a className="text-slate-500 hover:text-emerald-600 text-sm transition-colors" href={footerData.infoLink1Url}>{t(footerData.infoLink1En, footerData.infoLink1Es, footerData.infoLink1Fr)}</a>
                <a className="text-slate-500 hover:text-emerald-600 text-sm transition-colors" href={footerData.infoLink2Url}>{t(footerData.infoLink2En, footerData.infoLink2Es, footerData.infoLink2Fr)}</a>
                <a className="text-slate-500 hover:text-emerald-600 text-sm transition-colors" href={footerData.infoLink3Url}>{t(footerData.infoLink3En, footerData.infoLink3Es, footerData.infoLink3Fr)}</a>
              </nav>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-200 dark:border-slate-800 lg:col-span-12 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-xs font-inter">
              {t(footerData.copyrightEn, footerData.copyrightEs, footerData.copyrightFr) || "© 2024 Clean Care Editorial. High-end clinical pet care. All rights reserved."}
            </p>
            <a href="/admin" className="text-slate-400 hover:text-emerald-600 text-xs font-inter transition-colors">Admin Dashboard</a>
          </div>
        </div>
      </footer>

      {/* Product Popup */}
      {selectedProduct && (
        <ProductPopup 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {/* Discount Popup */}
      {isDiscountPopupOpen && (
        <DiscountPopup onClose={() => setIsDiscountPopupOpen(false)} />
      )}
    </div>
  );
}
