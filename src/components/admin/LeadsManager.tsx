import React from 'react';
import { useAppContext } from '../../lib/store';
import { Trash2, Download, Users } from 'lucide-react';

export default function LeadsManager() {
  const { discountLeads, deleteDiscountLead, adminLang } = useAppContext();

  const t = (en: string, tr: string) => adminLang === 'tr' ? tr : en;

  const handleExport = () => {
    if (discountLeads.length === 0) return;
    
    // Create CSV content
    const headers = ['ID', 'First Name', 'Last Name', 'Phone', 'Email', 'Country', 'City', 'Date'];
    const csvRows = [
      headers.join(','),
      ...discountLeads.map(lead => [
        lead.id,
        `"${lead.firstName}"`,
        `"${lead.lastName}"`,
        `"${lead.phone}"`,
        `"${lead.email}"`,
        `"${lead.country}"`,
        `"${lead.city}"`,
        `"${new Date(lead.date).toLocaleString()}"`
      ].join(','))
    ];
    
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "discount_leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Users size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">{t("Discount Code Leads", "İndirim Kodu Talepleri")}</h2>
            <p className="text-sm text-gray-500">{discountLeads.length} {t("total leads", "toplam kayıt")}</p>
          </div>
        </div>
        <button 
          onClick={handleExport}
          disabled={discountLeads.length === 0}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
        >
          <Download size={16} />
          {t("Export CSV", "CSV İndir")}
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {discountLeads.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
            <Users size={48} className="opacity-20" />
            <p>{t("No leads found yet.", "Henüz kayıt bulunmuyor.")}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-sm text-gray-500">
                  <th className="pb-3 font-medium">{t("Date", "Tarih")}</th>
                  <th className="pb-3 font-medium">{t("Name", "İsim")}</th>
                  <th className="pb-3 font-medium">{t("Email", "E-posta")}</th>
                  <th className="pb-3 font-medium">{t("Phone", "Telefon")}</th>
                  <th className="pb-3 font-medium">{t("Location", "Konum")}</th>
                  <th className="pb-3 font-medium text-right">{t("Actions", "İşlemler")}</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {discountLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 text-gray-500">
                      {new Date(lead.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 font-medium text-gray-900">
                      {lead.firstName} {lead.lastName}
                    </td>
                    <td className="py-4 text-gray-600">{lead.email}</td>
                    <td className="py-4 text-gray-600">{lead.phone}</td>
                    <td className="py-4 text-gray-600">{lead.city}, {lead.country}</td>
                    <td className="py-4 text-right">
                      <button 
                        onClick={() => deleteDiscountLead(lead.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
                        title={t("Delete Lead", "Kaydı Sil")}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
