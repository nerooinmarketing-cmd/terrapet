import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useAppContext } from '../lib/store';

interface DiscountPopupProps {
  onClose: () => void;
}

export default function DiscountPopup({ onClose }: DiscountPopupProps) {
  const { language, addDiscountLead, globalData } = useAppContext();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const t = (en: string, es: string, fr: string) => {
    if (language === 'es') return es;
    if (language === 'fr') return fr;
    return en;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    addDiscountLead({
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      country: formData.get('country') as string,
      city: formData.get('city') as string,
    });
    
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 font-body">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Pop-up Container */}
      <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col max-h-[90vh] sm:max-h-[95vh] border border-gray-200 rounded-2xl sm:rounded-none overflow-hidden">
        {/* Close Button */}
        <div className="absolute top-0 right-0 z-20 p-4">
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-slate-900 transition-colors p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Pop-up Content */}
        <div className="p-6 sm:p-8 pt-16 sm:pt-12 overflow-y-auto flex-1">
          {!isSubmitted ? (
            <>
              <div className="mb-10 text-center">
                <h2 className="font-headline text-2xl font-bold tracking-tight text-slate-900 leading-none mb-4">
                  {t("GET YOUR DISCOUNT CODE", "OBTÉN TU CÓDIGO DE DESCUENTO", "OBTENEZ VOTRE CODE DE RÉDUCTION")}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed max-w-[280px] mx-auto">
                  {t(
                    "Please fill in the information below to receive your special discount code.",
                    "Complete la información a continuación para recibir su código de descuento especial.",
                    "Veuillez remplir les informations ci-dessous pour recevoir votre code de réduction spécial."
                  )}
                </p>
              </div>
              
              {/* Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-label text-[10px] uppercase tracking-widest text-gray-600 font-bold">
                      {t("FIRST NAME", "NOMBRE", "PRÉNOM")}
                    </label>
                    <input 
                      required
                      name="firstName"
                      className="w-full bg-gray-50 border-none focus:ring-1 focus:ring-green-700 py-3 px-4 text-sm font-body text-slate-900 placeholder:text-gray-400" 
                      placeholder="John" 
                      type="text"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-label text-[10px] uppercase tracking-widest text-gray-600 font-bold">
                      {t("LAST NAME", "APELLIDO", "NOM DE FAMILLE")}
                    </label>
                    <input 
                      required
                      name="lastName"
                      className="w-full bg-gray-50 border-none focus:ring-1 focus:ring-green-700 py-3 px-4 text-sm font-body text-slate-900 placeholder:text-gray-400" 
                      placeholder="Doe" 
                      type="text"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="font-label text-[10px] uppercase tracking-widest text-gray-600 font-bold">
                    {t("PHONE NUMBER", "NÚMERO DE TELÉFONO", "NUMÉRO DE TÉLÉPHONE")}
                  </label>
                  <div className="flex gap-2">
                    <div className="bg-gray-100 text-gray-600 text-sm px-3 flex items-center border-none">+1</div>
                    <input 
                      required
                      name="phone"
                      className="flex-1 bg-gray-50 border-none focus:ring-1 focus:ring-green-700 py-3 px-4 text-sm font-body text-slate-900 placeholder:text-gray-400" 
                      placeholder="(555) 000-0000" 
                      type="tel"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="font-label text-[10px] uppercase tracking-widest text-gray-600 font-bold">
                    {t("EMAIL ADDRESS", "CORREO ELECTRÓNICO", "ADRESSE E-MAIL")}
                  </label>
                  <input 
                    required
                    name="email"
                    className="w-full bg-gray-50 border-none focus:ring-1 focus:ring-green-700 py-3 px-4 text-sm font-body text-slate-900 placeholder:text-gray-400" 
                    placeholder="email@example.com" 
                    type="email"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-label text-[10px] uppercase tracking-widest text-gray-600 font-bold">
                      {t("COUNTRY", "PAÍS", "PAYS")}
                    </label>
                    <input 
                      required
                      name="country"
                      className="w-full bg-gray-50 border-none focus:ring-1 focus:ring-green-700 py-3 px-4 text-sm font-body text-slate-900 placeholder:text-gray-400" 
                      placeholder="United States" 
                      type="text"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-label text-[10px] uppercase tracking-widest text-gray-600 font-bold">
                      {t("CITY", "CIUDAD", "VILLE")}
                    </label>
                    <input 
                      required
                      name="city"
                      className="w-full bg-gray-50 border-none focus:ring-1 focus:ring-green-700 py-3 px-4 text-sm font-body text-slate-900 placeholder:text-gray-400" 
                      placeholder="New York" 
                      type="text"
                    />
                  </div>
                </div>
                
                {/* CTA Button */}
                <button 
                  className="w-full bg-[#f36b21] hover:bg-[#d95d1b] text-white font-headline font-bold py-4 mt-4 transition-all active:scale-[0.98] flex items-center justify-center gap-2" 
                  type="submit"
                >
                  <span>{t("Save and Get Code", "Guardar y Obtener Código", "Enregistrer et Obtenir le Code")}</span>
                  <ArrowRight size={20} />
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-10 space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🎉</span>
              </div>
              <h2 className="font-headline text-2xl font-bold tracking-tight text-slate-900 leading-none">
                {t("SUCCESS!", "¡ÉXITO!", "SUCCÈS !")}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed max-w-[280px] mx-auto">
                {t(
                  "Your discount code has been generated. Use the code below at checkout.",
                  "Su código de descuento ha sido generado. Use el código a continuación al pagar.",
                  "Votre code de réduction a été généré. Utilisez le code ci-dessous lors du paiement."
                )}
              </p>
              <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 border-dashed mt-6">
                <p className="font-mono text-2xl font-bold text-slate-900 tracking-widest">
                  {globalData.discountCode}
                </p>
              </div>
              <a 
                href={globalData.discountLink}
                onClick={onClose}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-headline font-bold py-4 mt-4 transition-all active:scale-[0.98] block text-center"
              >
                {t("Continue Shopping", "Continuar Comprando", "Continuer les Achats")}
              </a>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-center gap-4 opacity-40 grayscale">
              <img className="h-6 w-auto object-contain" alt="microscopic detail" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjBA5Fk2Fvpm8zC7_rmjkNxHuhx3GdCBzJO-8D9yT0LFbsvfqIXirymY8WeueGMOYB7YuiPDVyEHaL5P4o8StmKQZUpYW6OB_-JXSI2Kyqug4O4Nnjx75Nu5IyoXjatFS0mVOqveS6_L0msG5aiDA00-0sSm_VqkUn_Yl7d9YWkr4y23Z7C08WkYowVTxItVkqhiYyV9IzUmB-5lKuDJQXGnnfIGIm1UplYGg4f8dca9ut6LJ3iOrDljiMnsluSHgD9yyOUk0WJygi"/>
              <img className="h-6 w-auto object-contain" alt="minimalist clinical logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0v0ABjCHJu9JD_Dq4YOaKOFIPs5yCAAgU3POn3bdYbRl3MlpPXiGD6TnCRDiyTrqi9i9oPIz6aBoAuARSFbRzm3e0np2ggHhBK0WQmvMNB-QDZsY_GlMUJpQuLooQrchd6EJmHnElWkPvRvlPUDzj_oTpDJIrW7QPa5409_jJe2HmwGI3VGG4pQ5jRVUbNN4p9An0AhXLevTLoimt19NttrhjWY-Zbnf-yFqGo0gsa5ARVyzASc5neTJQEHGRLqDMBLBi2ms-ERHh"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
