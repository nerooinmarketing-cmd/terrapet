import { useState, useEffect } from "react";
import { Wand2, Save } from "lucide-react";
import { translateText } from "../../lib/gemini";
import { useAppContext, HomeData } from "../../lib/store";

export default function HomeManager() {
  const { homeData, updateHome, adminLang } = useAppContext();
  const [data, setData] = useState<HomeData>(homeData);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const t = (en: string, tr: string) => adminLang === 'tr' ? tr : en;

  useEffect(() => {
    setData(homeData);
  }, [homeData]);

  const handleTranslate = async () => {
    setIsTranslating(true);
    try {
      const [
        badgeTranslations,
        titleTranslations,
        descTranslations,
        button1Translations,
        button2Translations
      ] = await Promise.all([
        translateText(data.badgeEn),
        translateText(data.titleEn),
        translateText(data.descEn),
        translateText(data.button1En),
        translateText(data.button2En)
      ]);
      
      setData(prev => ({
        ...prev,
        badgeEs: badgeTranslations.es || prev.badgeEs,
        badgeFr: badgeTranslations.fr || prev.badgeFr,
        titleEs: titleTranslations.es || prev.titleEs,
        titleFr: titleTranslations.fr || prev.titleFr,
        descEs: descTranslations.es || prev.descEs,
        descFr: descTranslations.fr || prev.descFr,
        button1Es: button1Translations.es || prev.button1Es,
        button1Fr: button1Translations.fr || prev.button1Fr,
        button2Es: button2Translations.es || prev.button2Es,
        button2Fr: button2Translations.fr || prev.button2Fr,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    updateHome(data);
    setTimeout(() => setIsSaving(false), 500);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h2 className="font-semibold text-gray-900">{t("Edit Home Hero Section", "Ana Sayfa Hero Alanını Düzenle")}</h2>
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
        {/* Image Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            {t("Hero Image", "Hero Görseli")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Image URL", "Görsel URL")}</label>
              <input 
                type="text" 
                value={data.imageUrl}
                onChange={(e) => setData({...data, imageUrl: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
              {data.imageUrl ? (
                <img src={data.imageUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">{t("No image", "Görsel yok")}</div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* English */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">EN</span>
              <h3 className="text-sm font-semibold text-gray-900">{t("English (Base)", "İngilizce (Temel)")}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Badge", "Rozet")}</label>
                <input 
                  type="text" 
                  value={data.badgeEn}
                  onChange={(e) => setData({...data, badgeEn: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Title", "Başlık")}</label>
                <textarea 
                  value={data.titleEn}
                  onChange={(e) => setData({...data, titleEn: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Description", "Açıklama")}</label>
                <textarea 
                  value={data.descEn}
                  onChange={(e) => setData({...data, descEn: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Button 1", "Buton 1")}</label>
                <input 
                  type="text" 
                  value={data.button1En}
                  onChange={(e) => setData({...data, button1En: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Button 2", "Buton 2")}</label>
                <input 
                  type="text" 
                  value={data.button2En}
                  onChange={(e) => setData({...data, button2En: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Spanish */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <span className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-600">ES</span>
              <h3 className="text-sm font-semibold text-gray-900">{t("Spanish", "İspanyolca")}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Badge", "Rozet")}</label>
                <input 
                  type="text" 
                  value={data.badgeEs}
                  onChange={(e) => setData({...data, badgeEs: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Title", "Başlık")}</label>
                <textarea 
                  value={data.titleEs}
                  onChange={(e) => setData({...data, titleEs: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Description", "Açıklama")}</label>
                <textarea 
                  value={data.descEs}
                  onChange={(e) => setData({...data, descEs: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Button 1", "Buton 1")}</label>
                <input 
                  type="text" 
                  value={data.button1Es}
                  onChange={(e) => setData({...data, button1Es: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Button 2", "Buton 2")}</label>
                <input 
                  type="text" 
                  value={data.button2Es}
                  onChange={(e) => setData({...data, button2Es: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* French */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <span className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-xs font-bold text-purple-600">FR</span>
              <h3 className="text-sm font-semibold text-gray-900">{t("French", "Fransızca")}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Badge", "Rozet")}</label>
                <input 
                  type="text" 
                  value={data.badgeFr}
                  onChange={(e) => setData({...data, badgeFr: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Title", "Başlık")}</label>
                <textarea 
                  value={data.titleFr}
                  onChange={(e) => setData({...data, titleFr: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Description", "Açıklama")}</label>
                <textarea 
                  value={data.descFr}
                  onChange={(e) => setData({...data, descFr: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Button 1", "Buton 1")}</label>
                <input 
                  type="text" 
                  value={data.button1Fr}
                  onChange={(e) => setData({...data, button1Fr: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Button 2", "Buton 2")}</label>
                <input 
                  type="text" 
                  value={data.button2Fr}
                  onChange={(e) => setData({...data, button2Fr: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
