import { useState, useEffect } from "react";
import { Wand2, Save } from "lucide-react";
import { translateText } from "../../lib/gemini";
import { useAppContext, GlobalData } from "../../lib/store";

export default function GlobalManager() {
  const { globalData, updateGlobal, adminLang } = useAppContext();
  const [data, setData] = useState<GlobalData>(globalData);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const t = (en: string, tr: string) => adminLang === 'tr' ? tr : en;

  useEffect(() => {
    setData(globalData);
  }, [globalData]);

  const handleTranslate = async () => {
    setIsTranslating(true);
    try {
      const [
        menu1Translations,
        menu2Translations,
        menu3Translations,
        menu4Translations
      ] = await Promise.all([
        translateText(data.menu1En),
        translateText(data.menu2En),
        translateText(data.menu3En),
        translateText(data.menu4En)
      ]);
      
      setData(prev => ({
        ...prev,
        menu1Es: menu1Translations.es || prev.menu1Es,
        menu1Fr: menu1Translations.fr || prev.menu1Fr,
        menu2Es: menu2Translations.es || prev.menu2Es,
        menu2Fr: menu2Translations.fr || prev.menu2Fr,
        menu3Es: menu3Translations.es || prev.menu3Es,
        menu3Fr: menu3Translations.fr || prev.menu3Fr,
        menu4Es: menu4Translations.es || prev.menu4Es,
        menu4Fr: menu4Translations.fr || prev.menu4Fr,
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
      await updateGlobal(data);
    } catch (error: any) {
      alert("Kaydetme başarısız: " + error.message);
    } finally {
      setTimeout(() => setIsSaving(false), 1000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h2 className="font-semibold text-gray-900">{t("Edit Global Settings", "Genel Ayarları Düzenle")}</h2>
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
        {/* Logo Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            {t("Logo Settings", "Logo Ayarları")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Logo Text", "Logo Metni")}</label>
              <input 
                type="text" 
                value={data.logoText}
                onChange={(e) => setData({...data, logoText: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Logo Image URL (Optional)", "Logo Görsel URL (Opsiyonel)")}</label>
              <input 
                type="text" 
                value={data.logoUrl}
                onChange={(e) => setData({...data, logoUrl: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Logo Link", "Logo Bağlantısı")}</label>
              <input 
                type="text" 
                value={data.logoLink}
                onChange={(e) => setData({...data, logoLink: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="/"
              />
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Discount Code Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            {t("Discount Settings", "İndirim Ayarları")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Discount Code", "İndirim Kodu")}</label>
              <input 
                type="text" 
                value={data.discountCode}
                onChange={(e) => setData({...data, discountCode: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-mono uppercase"
                placeholder="WELCOME20"
              />
              <p className="text-xs text-gray-400">
                {t("This code will be shown to users after they fill out the discount form.", "Bu kod, kullanıcılar indirim formunu doldurduktan sonra gösterilecektir.")}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Redirect Link", "Yönlendirme Linki")}</label>
              <input 
                type="text" 
                value={data.discountLink}
                onChange={(e) => setData({...data, discountLink: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="#products"
              />
              <p className="text-xs text-gray-400">
                {t("Where the 'Continue Shopping' button redirects to.", "'Alışverişe Devam Et' butonunun yönlendireceği link.")}
              </p>
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Menu Section */}
        <div className="space-y-4 border-t border-gray-100 pt-8">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            {t("Navigation Menu", "Navigasyon Menüsü")}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* English & Links */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">EN</span>
                <h3 className="text-sm font-semibold text-gray-900">{t("English (Base) & Links", "İngilizce (Temel) & Bağlantılar")}</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Menu 1", "Menü 1")}</label>
                  <div className="flex gap-2">
                    <input type="text" value={data.menu1En} onChange={(e) => setData({...data, menu1En: e.target.value})} placeholder="Text" className="w-1/2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" />
                    <input type="text" value={data.menu1Link} onChange={(e) => setData({...data, menu1Link: e.target.value})} placeholder="Link (e.g. #home)" className="w-1/2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Menu 2", "Menü 2")}</label>
                  <div className="flex gap-2">
                    <input type="text" value={data.menu2En} onChange={(e) => setData({...data, menu2En: e.target.value})} placeholder="Text" className="w-1/2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" />
                    <input type="text" value={data.menu2Link} onChange={(e) => setData({...data, menu2Link: e.target.value})} placeholder="Link (e.g. #products)" className="w-1/2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Menu 3", "Menü 3")}</label>
                  <div className="flex gap-2">
                    <input type="text" value={data.menu3En} onChange={(e) => setData({...data, menu3En: e.target.value})} placeholder="Text" className="w-1/2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" />
                    <input type="text" value={data.menu3Link} onChange={(e) => setData({...data, menu3Link: e.target.value})} placeholder="Link (e.g. #reviews)" className="w-1/2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Menu 4", "Menü 4")}</label>
                  <div className="flex gap-2">
                    <input type="text" value={data.menu4En} onChange={(e) => setData({...data, menu4En: e.target.value})} placeholder="Text" className="w-1/2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" />
                    <input type="text" value={data.menu4Link} onChange={(e) => setData({...data, menu4Link: e.target.value})} placeholder="Link (e.g. #about)" className="w-1/2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" />
                  </div>
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
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Menu 1", "Menü 1")}</label>
                  <input type="text" value={data.menu1Es} onChange={(e) => setData({...data, menu1Es: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Menu 2", "Menü 2")}</label>
                  <input type="text" value={data.menu2Es} onChange={(e) => setData({...data, menu2Es: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Menu 3", "Menü 3")}</label>
                  <input type="text" value={data.menu3Es} onChange={(e) => setData({...data, menu3Es: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Menu 4", "Menü 4")}</label>
                  <input type="text" value={data.menu4Es} onChange={(e) => setData({...data, menu4Es: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" />
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
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Menu 1", "Menü 1")}</label>
                  <input type="text" value={data.menu1Fr} onChange={(e) => setData({...data, menu1Fr: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Menu 2", "Menü 2")}</label>
                  <input type="text" value={data.menu2Fr} onChange={(e) => setData({...data, menu2Fr: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Menu 3", "Menü 3")}</label>
                  <input type="text" value={data.menu3Fr} onChange={(e) => setData({...data, menu3Fr: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t("Menu 4", "Menü 4")}</label>
                  <input type="text" value={data.menu4Fr} onChange={(e) => setData({...data, menu4Fr: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
