import React, { useState } from 'react';
import { X, Play, ArrowRight } from 'lucide-react';
import { Product, useAppContext } from '../lib/store';

interface ProductPopupProps {
  product: Product;
  onClose: () => void;
}

export default function ProductPopup({ product, onClose }: ProductPopupProps) {
  const { language } = useAppContext();
  const [isPlaying, setIsPlaying] = useState(false);

  const t = (en: string, es: string, fr: string) => {
    if (language === 'es') return es;
    if (language === 'fr') return fr;
    return en;
  };

  const title = t(product.titleEn, product.titleEs, product.titleFr);
  const desc = t(product.descEn, product.descEs, product.descFr);
  const benefits = (t(product.benefitsEn, product.benefitsEs, product.benefitsFr) || "").split('\n').filter(Boolean);
  const composition = t(product.compositionEn, product.compositionEs, product.compositionFr);
  const directions = (t(product.directionsEn, product.directionsEs, product.directionsFr) || "").split('\n').filter(Boolean);

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
    }
    return url;
  };

  const galleryImages = [
    product.imageUrl,
    ...(product.images || [])
  ].slice(0, 5);

  // Fill up to 5 images if less are provided
  while (galleryImages.length < 5) {
    galleryImages.push(product.imageUrl);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-900/60 backdrop-blur-sm font-body overflow-hidden">
      {/* Main Pop-Up Container */}
      <article className="bg-white w-full max-w-5xl max-h-[95vh] overflow-y-auto flex flex-col shadow-2xl relative rounded-none animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-white text-[#006c49] hover:bg-[#beffdb] transition-colors shadow-md"
        >
          <X size={24} />
        </button>

        {/* 1. Sleek Gallery */}
        <section className="grid grid-cols-3 md:grid-cols-5 gap-0.5 bg-[#e6e8ea]">
          {galleryImages.map((img, idx) => (
            <div key={idx} className={`aspect-square bg-white flex items-center justify-center p-1 md:p-2 ${idx === 4 ? 'hidden md:flex' : ''}`}>
              <img 
                className="w-full h-full object-contain" 
                src={img} 
                alt={`${title} view ${idx + 1}`}
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </section>

        {/* 2. Large Video Player Section */}
        {product.videoUrl && (
          <section className="bg-[#f2f4f6] p-4 md:p-8">
            <div className="relative w-full aspect-video bg-[#2d3133] flex items-center justify-center overflow-hidden shadow-inner">
              {!isPlaying ? (
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    className="w-full h-full object-cover opacity-60" 
                    src={product.imageUrl} 
                    alt="Video Thumbnail"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <button 
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 m-auto z-10 w-16 h-16 md:w-20 md:h-20 bg-[#006c49] flex items-center justify-center text-white hover:scale-105 transition-transform rounded-none shadow-xl"
                  >
                    <Play size={32} fill="currentColor" />
                  </button>
                  <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white text-left">
                    <p className="font-headline font-bold text-base md:text-xl tracking-tight">
                      {t("Clinical Protocol", "Protocolo Clínico", "Protocole Clinique")}
                    </p>
                    <p className="text-xs md:text-sm opacity-80">
                      {t("Application guide", "Guía de aplicación", "Guide d'application")}
                    </p>
                  </div>
                </div>
              ) : (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={getEmbedUrl(product.videoUrl)}
                  title="Product Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </section>
        )}

        {/* Main Content Area */}
        <div className="px-6 md:px-8 pb-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            
            {/* 3. Technical Description */}
            <section className="space-y-6 text-left">
              <div className="border-l-4 border-[#006c49] pl-6 py-1">
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[#717974]">
                  {t("Clinical Formulation", "Formulación Clínica", "Formulation Clinique")}
                </span>
                <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-[#191c1e] leading-tight mt-1">
                  {title}
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-[#414844] leading-relaxed">
                  {desc}
                </p>
                {composition && (
                  <div className="bg-[#eceef0] p-6">
                    <h3 className="font-headline font-bold text-[#006c49] mb-3">
                      {t("Core Formulation", "Formulación Principal", "Formulation de Base")}
                    </h3>
                    <div className="text-sm text-[#414844] whitespace-pre-line">
                      {composition}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* 4. Benefits */}
            <section className="space-y-8 text-left">
              <h3 className="font-headline text-xl font-bold tracking-tight">
                {t("Clinical Benefits", "Beneficios Clínicos", "Avantages Cliniques")}
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 bg-[#beffdb] text-[#007d55] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {idx === 0 ? 'visibility' : idx === 1 ? 'health_and_safety' : 'verified'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-[#414844] leading-relaxed">{benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* 5. Directions for Use */}
          {directions.length > 0 && (
            <section className="mt-12 md:mt-16 bg-[#f2f4f6] p-6 md:p-8 text-left">
              <h3 className="font-headline text-xl font-bold mb-8 text-center uppercase tracking-widest text-[#006c49]">
                {t("Directions for Use", "Instrucciones de Uso", "Mode d'Emploi")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {directions.map((step, idx) => (
                  <div key={idx} className="relative">
                    <span className="text-5xl font-extrabold text-[#c1c8c2]/30 absolute -top-4 -left-2">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="relative z-10 pt-4">
                      <p className="text-xs text-[#414844] leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 6. Bottom Action */}
          <div className="mt-12">
            <a 
              href={product.amazonLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#006c49] py-6 px-8 flex items-center justify-center gap-4 text-white font-headline font-extrabold tracking-tighter text-xl hover:bg-[#005236] transition-all group rounded-none"
            >
              {t("BUY ON AMAZON", "COMPRAR EN AMAZON", "ACHETER SUR AMAZON")}
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </a>
            <p className="text-center mt-4 text-[10px] uppercase tracking-widest text-[#717974]">
              {t("Authorized Clinical Editorial Retailer", "Distribuidor Editorial Clínico Autorizado", "Détaillant Éditorial Clinique Autorisé")}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
