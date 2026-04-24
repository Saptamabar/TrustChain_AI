import { useState } from 'react';
import { Search, Filter, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_CASES = [
  { id: 'CASE-092', txId: 'TX-8823', date: '2026-04-24', status: 'Open', partner: 'Neo Supply', amount: '$2,100,000.00', risk: 89, type: 'Volume Anomaly' },
  { id: 'CASE-091', txId: 'TX-8110', date: '2026-04-23', status: 'In Review', partner: 'Apex Corp', amount: '$450,000.00', risk: 72, type: 'Geographic Mismatch' },
  { id: 'CASE-090', txId: 'TX-7994', date: '2026-04-22', status: 'Resolved', partner: 'LogisX Energy', amount: '$12,400.00', risk: 45, type: 'Velocity Check' },
];

export default function CaseManagement() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Alerts & Cases</h1>
          <p className="text-sm text-textMuted mt-1">Investigate AI-flagged transactions and manage risk workflows.</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search cases..." 
              className="bg-surface border border-slate-700 text-sm py-2 pl-9 pr-4 rounded-lg focus:outline-none focus:border-primary text-white"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-surface border border-slate-700 rounded-lg text-sm text-white hover:bg-surfaceHover transition-colors">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-surface border border-slate-700/50 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-textMuted">
            <thead className="bg-slate-800/50 text-xs uppercase border-b border-slate-700/50">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-300">Case ID</th>
                <th className="px-6 py-4 font-semibold text-slate-300">Transaction Info</th>
                <th className="px-6 py-4 font-semibold text-slate-300">AI Flag Reason</th>
                <th className="px-6 py-4 font-semibold text-slate-300">Risk Score</th>
                <th className="px-6 py-4 font-semibold text-slate-300">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_CASES.map((c) => (
                <tr key={c.id} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-white font-medium">{c.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-white">{c.partner}</p>
                    <p className="text-xs">{c.txId} • {c.amount}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="flex items-center text-danger">
                      <ShieldAlert className="w-3 h-3 mr-1" /> {c.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-slate-700 rounded-full h-1.5 mr-2 max-w-[60px]">
                        <div className={`h-1.5 rounded-full ${c.risk > 80 ? 'bg-danger' : 'bg-warning'}`} style={{ width: `${c.risk}%` }}></div>
                      </div>
                      <span className="text-white font-bold">{c.risk}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      c.status === 'Open' ? 'bg-danger/20 text-danger border border-danger/30' :
                      c.status === 'In Review' ? 'bg-warning/20 text-warning border border-warning/30' :
                      'bg-success/20 text-success border border-success/30'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => setSelectedCase(c.id)}
                      className="text-primary hover:text-white font-medium transition-colors"
                    >
                      Investigate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedCase && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-surface border border-slate-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative"
            >
              <h3 className="text-xl font-bold text-white mb-2">Investigation: {selectedCase}</h3>
              <p className="text-sm text-textMuted mb-6">Review AI findings and take appropriate action on this case.</p>
              
              <div className="space-y-4 mb-6">
                <div className="bg-danger/10 border border-danger/20 p-4 rounded-xl">
                  <h4 className="text-danger font-semibold text-sm mb-1 flex items-center"><ShieldAlert className="w-4 h-4 mr-1"/> AI Flag Reason</h4>
                  <p className="text-sm text-slate-300">Transaction volume is 400% higher than the historical average for this partner. Geographic mismatch detected in origin IP.</p>
                </div>
              </div>

              <div className="flex space-x-3 justify-end">
                <button 
                  onClick={() => setSelectedCase(null)}
                  className="px-4 py-2 rounded-lg border border-slate-600 text-white hover:bg-slate-700 transition-colors text-sm"
                >
                  Close
                </button>
                <button className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-medium">
                  Escalate to Compliance
                </button>
                <button className="px-4 py-2 rounded-lg bg-success text-white hover:bg-success/90 transition-colors text-sm font-medium">
                  Mark as Safe
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
