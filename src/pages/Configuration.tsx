import React from 'react';
import { Settings, Save, Link as LinkIcon, Database, Key } from 'lucide-react';

export default function Configuration() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Configuration</h1>
          <p className="text-sm text-textMuted mt-1">Manage ERP connections, AI parameters, and Blockchain settings.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
          <Save className="w-4 h-4 mr-2" /> Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {/* API Connector Setting */}
        <div className="bg-surface border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mr-4">
              <Database className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">ERP API Connector</h2>
              <p className="text-sm text-textMuted">Connect your internal systems to TrustChain AI.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">ERP System Type</label>
              <select className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-primary">
                <option>SAP S/4HANA</option>
                <option>Oracle NetSuite</option>
                <option>Microsoft Dynamics</option>
                <option>Custom REST API</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Endpoint URL</label>
              <input type="text" defaultValue="https://erp.internal.company.com/api/v2/transactions" className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-primary" />
            </div>
          </div>
        </div>

        {/* AI Parameters */}
        <div className="bg-surface border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mr-4">
              <Key className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">AI Risk Parameters</h2>
              <p className="text-sm text-textMuted">Tune the sensitivity of the AI fraud detection engine.</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-sm font-medium text-slate-300">Volume Anomaly Sensitivity</label>
                <span className="text-sm text-accent">High (85%)</span>
              </div>
              <input type="range" min="0" max="100" defaultValue="85" className="w-full accent-accent" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-sm font-medium text-slate-300">Geographic Deviation Threshold</label>
                <span className="text-sm text-warning">Medium (50%)</span>
              </div>
              <input type="range" min="0" max="100" defaultValue="50" className="w-full accent-warning" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
