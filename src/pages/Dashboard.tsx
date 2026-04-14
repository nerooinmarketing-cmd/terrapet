import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Home, 
  Package, 
  Info, 
  Star, 
  PanelBottom, 
  Settings,
  Wand2,
  Image as ImageIcon,
  Video,
  Save,
  Globe,
  Plus,
  Trash2,
  Users,
  Mail,
  Upload
} from "lucide-react";
import { translateText } from "../lib/gemini";
import { useAppContext, Product } from "../lib/store";
import HomeManager from "../components/admin/HomeManager";
import AboutManager from "../components/admin/AboutManager";
import ReviewsManager from "../components/admin/ReviewsManager";
import FooterManager from "../components/admin/FooterManager";
import GlobalManager from "../components/admin/GlobalManager";
import LeadsManager from "../components/admin/LeadsManager";
import NewsletterManager from "../components/admin/NewsletterManager";
import WelcomePopupManager from "../components/admin/WelcomePopupManager";

type Tab = "global" | "home" | "products" | "about" | "reviews" | "footer" | "leads" | "newsletter" | "welcomePopup";

export default function Dashboard() {
  const { adminLang, setAdminLang, user, login, logout, isAuthReady, isLoggingIn } = useAppContext();
  const [activeTab, setActiveTab] = useState<Tab>("global");

  const t = (en: string, tr: string) => adminLang === 'tr' ? tr : en;

  if (!isAuthReady) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const isAdmin = user?.email === "nerooinmarketing@gmail.com";

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-primary p-3 rounded-xl text-white">
              <LayoutDashboard size={28} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t("Admin Login", "Yönetici Girişi")}</h1>
          <div className="text-gray-500 mb-8">
            {!user ? (
              <p>{t("Please login with your Google account to continue.", "Devam etmek için lütfen Google hesabınızla giriş yapın.")}</p>
            ) : !isAdmin ? (
              <div className="space-y-2">
                <p className="text-red-500 font-medium">{t("Access Denied", "Erişim Engellendi")}</p>
                <p className="text-sm">
                  {t("Logged in as:", "Giriş yapılan hesap:")} <span className="font-bold text-gray-700">{user.email}</span>
                </p>
                <p className="text-xs italic">
                  {t("Only 'nerooinmarketing@gmail.com' has admin access.", "Sadece 'nerooinmarketing@gmail.com' hesabı yetkilidir.")}
                </p>
              </div>
            ) : (
              <p>{t("Redirecting...", "Yönlendiriliyor...")}</p>
            )}
          </div>
          
          {!user ? (
            <button 
              onClick={login}
              disabled={isLoggingIn}
              className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-light transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoggingIn ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <Globe size={20} />
              )}
              {isLoggingIn ? t("Logging in...", "Giriş yapılıyor...") : t("Login with Google", "Google ile Giriş Yap")}
            </button>
          ) : (
            <button 
              onClick={logout}
              className="w-full bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
            >
              {t("Logout", "Çıkış Yap")}
            </button>
          )}
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "global", label: t("Global Settings", "Genel Ayarlar"), icon: Settings },
    { id: "welcomePopup", label: t("Welcome Popup", "Açılış Popup"), icon: LayoutDashboard },
    { id: "home", label: t("Home", "Ana Sayfa"), icon: Home },
    { id: "products", label: t("Products", "Ürünler"), icon: Package },
    { id: "about", label: t("About Us", "Hakkımızda"), icon: Info },
    { id: "reviews", label: t("Reviews", "Yorumlar"), icon: Star },
    { id: "footer", label: t("Footer", "Alt Bilgi"), icon: PanelBottom },
    { id: "leads", label: t("Discount Leads", "İndirim Talepleri"), icon: Users },
    { id: "newsletter", label: t("Newsletter", "Bülten"), icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg text-white">
              <LayoutDashboard size={20} />
            </div>
            <span className="font-bold text-gray-900 tracking-tight">{t("Admin Panel", "Yönetim Paneli")}</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-primary/5 text-primary" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon size={18} className={isActive ? "text-primary" : "text-gray-400"} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-1">
          <div className="flex items-center justify-between px-4 py-3 mb-2 bg-gray-50 rounded-xl">
            <span className="text-sm font-medium text-gray-500">{t("Language", "Dil")}</span>
            <div className="flex items-center bg-white rounded-lg p-1 shadow-sm border border-gray-100">
              <button 
                onClick={() => setAdminLang('en')}
                className={`px-2 py-1 text-xs font-bold rounded-md transition-colors ${adminLang === 'en' ? 'bg-primary text-white' : 'text-gray-400 hover:text-gray-600'}`}
              >EN</button>
              <button 
                onClick={() => setAdminLang('tr')}
                className={`px-2 py-1 text-xs font-bold rounded-md transition-colors ${adminLang === 'tr' ? 'bg-primary text-white' : 'text-gray-400 hover:text-gray-600'}`}
              >TR</button>
            </div>
          </div>
          <a href="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all">
            <Globe size={18} className="text-gray-400" />
            {t("View Live Site", "Siteyi Görüntüle")}
          </a>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
          >
            <span className="material-symbols-outlined text-red-400">logout</span>
            {t("Logout", "Çıkış Yap")}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 capitalize">
              {t(`Manage ${activeTab.replace("-", " ")}`, `${tabs.find(t => t.id === activeTab)?.label} Yönetimi`)}
            </h1>
          </header>

          {activeTab === "global" && <GlobalManager />}
          {activeTab === "welcomePopup" && <WelcomePopupManager />}
          {activeTab === "home" && <HomeManager />}
          {activeTab === "products" && <ProductsManager />}
          {activeTab === "about" && <AboutManager />}
          {activeTab === "reviews" && <ReviewsManager />}
          {activeTab === "footer" && <FooterManager />}
          {activeTab === "leads" && <LeadsManager />}
          {activeTab === "newsletter" && <NewsletterManager />}
        </div>
      </main>
    </div>
  );
}

