import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, Cpu, CheckCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '10:00', risk: 12 }, { time: '10:05', risk: 18 },
  { time: '10:10', risk: 15 }, { time: '10:15', risk: 35 },
  { time: '10:20', risk: 25 }, { time: '10:25', risk: 65 }, // anomaly
  { time: '10:30', risk: 42 }, { time: '10:35', risk: 20 }
];

const txMockData = [
  { id: 'TX-8821', partner: 'LogisX Energy', amount: '$124,000.00', status: 'safe', aiScore: 12 },
  { id: 'TX-8822', partner: 'Global Manuf.', amount: '$45,500.00', status: 'safe', aiScore: 8 },
  { id: 'TX-8823', partner: 'Neo Supply', amount: '$2,100,000.00', status: 'flagged', aiScore: 89 },
  { id: 'TX-8824', partner: 'Apex Corp', amount: '$12,400.00', status: 'warning', aiScore: 45 },
];

export default function Dashboard() {
  const [txs, setTxs] = useState(txMockData);

  // Mock real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      const isAnomaly = Math.random() > 0.8;
      const newTx = {
        id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
        partner: ['LogisX Energy', 'Global Manuf.', 'Neo Supply', 'Apex Corp', 'CyberLog'][Math.floor(Math.random() * 5)],
        amount: `$${(Math.random() * 500000).toLocaleString('en-US', {minimumFractionDigits: 2})}`,
        status: isAnomaly ? 'flagged' : (Math.random() > 0.7 ? 'warning' : 'safe'),
        aiScore: isAnomaly ? Math.floor(75 + Math.random() * 20) : Math.floor(5 + Math.random() * 50)
      };
      setTxs(prev => [newTx, ...prev.slice(0, 4)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Real-Time Monitor</h1>
          <p className="text-sm text-textMuted mt-1">Live AI transaction analysis and blockchain logging.</p>
        </div>
        <div className="flex space-x-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
            <Cpu className="w-3 h-3 mr-1" /> AI Engine v2.4 Active
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Processed Today', value: '142,593', icon: Activity, color: 'text-primary', bg: 'bg-primary/10' },
          { title: 'Anomalies Detected', value: '24', icon: ShieldAlert, color: 'text-danger', bg: 'bg-danger/10' },
          { title: 'Blockchain Verified', value: '100%', icon: CheckCircle, color: 'text-success', bg: 'bg-success/10' },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="p-6 rounded-2xl bg-surface border border-slate-700/50 flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-medium text-textMuted mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-surface p-6 rounded-2xl border border-slate-700/50">
          <h2 className="text-lg font-semibold text-white mb-4">AI Risk Score Trend</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2e303a" vertical={false} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A233A', borderColor: '#2e303a', color: '#f8fafc' }}
                  itemStyle={{ color: '#ef4444' }}
                />
                <Area type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorRisk)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Feed */}
        <div className="bg-surface p-6 rounded-2xl border border-slate-700/50 flex flex-col">
          <h2 className="text-lg font-semibold text-white mb-4 flex justify-between items-center">
            Live Stream
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
          </h2>
          <div className="flex-1 overflow-hidden space-y-3">
            {txs.map((tx,) => (
              <motion.div 
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key={tx.id}
                className="p-4 rounded-xl border border-slate-700/30 bg-slate-800/30 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-white">{tx.partner}</p>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                      tx.status === 'safe' ? 'bg-success/20 text-success' :
                      tx.status === 'warning' ? 'bg-warning/20 text-warning' :
                      'bg-danger/20 text-danger'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                  <p className="text-xs text-textMuted mt-1">{tx.id} • {tx.amount}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-textMuted mb-0.5">AI Score</p>
                  <p className={`text-sm font-bold ${
                    tx.aiScore > 75 ? 'text-danger' : tx.aiScore > 40 ? 'text-warning' : 'text-success'
                  }`}>{tx.aiScore}/100</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
