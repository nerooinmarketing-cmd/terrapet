import React, { useState } from 'react';
import { useAppContext } from '../lib/store';

export default function WelcomePopup() {
  const { language, welcomePopupData } = useAppContext();
  const [isOpen, setIsOpen] = useState(true); // Always open on load as requested

  if (!isOpen || !welcomePopupData.isActive) return null;

  const t = (en: string, es: string, fr: string) => {
    if (language === 'es') return es;
    if (language === 'fr') return fr;
    return en;
  };

  const title = t(welcomePopupData.titleEn, welcomePopupData.titleEs, welcomePopupData.titleFr);
  const desc = t(welcomePopupData.descEn, welcomePopupData.descEs, welcomePopupData.descFr);
  const btn1Text = t(welcomePopupData.btn1TextEn, welcomePopupData.btn1TextEs, welcomePopupData.btn1TextFr);
  const btn2Text = t(welcomePopupData.btn2TextEn, welcomePopupData.btn2TextEs, welcomePopupData.btn2TextFr);

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1`;
    }
    return url;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 font-body">
      {/* Blurred overlay */}
      <div 
        className="absolute inset-0 bg-[#191c1e]/40 backdrop-blur-md"
        onClick={() => setIsOpen(false)}
      ></div>

      <div className="bg-white w-full max-w-5xl rounded-[2rem] overflow-hidden shadow-[0px_12px_32px_rgba(25,28,30,0.08)] flex flex-col md:flex-row relative z-10 max-h-[95vh]">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 bg-white/80 hover:bg-white p-2 rounded-full transition-all group backdrop-blur-md shadow-sm"
        >
          <span className="material-symbols-outlined text-gray-600 group-hover:text-gray-900">close</span>
        </button>

        <div className="flex flex-col md:flex-row w-full h-full overflow-y-auto">
          {/* Visual Side (Left/Top) */}
          <div className="w-full md:w-5/12 relative min-h-[400px] md:min-h-[600px] bg-black overflow-hidden shrink-0 flex items-center justify-center">
            {welcomePopupData.videoUrl ? (
              welcomePopupData.videoUrl.startsWith('data:video/') || welcomePopupData.videoUrl.endsWith('.mp4') ? (
                <video 
                  src={welcomePopupData.videoUrl} 
                  className="w-full h-full object-cover md:object-contain" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                />
              ) : (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={getEmbedUrl(welcomePopupData.videoUrl)}
                  title="Welcome Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              )
            ) : (
              <img 
                alt="Welcome" 
                className="absolute inset-0 w-full h-full object-cover" 
                src={welcomePopupData.imageUrl}
                referrerPolicy="no-referrer"
              />
            )}
            {/* Branding Accent */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-[#006c49]/80 to-transparent pointer-events-none">
              <div className="flex items-center gap-2 text-white">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="text-xs font-bold tracking-[0.1em] uppercase font-headline">
                  {t("Clinical Standards Approved", "Estándares Clínicos Aprobados", "Normes Cliniques Approuvées")}
                </span>
              </div>
            </div>
          </div>

          {/* Content Side (Right/Bottom) */}
          <div className="w-full md:w-7/12 p-6 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
            
            {/* Mini Header */}
            <div className="mb-4 md:mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006c49]" style={{ fontVariationSettings: "'FILL' 1" }}>healing</span>
              <span className="text-xs font-bold tracking-widest text-[#006c49] uppercase font-headline bg-[#beffdb] px-3 py-1 rounded-full">
                {t("Clean Care Editorial", "Clean Care Editorial", "Clean Care Éditorial")}
              </span>
            </div>

            {/* Main Copy */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#191c1e] tracking-tight font-headline leading-[1.1] mb-4 md:mb-6">
              {title}
            </h1>
            <p className="text-base md:text-lg text-[#414844] font-body leading-relaxed mb-8 md:mb-10 max-w-md">
              {desc}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
              {/* CTA Button */}
              <a 
                href={welcomePopupData.btn1Url} 
                className="w-full sm:w-auto px-8 py-4 bg-[#006c49] text-white rounded-full font-semibold flex items-center justify-center gap-3 shadow-lg shadow-[#006c49]/20 hover:bg-[#005236] active:scale-[0.98] transition-all duration-300"
              >
                <span>{btn1Text}</span>
              </a>
              
              {/* Dismiss Link */}
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[#414844] hover:text-[#006c49] font-semibold text-sm transition-colors duration-300 border-b border-transparent hover:border-[#006c49] pb-1"
              >
                {btn2Text}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 md:mt-16 pt-8 md:pt-12 border-t border-gray-200 grid grid-cols-3 gap-2 md:gap-4">
              <div className="flex flex-col items-start">
                <span className="text-[20px] material-symbols-outlined text-[#006c49] mb-1 md:mb-2">science</span>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-tighter text-[#414844]">
                  {t("Lab Tested", "Probado en Lab", "Testé en Labo")}
                </span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[20px] material-symbols-outlined text-[#006c49] mb-1 md:mb-2">eco</span>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-tighter text-[#414844]">
                  {t("Non-Toxic", "No Tóxico", "Non Toxique")}
                </span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[20px] material-symbols-outlined text-[#006c49] mb-1 md:mb-2">medical_services</span>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-tighter text-[#414844]">
                  {t("Vet Grade", "Grado Vet", "Qualité Vét")}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
