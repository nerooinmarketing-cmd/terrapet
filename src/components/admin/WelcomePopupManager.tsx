import React, { useState } from 'react';
import { Save, Wand2, Image as ImageIcon, Video } from 'lucide-react';
import { useAppContext } from '../../lib/store';
import { translateText } from '../../lib/gemini';

export default function WelcomePopupManager() {
  const { welcomePopupData, updateWelcomePopup, adminLang } = useAppContext();
  const [data, setData] = useState(welcomePopupData);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const t = (en: string, tr: string) => adminLang === 'tr' ? tr : en;

  const handleTranslate = async () => {
    setIsTranslating(true);
    try {
      const [titleTranslations, descTranslations, btn1Translations, btn2Translations] = await Promise.all([
        translateText(data.titleEn),
        translateText(data.descEn),
        translateText(data.btn1TextEn),
        translateText(data.btn2TextEn)
      ]);
      
      setData(prev => ({
        ...prev,
        titleEs: titleTranslations.es || prev.titleEs,
        titleFr: titleTranslations.fr || prev.titleFr,
        descEs: descTranslations.es || prev.descEs,
        descFr: descTranslations.fr || prev.descFr,
        btn1TextEs: btn1Translations.es || prev.btn1TextEs,
        btn1TextFr: btn1Translations.fr || prev.btn1TextFr,
        btn2TextEs: btn2Translations.es || prev.btn2TextEs,
        btn2TextFr: btn2Translations.fr || prev.btn2TextFr,
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
      await updateWelcomePopup(data);
      // alert("Başarıyla kaydedildi!"); // Optional: Can uncomment if they want an alert, but the button text changes to "Saved!" anyway.
    } catch (error: any) {
      alert("Kaydetme başarısız: " + error.message);
    } finally {
      setTimeout(() => setIsSaving(false), 1000);
    }
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    return url;
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{t("Welcome Popup Settings", "Açılış Popup Ayarları")}</h2>
        <div className="flex gap-3">
          <button 
            onClick={handleTranslate}
            disabled={isTranslating}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-medium hover:bg-indigo-100 transition-colors disabled:opacity-50"
          >
            <Wand2 size={18} />
            {isTranslating ? t("Translating...", "Çevriliyor...") : t("Auto Translate", "Otomatik Çevir")}
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary-light transition-colors"
          >
            <Save size={18} />
            {isSaving ? t("Saved!", "Kaydedildi!") : t("Save Changes", "Değişiklikleri Kaydet")}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-8">
        
        {/* Status Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
          <div>
            <h3 className="font-bold text-gray-900">{t("Popup Status", "Popup Durumu")}</h3>
            <p className="text-sm text-gray-500">{t("Enable or disable the welcome popup on the landing page.", "Açılış sayfasındaki popup'ı açın veya kapatın.")}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={data.isActive}
              onChange={(e) => setData({...data, isActive: e.target.checked})}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        {/* Media */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{t("Media", "Medya")}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <ImageIcon size={16} className="text-gray-400" /> {t("Image URL", "Görsel URL")}
              </label>
              <input 
                type="text" 
                value={data.imageUrl}
                onChange={(e) => setData({...data, imageUrl: e.target.value})}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                placeholder="https://images.unsplash.com/..."
              />
              {data.imageUrl && !data.videoUrl && (
                <div className="mt-2 aspect-video rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                  <img src={data.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <p className="text-[10px] text-gray-400">{t("Used if Video URL is empty.", "Video URL boşsa kullanılır.")}</p>
            </div>

            {/* Video */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video size={16} className="text-gray-400" /> {t("Video URL or File", "Video URL veya Dosya")}
                </div>
                <label className="cursor-pointer px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded hover:bg-primary/20 transition-colors">
                  {t("Browse MP4", "MP4 Gözat")}
                  <input 
                    type="file" 
                    accept="video/mp4" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 1024 * 1024) {
                          alert(t("File too large! Maximum size is 1MB. For larger videos, please use a YouTube link.", "Dosya çok büyük! Maksimum boyut 1MB. Daha büyük videolar için lütfen YouTube linki kullanın."));
                          return;
                        }
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setData({...data, videoUrl: reader.result as string});
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </label>
              <input 
                type="text" 
                value={data.videoUrl}
                onChange={(e) => setData({...data, videoUrl: e.target.value})}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                placeholder="https://youtube.com/watch?v=... or paste MP4 link"
              />
              {data.videoUrl && (
                <div className="mt-2 aspect-[9/16] md:aspect-video rounded-lg overflow-hidden bg-black border border-gray-200 max-h-[300px] flex items-center justify-center">
                  {data.videoUrl.startsWith('data:video/') || data.videoUrl.toLowerCase().includes('.mp4') || data.videoUrl.toLowerCase().includes('.mov') ? (
                    <video 
                      src={data.videoUrl} 
                      className="w-full h-full object-contain" 
                      controls 
                    />
                  ) : (
                    <iframe
                      className="w-full h-full"
                      src={getEmbedUrl(data.videoUrl)}
                      title="Preview"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    ></iframe>
                  )}
                </div>
              )}
              <p className="text-[10px] text-gray-400">{t("Takes priority over Image URL. Supports YouTube and MP4.", "Görsel URL'den önceliklidir. YouTube ve MP4 destekler.")}</p>
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Content */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{t("Content", "İçerik")}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* English */}
            <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
              <span className="text-xs font-bold bg-gray-200 text-gray-600 px-2 py-1 rounded uppercase tracking-widest">{t("English", "İngilizce")}</span>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("Title", "Başlık")}</label>
                <input type="text" value={data.titleEn} onChange={(e) => setData({...data, titleEn: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("Description", "Açıklama")}</label>
                <textarea value={data.descEn} onChange={(e) => setData({...data, descEn: e.target.value})} rows={3} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("Button 1 (Amazon)", "Buton 1 (Amazon)")}</label>
                <input type="text" value={data.btn1TextEn} onChange={(e) => setData({...data, btn1TextEn: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("Button 2 (Explore)", "Buton 2 (Gözat)")}</label>
                <input type="text" value={data.btn2TextEn} onChange={(e) => setData({...data, btn2TextEn: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm" />
              </div>
            </div>

            {/* Spanish */}
            <div className="space-y-4">
              <span className="text-xs font-bold bg-orange-100 text-orange-700 px-2 py-1 rounded uppercase tracking-widest">{t("Spanish", "İspanyolca")}</span>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("Title", "Başlık")}</label>
                <input type="text" value={data.titleEs} onChange={(e) => setData({...data, titleEs: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("Description", "Açıklama")}</label>
                <textarea value={data.descEs} onChange={(e) => setData({...data, descEs: e.target.value})} rows={3} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("Button 1 (Amazon)", "Buton 1 (Amazon)")}</label>
                <input type="text" value={data.btn1TextEs} onChange={(e) => setData({...data, btn1TextEs: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("Button 2 (Explore)", "Buton 2 (Gözat)")}</label>
                <input type="text" value={data.btn2TextEs} onChange={(e) => setData({...data, btn2TextEs: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm" />
              </div>
            </div>

            {/* French */}
            <div className="space-y-4">
              <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded uppercase tracking-widest">{t("French", "Fransızca")}</span>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("Title", "Başlık")}</label>
                <input type="text" value={data.titleFr} onChange={(e) => setData({...data, titleFr: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("Description", "Açıklama")}</label>
                <textarea value={data.descFr} onChange={(e) => setData({...data, descFr: e.target.value})} rows={3} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("Button 1 (Amazon)", "Buton 1 (Amazon)")}</label>
                <input type="text" value={data.btn1TextFr} onChange={(e) => setData({...data, btn1TextFr: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("Button 2 (Explore)", "Buton 2 (Gözat)")}</label>
                <input type="text" value={data.btn2TextFr} onChange={(e) => setData({...data, btn2TextFr: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm" />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Links */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{t("Links", "Bağlantılar")}</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("Button 1 URL (Amazon Store)", "Buton 1 URL (Amazon Mağazası)")}</label>
            <input 
              type="text" 
              value={data.btn1Url}
              onChange={(e) => setData({...data, btn1Url: e.target.value})}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
              placeholder="https://amazon.com/..."
            />
          </div>
        </div>

      </div>
    </div>
  );
}