function ProductsManager() {
  const { products, updateProduct, addProduct, deleteProduct, adminLang } = useAppContext();
  const [selectedId, setSelectedId] = useState<number>(products[0]?.id || 1);
  const [product, setProduct] = useState<Product | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const t = (en: string, tr: string) => adminLang === 'tr' ? tr : en;

  useEffect(() => {
    const found = products.find(p => p.id === selectedId);
    if (found) {
      setProduct(found);
    }
  }, [selectedId, products]);

  const handleTranslate = async () => {
    if (!product) return;
    setIsTranslating(true);
    try {
      const [
        titleTranslations,
        descTranslations,
        benefitsTranslations,
        compositionTranslations,
        directionsTranslations
      ] = await Promise.all([
        translateText(product.titleEn),
        translateText(product.descEn),
        translateText(product.benefitsEn || ""),
        translateText(product.compositionEn || ""),
        translateText(product.directionsEn || "")
      ]);
      
      setProduct(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          titleEs: titleTranslations.es || prev.titleEs,
          titleFr: titleTranslations.fr || prev.titleFr,
          descEs: descTranslations.es || prev.descEs,
          descFr: descTranslations.fr || prev.descFr,
          benefitsEs: benefitsTranslations.es || prev.benefitsEs,
          benefitsFr: benefitsTranslations.fr || prev.benefitsFr,
          compositionEs: compositionTranslations.es || prev.compositionEs,
          compositionFr: compositionTranslations.fr || prev.compositionFr,
          directionsEs: directionsTranslations.es || prev.directionsEs,
          directionsFr: directionsTranslations.fr || prev.directionsFr,
        };
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSave = async () => {
    if (product) {
      setIsSaving(true);
      try {
        await updateProduct(product);
      } catch (error: any) {
        alert("Kaydetme başarısız: " + error.message);
      } finally {
        setTimeout(() => setIsSaving(false), 1000); // Visual feedback
      }
    }
  };

  const handleAddProduct = () => {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct: Product = {
      id: newId,
      titleEn: "New Product", titleEs: "", titleFr: "",
      descEn: "Product description", descEs: "", descFr: "",
      imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
      videoUrl: "", linkText: "Discover Benefits",
      images: [],
      benefitsEn: "", benefitsEs: "", benefitsFr: "",
      compositionEn: "", compositionEs: "", compositionFr: "",
      directionsEn: "", directionsEs: "", directionsFr: "",
      amazonLink: ""
    };
    addProduct(newProduct);
    setSelectedId(newId);
  };

  const handleDeleteProduct = () => {
    if (products.length <= 1) {
      setShowAlert(true);
      return;
    }
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    deleteProduct(selectedId);
    const remainingProducts = products.filter(p => p.id !== selectedId);
    if (remainingProducts.length > 0) {
      setSelectedId(remainingProducts[0].id);
    }
    setShowDeleteConfirm(false);
  };

  if (!product) return null;

  return (
    <div className="flex gap-6 items-start">
      {/* Product List Sidebar */}
      <div className="w-64 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-shrink-0 flex flex-col h-[calc(100vh-12rem)]">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900 text-sm">{t("All Products", "Tüm Ürünler")}</h3>
          <button 
            onClick={handleAddProduct}
            className="p-1.5 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
            title={t("Add New Product", "Yeni Ürün Ekle")}
          >
            <Plus size={16} />
          </button>
        </div>
        <div className="p-2 space-y-1 overflow-y-auto flex-1">
          {products.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all truncate ${
                selectedId === p.id 
                  ? "bg-primary text-white" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {p.titleEn}
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="font-semibold text-gray-900">{t("Edit Product", "Ürünü Düzenle")}: {product.titleEn}</h2>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleDeleteProduct}
              className="text-sm font-medium text-red-600 bg-red-50 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2"
            >
              <Trash2 size={16} />
              {t("Delete", "Sil")}
            </button>
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
        {/* Media Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{t("Media", "Medya")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <ImageIcon size={16} className="text-gray-400" /> {t("Image URL", "Görsel URL")}
              </label>
              <input 
                type="text" 
                value={product.imageUrl}
                onChange={(e) => setProduct({...product, imageUrl: e.target.value})}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                placeholder="https://..."
              />
              {product.imageUrl && (
                <div className="mt-2 aspect-video rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                  <img src={product.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Video size={16} className="text-gray-400" /> {t("Video URL or Upload", "Video URL veya Yükle")}
              </label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={product.videoUrl}
                  onChange={(e) => setProduct({...product, videoUrl: e.target.value})}
                  className="flex-grow px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                  placeholder="https://..."
                />
                <label className="cursor-pointer bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Upload size={16} />
                  <span className="hidden sm:inline">{t("Browse", "Gözat")}</span>
                  <input 
                    type="file" 
                    accept="video/*" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 5 * 1024 * 1024) {
                          alert(t("Video size must be less than 5MB for local storage.", "Yerel depolama için video boyutu 5MB'dan küçük olmalıdır."));
                          return;
                        }
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setProduct({...product, videoUrl: reader.result as string});
                        };
                        reader.readAsDataURL(file);
                      }
                    }} 
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Content Section */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{t("Content", "İçerik")}</h3>
          
          {/* English (Base) */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold bg-gray-200 text-gray-600 px-2 py-1 rounded uppercase tracking-widest">{t("English (Base)", "İngilizce (Temel)")}</span>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("Product Title", "Ürün Başlığı")}</label>
                <input 
                  type="text" 
                  value={product.titleEn}
                  onChange={(e) => setProduct({...product, titleEn: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("Description", "Açıklama")}</label>
                <textarea 
                  value={product.descEn}
                  onChange={(e) => setProduct({...product, descEn: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* Translations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Spanish */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-orange-100 text-orange-700 px-2 py-1 rounded uppercase tracking-widest">{t("Spanish", "İspanyolca")}</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("Title", "Başlık")}</label>
                <input 
                  type="text" 
                  value={product.titleEs}
                  onChange={(e) => setProduct({...product, titleEs: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("Description", "Açıklama")}</label>
                <textarea 
                  value={product.descEs}
                  onChange={(e) => setProduct({...product, descEs: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm resize-none"
                />
              </div>
            </div>

            {/* French */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded uppercase tracking-widest">{t("French", "Fransızca")}</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("Title", "Başlık")}</label>
                <input 
                  type="text" 
                  value={product.titleFr}
                  onChange={(e) => setProduct({...product, titleFr: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("Description", "Açıklama")}</label>
                <textarea 
                  value={product.descFr}
                  onChange={(e) => setProduct({...product, descFr: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm resize-none"
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Popup Details Section */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{t("Popup Details", "Açılır Pencere Detayları")}</h3>
            
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <ImageIcon size={16} className="text-gray-400" /> {t("Gallery Images (5 URLs)", "Galeri Görselleri (5 URL)")}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[0, 1, 2, 3, 4].map((index) => (
                  <div key={index} className="space-y-2">
                    <input 
                      type="text" 
                      value={product.images?.[index] || ''}
                      onChange={(e) => {
                        const newImages = [...(product.images || [])];
                        newImages[index] = e.target.value;
                        setProduct({...product, images: newImages});
                      }}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-xs"
                      placeholder={`Image ${index + 1} URL`}
                    />
                    {product.images?.[index] && (
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                        <img src={product.images[index]} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("Amazon Link", "Amazon Linki")}</label>
              <input 
                type="text" 
                value={product.amazonLink || ''}
                onChange={(e) => setProduct({...product, amazonLink: e.target.value})}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                placeholder="https://amazon.com/..."
              />
            </div>

            {/* Popup Content (English) */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold bg-gray-200 text-gray-600 px-2 py-1 rounded uppercase tracking-widest">{t("Popup Content (English)", "Açılır Pencere İçeriği (İngilizce)")}</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("Benefits (One per line)", "Faydalar (Her satıra bir tane)")}</label>
                <textarea 
                  value={product.benefitsEn || ''}
                  onChange={(e) => setProduct({...product, benefitsEn: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("Composition", "İçerik/Bileşim")}</label>
                <textarea 
                  value={product.compositionEn || ''}
                  onChange={(e) => setProduct({...product, compositionEn: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("Directions (One per line)", "Kullanım Talimatları (Her satıra bir tane)")}</label>
                <textarea 
                  value={product.directionsEn || ''}
                  onChange={(e) => setProduct({...product, directionsEn: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm resize-none"
                />
              </div>
            </div>
          </div>

          </div>
        </div>
      </div>

      {/* Modals */}
      {showAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("Warning", "Uyarı")}</h3>
            <p className="text-gray-600 mb-6">{t("You must have at least one product.", "En az bir ürününüz olmalı.")}</p>
            <div className="flex justify-end">
              <button 
                onClick={() => setShowAlert(false)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-medium text-sm"
              >
                {t("OK", "Tamam")}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("Delete Product", "Ürünü Sil")}</h3>
            <p className="text-gray-600 mb-6">{t("Are you sure you want to delete this product?", "Bu ürünü silmek istediğinize emin misiniz?")}</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium text-sm"
              >
                {t("Cancel", "İptal")}
              </button>
              <button 
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
              >
                {t("Delete", "Sil")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
