import { useState, useEffect } from "react";
import { Wand2, Save } from "lucide-react";
import { translateText } from "../../lib/gemini";
import { useAppContext, Review } from "../../lib/store";

export default function ReviewsManager() {
  const { reviews, updateReview, adminLang } = useAppContext();
  const [selectedId, setSelectedId] = useState<number>(reviews[0]?.id || 1);
  const [review, setReview] = useState<Review | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const t = (en: string, tr: string) => adminLang === 'tr' ? tr : en;

  useEffect(() => {
    const found = reviews.find(r => r.id === selectedId);
    if (found) setReview(found);
  }, [selectedId, reviews]);

  const handleTranslate = async () => {
    if (!review) return;
    setIsTranslating(true);
    try {
      const textTranslations = await translateText(review.textEn);
      
      setReview(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          textEs: textTranslations.es || prev.textEs,
          textFr: textTranslations.fr || prev.textFr,
        };
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSave = async () => {
    if (review) {
      setIsSaving(true);
      try {
        await updateReview(review);
      } catch (error: any) {
        alert("Kaydetme başarısız: " + error.message);
      } finally {
        setTimeout(() => setIsSaving(false), 1000);
      }
    }
  };

  if (!review) return null;

  return (
    <div className="flex gap-6 items-start">
      {/* Sidebar */}
      <div className="w-64 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-shrink-0">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-semibold text-gray-900 text-sm">{t("All Reviews", "Tüm Yorumlar")}</h3>
        </div>
        <div className="p-2 space-y-1">
          {reviews.map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedId(r.id)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all truncate ${
                selectedId === r.id 
                  ? "bg-primary text-white" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="font-semibold text-gray-900">{t("Edit Review", "Yorumu Düzenle")}: {review.name}</h2>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Name", "İsim")}</label>
              <input type="text" value={review.name} onChange={(e) => setReview({...review, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Location", "Konum")}</label>
              <input type="text" value={review.location} onChange={(e) => setReview({...review, location: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Initials", "Baş Harfler")}</label>
              <input type="text" value={review.initials} onChange={(e) => setReview({...review, initials: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase">{t("Rating (1-5)", "Puan (1-5)")}</label>
              <input type="number" min="1" max="5" value={review.rating} onChange={(e) => setReview({...review, rating: parseInt(e.target.value) || 5})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-100 pt-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">EN</span>
                <h3 className="text-sm font-semibold text-gray-900">{t("English", "İngilizce")}</h3>
              </div>
              <textarea value={review.textEn} onChange={(e) => setReview({...review, textEn: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[120px]" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <span className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-600">ES</span>
                <h3 className="text-sm font-semibold text-gray-900">{t("Spanish", "İspanyolca")}</h3>
              </div>
              <textarea value={review.textEs} onChange={(e) => setReview({...review, textEs: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[120px]" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <span className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-xs font-bold text-purple-600">FR</span>
                <h3 className="text-sm font-semibold text-gray-900">{t("French", "Fransızca")}</h3>
              </div>
              <textarea value={review.textFr} onChange={(e) => setReview({...review, textFr: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[120px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
