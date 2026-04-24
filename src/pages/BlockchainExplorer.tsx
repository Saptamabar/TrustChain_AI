import React, { useState } from 'react';
import { Search, Link as LinkIcon, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlockchainExplorer() {
  const [hash, setHash] = useState('');
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hash) return;
    setLoading(true);
    setSearched(false);
    setTimeout(() => {
      setLoading(false);
      setSearched(true);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center py-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
          <LinkIcon className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Immutable Audit Trail</h1>
        <p className="text-textMuted mt-2 max-w-lg mx-auto">Verify any transaction on the TrustChain network. Our distributed ledger guarantees tamper-proof records for your auditors.</p>
      </div>

      <form onSubmit={handleSearch} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-surface border border-slate-700 p-2 rounded-xl">
          <Search className="w-6 h-6 ml-3 text-slate-400" />
          <input 
            type="text" 
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            placeholder="Search by Txn Hash, Block Number, or Address..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-white px-4 placeholder-slate-500"
          />
          <button 
            type="submit"
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </div>
      </form>

      {loading && (
        <div className="py-20 flex flex-col items-center justify-center text-primary">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="animate-pulse">Querying TrustChain Nodes...</p>
        </div>
      )}

      {searched && !loading && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-slate-700/50 rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-slate-700/50 flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center">
                <CheckCircle className="w-6 h-6 text-success mr-2" />
                Transaction Verified
              </h2>
              <p className="text-sm text-textMuted mt-1 break-all">Hash: {hash || '0x7f8b...e9a4'}</p>
            </div>
            <span className="px-3 py-1 bg-success/20 text-success border border-success/30 rounded-full text-xs font-bold uppercase tracking-wide">
              Success
            </span>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-textMuted mb-1">Status</p>
                <p className="text-white font-medium flex items-center">
                  <CheckCircle className="w-4 h-4 text-success mr-2" /> Confirmed (1,402 Block Confirmations)
                </p>
              </div>
              <div>
                <p className="text-xs text-textMuted mb-1">Timestamp</p>
                <p className="text-white font-medium flex items-center">
                  <Clock className="w-4 h-4 text-slate-400 mr-2" /> 2026-04-24 10:25:34 UTC
                </p>
              </div>
              <div>
                <p className="text-xs text-textMuted mb-1">From (ERP Backend)</p>
                <p className="text-primary font-mono text-sm break-all">0x4D2B8A043C0E56A9D...2B</p>
              </div>
              <div>
                <p className="text-xs text-textMuted mb-1">To (Smart Contract)</p>
                <p className="text-primary font-mono text-sm break-all">0x99F1B8A043C0E56A9...1F</p>
              </div>
            </div>
            
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <h3 className="text-sm font-semibold text-white mb-3">AI Attestation Payload</h3>
              <pre className="text-xs text-accent font-mono overflow-x-auto whitespace-pre-wrap">
{`{
  "txId": "TX-8823",
  "aiScore": 89,
  "flags": ["Volume Anomaly"],
  "model_version": "v2.4.1",
  "signature": "0xfa89...11"
}`}
              </pre>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
