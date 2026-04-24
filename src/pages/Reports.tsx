import { FileText, Download, TrendingUp, ShieldCheck } from 'lucide-react';

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Compliance Reports</h1>
          <p className="text-sm text-textMuted mt-1">Generate automated audit and regulatory reports (OJK, BI).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "OJK Fraud Compliance Q1", date: "April 24, 2026", type: "PDF", icon: ShieldCheck, color: "text-primary", bg: "bg-primary/10" },
          { title: "Bank Indonesia Risk Index", date: "April 20, 2026", type: "CSV", icon: TrendingUp, color: "text-success", bg: "bg-success/10" },
          { title: "Internal Audit Trail - March", date: "March 31, 2026", type: "PDF", icon: FileText, color: "text-warning", bg: "bg-warning/10" }
        ].map((report, i) => (
          <div key={i} className="bg-surface border border-slate-700/50 rounded-2xl p-6 flex flex-col items-center text-center group hover:border-primary/50 transition-colors">
            <div className={`w-16 h-16 rounded-full ${report.bg} flex items-center justify-center mb-4`}>
              <report.icon className={`w-8 h-8 ${report.color}`} />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{report.title}</h3>
            <p className="text-sm text-textMuted mb-6">Generated on {report.date}</p>
            
            <button className="w-full flex items-center justify-center px-4 py-2 bg-slate-800 hover:bg-primary hover:text-white text-slate-300 rounded-lg transition-colors font-medium text-sm border border-slate-700 group-hover:border-primary">
              <Download className="w-4 h-4 mr-2" /> Download {report.type}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
