import { useState } from "react";
import { Download, Trash2, Mail } from "lucide-react";
import { useAppContext } from "../../lib/store";

export default function NewsletterManager() {
  const { newsletterLeads, deleteNewsletterLead, adminLang } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");

  const t = (en: string, tr: string) => adminLang === 'tr' ? tr : en;

  const filteredLeads = newsletterLeads.filter(lead => 
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    const headers = ["ID", "Email", "Date"];
    const csvContent = [
      headers.join(","),
      ...filteredLeads.map(lead => [
        lead.id,
        lead.email,
        new Date(lead.date).toLocaleDateString()
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg text-primary">
            <Mail size={20} />
          </div>
          <h2 className="font-semibold text-gray-900">{t("Newsletter Subscribers", "Bülten Aboneleri")}</h2>
          <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2.5 py-1 rounded-full">
            {filteredLeads.length}
          </span>
        </div>
        
        <div className="flex w-full sm:w-auto gap-3">
          <input
            type="text"
            placeholder={t("Search emails...", "E-posta ara...")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow sm:w-64 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
          />
          <button 
            onClick={handleExportCSV}
            disabled={filteredLeads.length === 0}
            className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Download size={16} />
            <span className="hidden sm:inline">{t("Export CSV", "CSV İndir")}</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">{t("Email", "E-posta")}</th>
              <th className="px-6 py-4">{t("Date", "Tarih")}</th>
              <th className="px-6 py-4 text-right">{t("Actions", "İşlemler")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-gray-500">#{lead.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{lead.email}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(lead.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => {
                        if(window.confirm(t("Are you sure you want to delete this subscriber?", "Bu aboneyi silmek istediğinizden emin misiniz?"))) {
                          deleteNewsletterLead(lead.id);
                        }
                      }}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      title={t("Delete", "Sil")}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  <Mail size={32} className="mx-auto mb-3 text-gray-300" />
                  <p>{searchTerm ? t("No subscribers found matching your search.", "Aramanızla eşleşen abone bulunamadı.") : t("No subscribers yet.", "Henüz abone yok.")}</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
