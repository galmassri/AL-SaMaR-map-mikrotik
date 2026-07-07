import React from 'react';
import { RouterDevice, DiagnosticAlert, VoucherCard, SalesRecord } from '../types';
import { Network, Activity, Cpu, ShieldAlert, Ticket, DollarSign, ArrowUpRight, ArrowDownRight, CheckCircle2, AlertTriangle, Radio } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardViewProps {
  routers: RouterDevice[];
  alerts: DiagnosticAlert[];
  vouchers: VoucherCard[];
  salesData: SalesRecord[];
  onNavigate: (tab: any) => void;
  onOpenNewRouter: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  routers,
  alerts,
  vouchers,
  salesData,
  onNavigate,
  onOpenNewRouter
}) => {
  const activeAlerts = alerts.filter(a => a.status === 'active');
  const onlineRouters = routers.filter(r => r.status === 'online');
  const warningRouters = routers.filter(r => r.status === 'warning');
  const totalSubscribers = routers.reduce((acc, r) => acc + r.connectedClients, 0);
  const totalRevenue = salesData.reduce((acc, s) => acc + s.dailyRevenue, 0);

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 space-x-reverse bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 px-3 py-1 rounded-full text-xs font-mono mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>ALSaMaR-NET Core System Active</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              أهلاً بك في منصة الإدارة والمراقبة لشبكات MikroTik
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              إدارة متكاملة لسيرفر توزيع <span className="text-cyan-300 font-mono">192.168.201.2</span> المرتبط بسيرفر دمج خطوط ستارلينك <span className="text-cyan-300 font-mono">192.168.201.1</span>، مع نظام كروت يوزمانجر وتنبيهات تيليجرام.
            </p>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse">
            <button
              onClick={() => onNavigate('map')}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-lg shadow-cyan-900/50 transition-all flex items-center space-x-2 space-x-reverse"
            >
              <Network className="w-4 h-4" />
              <span>خريطة الشبكة الحية</span>
            </button>
            <button
              onClick={() => onNavigate('diagnostics')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center space-x-2 space-x-reverse"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>التشخيص الذكي ({activeAlerts.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Routers Stat */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs font-medium">أجهزة الراوتر والسيرفرات</div>
            <div className="text-2xl font-bold text-white mt-1 font-mono">{routers.length} أجهزة</div>
            <div className="text-emerald-400 text-xs mt-1 flex items-center space-x-1 space-x-reverse">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{onlineRouters.length} متصل، {warningRouters.length} تنبيه</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-cyan-950 border border-cyan-800/60 rounded-xl flex items-center justify-center text-cyan-400">
            <Network className="w-6 h-6" />
          </div>
        </div>

        {/* Subscribers Stat */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs font-medium">المشتركين النشطين (UserMan)</div>
            <div className="text-2xl font-bold text-white mt-1 font-mono">{totalSubscribers} مشترك</div>
            <div className="text-emerald-400 text-xs mt-1 flex items-center space-x-1 space-x-reverse">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+18% نمو هذا الأسبوع</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-emerald-950 border border-emerald-800/60 rounded-xl flex items-center justify-center text-emerald-400">
            <Radio className="w-6 h-6" />
          </div>
        </div>

        {/* Starlink Bonding Stat */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs font-medium">دمج خطوط Starlink</div>
            <div className="text-xl font-bold text-white mt-1 font-mono">192.168.201.1</div>
            <div className="text-cyan-400 text-xs mt-1 font-mono">
              بنج 14ms • PüC Active
            </div>
          </div>
          <div className="w-12 h-12 bg-blue-950 border border-blue-800/60 rounded-xl flex items-center justify-center text-blue-400">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        {/* Revenue Stat */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs font-medium">إجمالي الإيرادات (الأسبوع)</div>
            <div className="text-2xl font-bold text-white mt-1 font-mono">{totalRevenue.toLocaleString()} د.ع</div>
            <div className="text-emerald-400 text-xs mt-1 flex items-center space-x-1 space-x-reverse">
              <DollarSign className="w-3.5 h-3.5" />
              <span>مبيعات الكروت منتظمة</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-amber-950 border border-amber-800/60 rounded-xl flex items-center justify-center text-amber-400">
            <Ticket className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Active Diagnostics Alerts Warning Banner */}
      {activeAlerts.length > 0 && (
        <div className="bg-amber-950/40 border border-amber-800/80 rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-amber-900/50 rounded-xl flex items-center justify-center text-amber-400 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-amber-300 font-bold text-sm">تنبيهات تشخيصية نشطة ({activeAlerts.length})</h3>
              <p className="text-amber-200/80 text-xs mt-0.5">
                {activeAlerts[0].title} — {activeAlerts[0].description}
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('diagnostics')}
            className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-xl text-xs font-medium shadow-md transition-all shrink-0"
          >
            عرض التفاصيل والحلول
          </button>
        </div>
      )}

      {/* Main Content Split: Revenue Chart & Quick Routers List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Chart (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">إحصائيات الإيرادات التراكمية ومبيعات الكروت</h3>
              <p className="text-slate-400 text-xs mt-0.5">تتبع المبيعات اليومية لشبكة ALSaMaR-NET</p>
            </div>
            <button
              onClick={() => onNavigate('vouchers')}
              className="text-cyan-400 hover:text-cyan-300 text-xs font-medium"
            >
              إدارة الكروت ←
            </button>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} tickFormatter={(val) => `${val / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  formatter={(val: any) => [`${Number(val).toLocaleString()} د.ع`, 'الإيراد اليومي']}
                />
                <Area type="monotone" dataKey="dailyRevenue" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Routers List Card (1 col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">الراوترات والسيرفرات الرئيسية</h3>
            <button
              onClick={() => onNavigate('map')}
              className="text-cyan-400 hover:text-cyan-300 text-xs font-medium"
            >
              الخريطة ←
            </button>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-64 pr-1">
            {routers.map((router) => (
              <div key={router.id} className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className={`w-3 h-3 rounded-full ${router.status === 'online' ? 'bg-emerald-500 shadow-md shadow-emerald-500/50' : router.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                  <div>
                    <h4 className="text-white text-xs font-bold">{router.name}</h4>
                    <p className="text-[11px] text-slate-400 font-mono">{router.ip} • {router.model}</p>
                  </div>
                </div>
                <div className="text-left font-mono text-xs">
                  <span className="text-cyan-300">{router.cpuUsage}% CPU</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onOpenNewRouter}
            className="mt-4 w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-400 py-2.5 rounded-xl text-xs font-medium transition-all text-center"
          >
            + إضافة راوتر جديد للشبكة
          </button>
        </div>

      </div>

    </div>
  );
};
