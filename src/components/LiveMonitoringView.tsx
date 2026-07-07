import React, { useState, useEffect } from 'react';
import { Activity, Cpu, Wifi, Server, RefreshCw, Radio } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const liveTrafficData = [
  { time: '14:00', rx: 120, tx: 45 },
  { time: '14:05', rx: 145, tx: 55 },
  { time: '14:10', rx: 190, tx: 70 },
  { time: '14:15', rx: 240, tx: 90 },
  { time: '14:20', rx: 310, tx: 110 },
  { time: '14:25', rx: 280, tx: 95 },
  { time: '14:30', rx: 350, tx: 125 },
];

export const LiveMonitoringView: React.FC = () => {
  const [pingLatencies, setPingLatencies] = useState({
    starlink1: 14,
    starlink2: 18,
    rb1100: 2,
    gateway: 4
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPingLatencies({
        starlink1: Math.floor(Math.random() * 5) + 12,
        starlink2: Math.floor(Math.random() * 6) + 16,
        rb1100: Math.floor(Math.random() * 2) + 1,
        gateway: Math.floor(Math.random() * 3) + 3
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2 space-x-reverse">
            <Activity className="w-6 h-6 text-cyan-400" />
            <span>مراقبة الحزمة والأداء المباشر (Live Network Monitoring)</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            مراقبة زمن الاستجابة (Ping) لخطوط ستارلينك <span className="font-mono text-cyan-300">192.168.201.1</span> وسيرفر التوزيع <span className="font-mono text-cyan-300">192.168.201.2</span> لحظياً.
          </p>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse bg-emerald-950/80 text-emerald-400 px-3.5 py-1.5 rounded-xl border border-emerald-800/60 text-xs font-mono">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Live Pings Active (3s refresh)</span>
        </div>
      </div>

      {/* Ping Latency Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs">Starlink WAN 1 (192.168.201.1)</div>
            <div className="text-2xl font-bold text-cyan-400 font-mono mt-1">{pingLatencies.starlink1} ms</div>
            <div className="text-[11px] text-emerald-400 mt-1">ممتاز (Loss: 0.0%)</div>
          </div>
          <Activity className="w-8 h-8 text-cyan-400" />
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs">Starlink WAN 2 (Bonded)</div>
            <div className="text-2xl font-bold text-blue-400 font-mono mt-1">{pingLatencies.starlink2} ms</div>
            <div className="text-[11px] text-emerald-400 mt-1">ممتاز (Loss: 0.0%)</div>
          </div>
          <Activity className="w-8 h-8 text-blue-400" />
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs">RB1100AHx4 (192.168.201.2)</div>
            <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">{pingLatencies.rb1100} ms</div>
            <div className="text-[11px] text-emerald-400 mt-1">محلي سلكي مستقر</div>
          </div>
          <Server className="w-8 h-8 text-emerald-400" />
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs">البوابة الافتراضية (Gateway)</div>
            <div className="text-2xl font-bold text-purple-400 font-mono mt-1">{pingLatencies.gateway} ms</div>
            <div className="text-[11px] text-emerald-400 mt-1">استجابة فائقة</div>
          </div>
          <Wifi className="w-8 h-8 text-purple-400" />
        </div>
      </div>

      {/* Traffic Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">حركة مرور البيانات الحية (RX / TX Megabits per second)</h3>
            <p className="text-slate-400 text-xs mt-0.5">مراقبة سعة الاستهلاك المباشرة على سيرفر التوزيع</p>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse text-xs font-mono">
            <span className="flex items-center space-x-1 space-x-reverse text-cyan-400">
              <span className="w-3 h-3 rounded-full bg-cyan-500"></span>
              <span>Download (RX)</span>
            </span>
            <span className="flex items-center space-x-1 space-x-reverse text-purple-400">
              <span className="w-3 h-3 rounded-full bg-purple-500"></span>
              <span>Upload (TX)</span>
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={liveTrafficData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRx" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTx" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
              />
              <Area type="monotone" dataKey="rx" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorRx)" name="Download (Mbps)" />
              <Area type="monotone" dataKey="tx" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorTx)" name="Upload (Mbps)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
