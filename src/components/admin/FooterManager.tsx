import { useState, useEffect } from "react";
import { Wand2, Save } from "lucide-react";
import { translateText } from "../../lib/gemini";
import { useAppContext, FooterData } from "../../lib/store";

export default function FooterManager() {
  const { footerData, updateFooter, adminLang } = useAppContext();
  const [data, setData] = useState<FooterData>(footerData);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const t = (en: string, tr: string) => adminLang === 'tr' ? tr : en;

  useEffect(() => {
    setData(footerData);
  }, [footerData]);

  const handleTranslate = async () => {
    setIsTranslating(true);
    try {
      const [
        descTranslations,
        copyTranslations,
        navTitleTranslations,
        navLink1Translations,
        navLink2Translations,
        navLink3Translations,
        navLink4Translations,
        infoTitleTranslations,
        infoLink1Translations,
        infoLink2Translations,
        infoLink3Translations,
        infoLink4Translations,
        supportTitleTranslations,
        supportDescTranslations,
        contactBtnTranslations
      ] = await Promise.all([
        translateText(data.descEn),
        translateText(data.copyrightEn),
        translateText(data.navTitleEn),
        translateText(data.navLink1En),
        translateText(data.navLink2En),
        translateText(data.navLink3En),
        translateText(data.navLink4En),
        translateText(data.infoTitleEn),
        translateText(data.infoLink1En),
        translateText(data.infoLink2En),
        translateText(data.infoLink3En),
        translateText(data.infoLink4En),
        translateText(data.supportTitleEn),
        translateText(data.supportDescEn),
        translateText(data.contactBtnEn)
      ]);
      
      setData(prev => ({
        ...prev,
        descEs: descTranslations.es || prev.descEs,
        descFr: descTranslations.fr || prev.descFr,
        copyrightEs: copyTranslations.es || prev.copyrightEs,
        copyrightFr: copyTranslations.fr || prev.copyrightFr,
        navTitleEs: navTitleTranslations.es || prev.navTitleEs,
        navTitleFr: navTitleTranslations.fr || prev.navTitleFr,
        navLink1Es: navLink1Translations.es || prev.navLink1Es,
        navLink1Fr: navLink1Translations.fr || prev.navLink1Fr,
        navLink2Es: navLink2Translations.es || prev.navLink2Es,
        navLink2Fr: navLink2Translations.fr || prev.navLink2Fr,
        navLink3Es: navLink3Translations.es || prev.navLink3Es,
        navLink3Fr: navLink3Translations.fr || prev.navLink3Fr,
        navLink4Es: navLink4Translations.es || prev.navLink4Es,
        navLink4Fr: navLink4Translations.fr || prev.navLink4Fr,
        infoTitleEs: infoTitleTranslations.es || prev.infoTitleEs,
        infoTitleFr: infoTitleTranslations.fr || prev.infoTitleFr,
        infoLink1Es: infoLink1Translations.es || prev.infoLink1Es,
        infoLink1Fr: infoLink1Translations.fr || prev.infoLink1Fr,
        infoLink2Es: infoLink2Translations.es || prev.infoLink2Es,
        infoLink2Fr: infoLink2Translations.fr || prev.infoLink2Fr,
        infoLink3Es: infoLink3Translations.es || prev.infoLink3Es,
        infoLink3Fr: infoLink3Translations.fr || prev.infoLink3Fr,
        infoLink4Es: infoLink4Translations.es || prev.infoLink4Es,
        infoLink4Fr: infoLink4Translations.fr || prev.infoLink4Fr,
        supportTitleEs: supportTitleTranslations.es || prev.supportTitleEs,
        supportTitleFr: supportTitleTranslations.fr || prev.supportTitleFr,
        supportDescEs: supportDescTranslations.es || prev.supportDescEs,
        supportDescFr: supportDescTranslations.fr || prev.supportDescFr,
        contactBtnEs: contactBtnTranslations.es || prev.contactBtnEs,
        contactBtnFr: contactBtnTranslations.fr || prev.contactBtnFr,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    updateFooter(data);
    setTimeout(() => setIsSaving(false), 500);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h2 className="font-semibold text-gray-900">{t("Edit Footer Section", "Alt Bilgi Alanını Düzenle")}</h2>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleTranslate}
            disabled={isTranslating}
            className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Wand2 size={16} />
            {isTranslating ? t("Translating...", "Çevriliyor...") : t("Auto-Translate", "Otomatik Çevir")}
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            <Save size={16} />
            {isSaving ? t("Saved!", "Kaydedildi!") : t("Save Changes", "Değişiklikleri Kaydet")}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* English */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">EN</span>
              <h3 className="text-sm font-semibold text-gray-900">{t("English", "İngilizce")}</h3>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Description", "Açıklama")}</label>
              <textarea value={data.descEn} onChange={(e) => setData({...data, descEn: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[120px]" />
            </div>
            
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Navigation Title", "Navigasyon Başlığı")}</label>
              <input type="text" value={data.navTitleEn} onChange={(e) => setData({...data, navTitleEn: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Nav Link 1", "Nav Link 1")}</label>
              <input type="text" value={data.navLink1En} onChange={(e) => setData({...data, navLink1En: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Nav Link 2", "Nav Link 2")}</label>
              <input type="text" value={data.navLink2En} onChange={(e) => setData({...data, navLink2En: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Nav Link 3", "Nav Link 3")}</label>
              <input type="text" value={data.navLink3En} onChange={(e) => setData({...data, navLink3En: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Nav Link 4", "Nav Link 4")}</label>
              <input type="text" value={data.navLink4En} onChange={(e) => setData({...data, navLink4En: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-100">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Information Title", "Bilgi Başlığı")}</label>
              <input type="text" value={data.infoTitleEn} onChange={(e) => setData({...data, infoTitleEn: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Info Link 1", "Bilgi Link 1")}</label>
              <input type="text" value={data.infoLink1En} onChange={(e) => setData({...data, infoLink1En: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Info Link 2", "Bilgi Link 2")}</label>
              <input type="text" value={data.infoLink2En} onChange={(e) => setData({...data, infoLink2En: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Info Link 3", "Bilgi Link 3")}</label>
              <input type="text" value={data.infoLink3En} onChange={(e) => setData({...data, infoLink3En: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Info Link 4", "Bilgi Link 4")}</label>
              <input type="text" value={data.infoLink4En} onChange={(e) => setData({...data, infoLink4En: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-100">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Support Title", "Destek Başlığı")}</label>
              <input type="text" value={data.supportTitleEn} onChange={(e) => setData({...data, supportTitleEn: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Support Description", "Destek Açıklaması")}</label>
              <textarea value={data.supportDescEn} onChange={(e) => setData({...data, supportDescEn: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[80px]" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Contact Button", "İletişim Butonu")}</label>
              <input type="text" value={data.contactBtnEn} onChange={(e) => setData({...data, contactBtnEn: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-100">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Copyright", "Telif Hakkı")}</label>
              <input type="text" value={data.copyrightEn} onChange={(e) => setData({...data, copyrightEn: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
          </div>

          {/* Spanish */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <span className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-600">ES</span>
              <h3 className="text-sm font-semibold text-gray-900">{t("Spanish", "İspanyolca")}</h3>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Description", "Açıklama")}</label>
              <textarea value={data.descEs} onChange={(e) => setData({...data, descEs: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[120px]" />
            </div>
            
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Navigation Title", "Navigasyon Başlığı")}</label>
              <input type="text" value={data.navTitleEs} onChange={(e) => setData({...data, navTitleEs: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Nav Link 1", "Nav Link 1")}</label>
              <input type="text" value={data.navLink1Es} onChange={(e) => setData({...data, navLink1Es: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Nav Link 2", "Nav Link 2")}</label>
              <input type="text" value={data.navLink2Es} onChange={(e) => setData({...data, navLink2Es: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Nav Link 3", "Nav Link 3")}</label>
              <input type="text" value={data.navLink3Es} onChange={(e) => setData({...data, navLink3Es: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Nav Link 4", "Nav Link 4")}</label>
              <input type="text" value={data.navLink4Es} onChange={(e) => setData({...data, navLink4Es: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-100">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Information Title", "Bilgi Başlığı")}</label>
              <input type="text" value={data.infoTitleEs} onChange={(e) => setData({...data, infoTitleEs: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Info Link 1", "Bilgi Link 1")}</label>
              <input type="text" value={data.infoLink1Es} onChange={(e) => setData({...data, infoLink1Es: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Info Link 2", "Bilgi Link 2")}</label>
              <input type="text" value={data.infoLink2Es} onChange={(e) => setData({...data, infoLink2Es: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Info Link 3", "Bilgi Link 3")}</label>
              <input type="text" value={data.infoLink3Es} onChange={(e) => setData({...data, infoLink3Es: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Info Link 4", "Bilgi Link 4")}</label>
              <input type="text" value={data.infoLink4Es} onChange={(e) => setData({...data, infoLink4Es: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-100">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Support Title", "Destek Başlığı")}</label>
              <input type="text" value={data.supportTitleEs} onChange={(e) => setData({...data, supportTitleEs: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Support Description", "Destek Açıklaması")}</label>
              <textarea value={data.supportDescEs} onChange={(e) => setData({...data, supportDescEs: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[80px]" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Contact Button", "İletişim Butonu")}</label>
              <input type="text" value={data.contactBtnEs} onChange={(e) => setData({...data, contactBtnEs: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-100">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Copyright", "Telif Hakkı")}</label>
              <input type="text" value={data.copyrightEs} onChange={(e) => setData({...data, copyrightEs: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
          </div>

          {/* French */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <span className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-xs font-bold text-purple-600">FR</span>
              <h3 className="text-sm font-semibold text-gray-900">{t("French", "Fransızca")}</h3>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Description", "Açıklama")}</label>
              <textarea value={data.descFr} onChange={(e) => setData({...data, descFr: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[120px]" />
            </div>
            
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Navigation Title", "Navigasyon Başlığı")}</label>
              <input type="text" value={data.navTitleFr} onChange={(e) => setData({...data, navTitleFr: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Nav Link 1", "Nav Link 1")}</label>
              <input type="text" value={data.navLink1Fr} onChange={(e) => setData({...data, navLink1Fr: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Nav Link 2", "Nav Link 2")}</label>
              <input type="text" value={data.navLink2Fr} onChange={(e) => setData({...data, navLink2Fr: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Nav Link 3", "Nav Link 3")}</label>
              <input type="text" value={data.navLink3Fr} onChange={(e) => setData({...data, navLink3Fr: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Nav Link 4", "Nav Link 4")}</label>
              <input type="text" value={data.navLink4Fr} onChange={(e) => setData({...data, navLink4Fr: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-100">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Information Title", "Bilgi Başlığı")}</label>
              <input type="text" value={data.infoTitleFr} onChange={(e) => setData({...data, infoTitleFr: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Info Link 1", "Bilgi Link 1")}</label>
              <input type="text" value={data.infoLink1Fr} onChange={(e) => setData({...data, infoLink1Fr: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Info Link 2", "Bilgi Link 2")}</label>
              <input type="text" value={data.infoLink2Fr} onChange={(e) => setData({...data, infoLink2Fr: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Info Link 3", "Bilgi Link 3")}</label>
              <input type="text" value={data.infoLink3Fr} onChange={(e) => setData({...data, infoLink3Fr: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Info Link 4", "Bilgi Link 4")}</label>
              <input type="text" value={data.infoLink4Fr} onChange={(e) => setData({...data, infoLink4Fr: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-100">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Support Title", "Destek Başlığı")}</label>
              <input type="text" value={data.supportTitleFr} onChange={(e) => setData({...data, supportTitleFr: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Support Description", "Destek Açıklaması")}</label>
              <textarea value={data.supportDescFr} onChange={(e) => setData({...data, supportDescFr: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[80px]" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Contact Button", "İletişim Butonu")}</label>
              <input type="text" value={data.contactBtnFr} onChange={(e) => setData({...data, contactBtnFr: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-100">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Copyright", "Telif Hakkı")}</label>
              <input type="text" value={data.copyrightFr} onChange={(e) => setData({...data, copyrightFr: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 mt-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-6">{t("Links & URLs", "Bağlantılar ve URL'ler")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-500 uppercase">{t("Navigation URLs", "Navigasyon URL'leri")}</h4>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase">Link 1 URL</label>
                <input type="text" value={data.navLink1Url} onChange={(e) => setData({...data, navLink1Url: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase">Link 2 URL</label>
                <input type="text" value={data.navLink2Url} onChange={(e) => setData({...data, navLink2Url: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase">Link 3 URL</label>
                <input type="text" value={data.navLink3Url} onChange={(e) => setData({...data, navLink3Url: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase">Link 4 URL</label>
                <input type="text" value={data.navLink4Url} onChange={(e) => setData({...data, navLink4Url: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-500 uppercase">{t("Information URLs", "Bilgi URL'leri")}</h4>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase">Link 1 URL</label>
                <input type="text" value={data.infoLink1Url} onChange={(e) => setData({...data, infoLink1Url: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase">Link 2 URL</label>
                <input type="text" value={data.infoLink2Url} onChange={(e) => setData({...data, infoLink2Url: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase">Link 3 URL</label>
                <input type="text" value={data.infoLink3Url} onChange={(e) => setData({...data, infoLink3Url: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase">Link 4 URL</label>
                <input type="text" value={data.infoLink4Url} onChange={(e) => setData({...data, infoLink4Url: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-500 uppercase">{t("Support & Social URLs", "Destek ve Sosyal Medya URL'leri")}</h4>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase">{t("Contact Button URL", "İletişim Butonu URL")}</label>
                <input type="text" value={data.contactBtnUrl} onChange={(e) => setData({...data, contactBtnUrl: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase">Instagram URL</label>
                <input type="text" value={data.instagramUrl} onChange={(e) => setData({...data, instagramUrl: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase">Twitter URL</label>
                <input type="text" value={data.twitterUrl} onChange={(e) => setData({...data, twitterUrl: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase">Facebook URL</label>
                <input type="text" value={data.facebookUrl} onChange={(e) => setData({...data, facebookUrl: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
