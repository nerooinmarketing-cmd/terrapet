import { useState, useEffect } from "react";
import { Wand2, Save } from "lucide-react";
import { translateText } from "../../lib/gemini";
import { useAppContext, AboutData } from "../../lib/store";

export default function AboutManager() {
  const { aboutData, updateAbout, adminLang } = useAppContext();
  const [data, setData] = useState<AboutData>(aboutData);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const t = (en: string, tr: string) => adminLang === 'tr' ? tr : en;

  useEffect(() => {
    setData(aboutData);
  }, [aboutData]);

  const handleTranslate = async () => {
    setIsTranslating(true);
    try {
      const [
        badgeTranslations,
        titleTranslations,
        descTranslations,
        stat1Translations,
        stat2Translations
      ] = await Promise.all([
        translateText(data.badgeEn),
        translateText(data.titleEn),
        translateText(data.descEn),
        translateText(data.stat1LabelEn),
        translateText(data.stat2LabelEn)
      ]);
      
      setData(prev => ({
        ...prev,
        badgeEs: badgeTranslations.es || prev.badgeEs,
        badgeFr: badgeTranslations.fr || prev.badgeFr,
        titleEs: titleTranslations.es || prev.titleEs,
        titleFr: titleTranslations.fr || prev.titleFr,
        descEs: descTranslations.es || prev.descEs,
        descFr: descTranslations.fr || prev.descFr,
        stat1LabelEs: stat1Translations.es || prev.stat1LabelEs,
        stat1LabelFr: stat1Translations.fr || prev.stat1LabelFr,
        stat2LabelEs: stat2Translations.es || prev.stat2LabelEs,
        stat2LabelFr: stat2Translations.fr || prev.stat2LabelFr,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateAbout(data);
    } catch (error: any) {
      alert("Kaydetme başarısız: " + error.message);
    } finally {
      setTimeout(() => setIsSaving(false), 1000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h2 className="font-semibold text-gray-900">{t("Edit About Us Section", "Hakkımızda Alanını Düzenle")}</h2>
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
        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">{t("Main Image", "Ana Görsel")}</h3>
            <div className="space-y-2">
              <input 
                type="text" 
                value={data.image1Url}
                onChange={(e) => setData({...data, image1Url: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 border border-gray-200 w-48">
              {data.image1Url && <img src={data.image1Url} alt="Preview" className="w-full h-full object-cover" />}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">{t("Secondary Image", "İkincil Görsel")}</h3>
            <div className="space-y-2">
              <input 
                type="text" 
                value={data.image2Url}
                onChange={(e) => setData({...data, image2Url: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200 w-48">
              {data.image2Url && <img src={data.image2Url} alt="Preview" className="w-full h-full object-cover" />}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">{t("Stat 1", "İstatistik 1")}</h3>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Value", "Değer")}</label>
              <input 
                type="text" value={data.stat1Value}
                onChange={(e) => setData({...data, stat1Value: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <input type="text" placeholder={t("EN Label", "EN Etiket")} value={data.stat1LabelEn} onChange={(e) => setData({...data, stat1LabelEn: e.target.value})} className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm" />
              <input type="text" placeholder={t("ES Label", "ES Etiket")} value={data.stat1LabelEs} onChange={(e) => setData({...data, stat1LabelEs: e.target.value})} className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm" />
              <input type="text" placeholder={t("FR Label", "FR Etiket")} value={data.stat1LabelFr} onChange={(e) => setData({...data, stat1LabelFr: e.target.value})} className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">{t("Stat 2", "İstatistik 2")}</h3>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Value", "Değer")}</label>
              <input 
                type="text" value={data.stat2Value}
                onChange={(e) => setData({...data, stat2Value: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <input type="text" placeholder={t("EN Label", "EN Etiket")} value={data.stat2LabelEn} onChange={(e) => setData({...data, stat2LabelEn: e.target.value})} className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm" />
              <input type="text" placeholder={t("ES Label", "ES Etiket")} value={data.stat2LabelEs} onChange={(e) => setData({...data, stat2LabelEs: e.target.value})} className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm" />
              <input type="text" placeholder={t("FR Label", "FR Etiket")} value={data.stat2LabelFr} onChange={(e) => setData({...data, stat2LabelFr: e.target.value})} className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-100 pt-8">
          {/* English */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">EN</span>
              <h3 className="text-sm font-semibold text-gray-900">{t("English (Base)", "İngilizce (Temel)")}</h3>
            </div>
            <input type="text" placeholder={t("Badge", "Rozet")} value={data.badgeEn} onChange={(e) => setData({...data, badgeEn: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            <input type="text" placeholder={t("Title", "Başlık")} value={data.titleEn} onChange={(e) => setData({...data, titleEn: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            <textarea placeholder={t("Description", "Açıklama")} value={data.descEn} onChange={(e) => setData({...data, descEn: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[120px]" />
          </div>

          {/* Spanish */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <span className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-600">ES</span>
              <h3 className="text-sm font-semibold text-gray-900">{t("Spanish", "İspanyolca")}</h3>
            </div>
            <input type="text" placeholder={t("Badge", "Rozet")} value={data.badgeEs} onChange={(e) => setData({...data, badgeEs: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            <input type="text" placeholder={t("Title", "Başlık")} value={data.titleEs} onChange={(e) => setData({...data, titleEs: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            <textarea placeholder={t("Description", "Açıklama")} value={data.descEs} onChange={(e) => setData({...data, descEs: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[120px]" />
          </div>

          {/* French */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <span className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-xs font-bold text-purple-600">FR</span>
              <h3 className="text-sm font-semibold text-gray-900">{t("French", "Fransızca")}</h3>
            </div>
            <input type="text" placeholder={t("Badge", "Rozet")} value={data.badgeFr} onChange={(e) => setData({...data, badgeFr: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            <input type="text" placeholder={t("Title", "Başlık")} value={data.titleFr} onChange={(e) => setData({...data, titleFr: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            <textarea placeholder={t("Description", "Açıklama")} value={data.descFr} onChange={(e) => setData({...data, descFr: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[120px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
