import React from 'react';
import { LayoutDashboard, Map, Search, Stethoscope, Ticket, Send, Activity, Users, Shield, Server } from 'lucide-react';

export type TabType = 'overview' | 'map' | 'discovery' | 'diagnostics' | 'vouchers' | 'telegram' | 'monitoring' | 'subscribers' | 'guide' | 'mikrotik-settings';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  activeAlertsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, activeAlertsCount }) => {
  const menuItems = [
    { id: 'overview' as TabType, label: 'لوحة التحكم الرئيسية', icon: LayoutDashboard },
    { id: 'map' as TabType, label: 'الخريطة الجغرافية للشبكة', icon: Map },
    { id: 'discovery' as TabType, label: 'اكتشاف الأجهزة والـ Subnet', icon: Search },
    { id: 'diagnostics' as TabType, label: 'التشخيص الذكي والفحص المتقدم', icon: Stethoscope, badge: activeAlertsCount > 0 ? activeAlertsCount : null },
    { id: 'subscribers' as TabType, label: 'إدارة المشتركين', icon: Users },
    { id: 'mikrotik-settings' as TabType, label: 'إعدادات ربط ميكروتيك (API)', icon: Server },
    { id: 'vouchers' as TabType, label: 'مبيعات الكروت ويوزمانجر', icon: Ticket },
    { id: 'guide' as TabType, label: 'دليل ربط ميكروتيك وتثبيت PWA', icon: Shield },
    { id: 'telegram' as TabType, label: 'تكامل تيليجرام والتنبيهات', icon: Send },
    { id: 'monitoring' as TabType, label: 'مراقبة الأداء المباشر والـ Pings', icon: Activity },
  ];

  return (
    <aside className="w-full lg:w-72 bg-slate-900 lg:min-h-[calc(100vh-5rem)] border-l border-slate-800 p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-1.5">
        <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
          القائمة الرئيسية
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-600/90 to-blue-600/90 text-white shadow-lg shadow-cyan-900/40 ring-1 ring-cyan-400/30'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="text-right">{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Network Core Info Card at bottom of sidebar */}
      <div className="mt-8 bg-slate-800/60 rounded-xl p-3.5 border border-slate-700/50 text-xs space-y-2">
        <div className="flex items-center justify-between text-slate-300 font-medium">
          <span>بنية الدمج والتوزيع</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        </div>
        <div className="text-[11px] text-slate-400 space-y-1 font-mono">
          <div className="flex justify-between">
            <span>Starlink Bonding:</span>
            <span className="text-cyan-300">192.168.201.1</span>
          </div>
          <div className="flex justify-between">
            <span>RB1100AHx4:</span>
            <span className="text-cyan-300">192.168.201.2</span>
          </div>
          <div className="flex justify-between">
            <span>RouterOS:</span>
            <span className="text-emerald-300">v6.49.19</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
