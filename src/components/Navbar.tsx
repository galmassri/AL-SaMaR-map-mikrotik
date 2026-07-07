import React from 'react';
import { Network, ShieldCheck, Send, Cpu, Wifi, Bell, RefreshCw } from 'lucide-react';

interface NavbarProps {
  onOpenNewRouter: () => void;
  onOpenTelegramModal: () => void;
  onRunAIScan: () => void;
  lastSync: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenNewRouter,
  onOpenTelegramModal,
  onRunAIScan,
  lastSync
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="w-12 h-12 bg-gradient-to-tr from-cyan-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-400/30">
            <Network className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <h1 className="text-xl font-bold tracking-tight text-white font-sans">
                ALSaMaR-NET <span className="text-cyan-400 text-sm font-mono px-2 py-0.5 bg-cyan-950/60 rounded-full border border-cyan-800/50">MikroTik Map</span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              منصة الإدارة والمراقبة المتكاملة • توزيع 192.168.201.2 | دمج Starlink 192.168.201.1
            </p>
          </div>
        </div>

        {/* Status Indicators & Quick Actions */}
        <div className="flex items-center space-x-3 space-x-reverse">
          
          {/* Starlink Bonding Status Badge */}
          <div className="hidden xl:flex items-center space-x-2 space-x-reverse bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div className="text-right">
              <div className="text-slate-300 font-medium">Starlink Bonding</div>
              <div className="text-[10px] text-emerald-400 font-mono">192.168.201.1 (Active)</div>
            </div>
          </div>

          {/* RB1100AHx4 Status Badge */}
          <div className="hidden xl:flex items-center space-x-2 space-x-reverse bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <div className="text-right">
              <div className="text-slate-300 font-medium">RB1100AHx4 UserMan</div>
              <div className="text-[10px] text-cyan-400 font-mono">192.168.201.2 (OS 6.49.19)</div>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-800 hidden md:block"></div>

          {/* Action Buttons */}
          <button
            onClick={onRunAIScan}
            className="flex items-center space-x-1.5 space-x-reverse bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-3.5 py-2 rounded-lg text-xs font-medium shadow-md transition-all active:scale-95"
            title="فحص الذكاء الاصطناعي الشامل"
          >
            <Cpu className="w-4 h-4" />
            <span className="hidden sm:inline">تشخيص AI ذكي</span>
          </button>

          <button
            onClick={onOpenTelegramModal}
            className="flex items-center space-x-1.5 space-x-reverse bg-sky-600 hover:bg-sky-500 text-white px-3.5 py-2 rounded-lg text-xs font-medium shadow-md transition-all active:scale-95"
            title="إرسال تنبيه أو تقرير تيليجرام"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">تيليجرام</span>
          </button>

          <button
            onClick={onOpenNewRouter}
            className="flex items-center space-x-1.5 space-x-reverse bg-cyan-600 hover:bg-cyan-500 text-white px-3.5 py-2 rounded-lg text-xs font-medium shadow-md transition-all active:scale-95"
          >
            <span className="text-base font-bold">+</span>
            <span className="hidden sm:inline">إضافة جهاز</span>
          </button>

        </div>
      </div>
    </header>
  );
};
