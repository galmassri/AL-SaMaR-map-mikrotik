import React, { useState } from 'react';
import { RouterDevice } from '../types';
import { Network, Server, Wifi, Shield, Activity, MapPin, Search, Plus, Filter, RefreshCw, Cpu, Zap } from 'lucide-react';

interface MapViewProps {
  routers: RouterDevice[];
  onOpenNewRouter: () => void;
}

export const MapView: React.FC<MapViewProps> = ({ routers, onOpenNewRouter }) => {
  const [selectedRouter, setSelectedRouter] = useState<RouterDevice | null>(routers[1] || routers[0]);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredRouters = routers.filter(r => {
    const matchesFilter = filterType === 'all' || r.type === filterType;
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.ip.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2 space-x-reverse">
            <MapPin className="w-6 h-6 text-cyan-400" />
            <span>الخريطة الجغرافية والتوزيع الهيكلي لشبكة ALSaMaR-NET</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            عرض وتتبع جميع الراوترات والأجهزة على الشبكة مع ربط سيرفر الدمج Starlink <span className="font-mono text-cyan-300">192.168.201.1</span> وسيرفر التوزيع RB1100 <span className="font-mono text-cyan-300">192.168.201.2</span>.
          </p>
        </div>
        <div className="flex items-center space-x-3 space-x-reverse w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            <input
              type="text"
              placeholder="بحث بالاسم أو الأيبي..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pr-9 pl-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <button
            onClick={onOpenNewRouter}
            className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-xl text-xs font-medium shadow-md transition-all flex items-center space-x-1.5 space-x-reverse shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة موقع جديد</span>
          </button>
        </div>
      </div>

      {/* Main Map Grid & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Map Canvas (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative min-h-[500px] flex flex-col justify-between overflow-hidden">
          
          {/* Map Grid Background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>

          {/* Connection Topology Lines SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line x1="50%" y1="30%" x2="50%" y2="55%" stroke="#06b6d4" strokeWidth="3" strokeDasharray="6" className="animate-pulse" />
            <line x1="50%" y1="55%" x2="25%" y2="35%" stroke="#334155" strokeWidth="2" />
            <line x1="50%" y1="55%" x2="75%" y2="40%" stroke="#334155" strokeWidth="2" />
            <line x1="50%" y1="55%" x2="60%" y2="80%" stroke="#334155" strokeWidth="2" />
          </svg>

          {/* Top category filters */}
          <div className="relative z-10 flex items-center space-x-2 space-x-reverse bg-slate-800/80 p-2 rounded-xl border border-slate-700/60 w-fit backdrop-blur-md">
            <span className="text-xs text-slate-400 font-medium px-2">الفلترة:</span>
            {['all', 'core_bonding', 'distribution', 'tower', 'switch'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${filterType === type ? 'bg-cyan-600 text-white shadow' : 'text-slate-300 hover:bg-slate-700/60'}`}
              >
                {type === 'all' ? 'الكل' : type === 'core_bonding' ? 'دمج ستارلينك' : type === 'distribution' ? 'التوزيع الرئيسي' : type === 'tower' ? 'الأبراج' : 'السويتشات'}
              </button>
            ))}
          </div>

          {/* Nodes Interactive Placement */}
          <div className="relative z-10 my-auto py-12 grid grid-cols-3 gap-8 items-center justify-items-center">
            
            {/* North Tower */}
            {filteredRouters.find(r => r.type === 'tower') && (
              <div
                onClick={() => setSelectedRouter(filteredRouters.find(r => r.type === 'tower') || null)}
                className={`cursor-pointer p-4 rounded-2xl border transition-all ${selectedRouter?.id === filteredRouters.find(r => r.type === 'tower')?.id ? 'bg-cyan-950/80 border-cyan-500 shadow-lg shadow-cyan-500/20 scale-105' : 'bg-slate-800/80 border-slate-700 hover:border-slate-600'} text-center`}
              >
                <div className="w-10 h-10 bg-cyan-900/60 rounded-xl mx-auto flex items-center justify-center text-cyan-400 mb-2">
                  <Wifi className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-white">برج الشمال</div>
                <div className="text-[10px] text-cyan-300 font-mono">192.168.201.15</div>
              </div>
            )}

            {/* Starlink Bonding Server (Center Top) */}
            {filteredRouters.find(r => r.type === 'core_bonding') && (
              <div
                onClick={() => setSelectedRouter(filteredRouters.find(r => r.type === 'core_bonding') || null)}
                className={`cursor-pointer p-4 rounded-2xl border transition-all ${selectedRouter?.id === filteredRouters.find(r => r.type === 'core_bonding')?.id ? 'bg-blue-950/80 border-blue-500 shadow-lg shadow-blue-500/20 scale-105' : 'bg-slate-800/80 border-slate-700 hover:border-slate-600'} text-center`}
              >
                <div className="w-12 h-12 bg-blue-900/60 rounded-xl mx-auto flex items-center justify-center text-blue-400 mb-2">
                  <Activity className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-white">دمج Starlink</div>
                <div className="text-[10px] text-blue-300 font-mono">192.168.201.1</div>
              </div>
            )}

            {/* East Tower */}
            {filteredRouters.find(r => r.type === 'tower' && r.id !== 'router-tower-north') && (
              <div
                onClick={() => setSelectedRouter(filteredRouters.find(r => r.type === 'tower' && r.id !== 'router-tower-north') || null)}
                className={`cursor-pointer p-4 rounded-2xl border transition-all ${selectedRouter?.id === 'router-tower-east' ? 'bg-amber-950/80 border-amber-500 shadow-lg shadow-amber-500/20 scale-105' : 'bg-slate-800/80 border-slate-700 hover:border-slate-600'} text-center`}
              >
                <div className="w-10 h-10 bg-amber-900/60 rounded-xl mx-auto flex items-center justify-center text-amber-400 mb-2">
                  <Wifi className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-white">برج الشرق</div>
                <div className="text-[10px] text-amber-300 font-mono">192.168.201.22</div>
              </div>
            )}

            {/* Distribution RB1100 (Center) */}
            {filteredRouters.find(r => r.type === 'distribution') && (
              <div
                onClick={() => setSelectedRouter(filteredRouters.find(r => r.type === 'distribution') || null)}
                className={`col-span-3 cursor-pointer p-5 rounded-2xl border transition-all ${selectedRouter?.id === 'router-distribution-rb1100' ? 'bg-cyan-950/90 border-cyan-400 shadow-xl shadow-cyan-500/30 scale-105' : 'bg-slate-800/90 border-slate-700 hover:border-slate-600'} text-center max-w-xs w-full`}
              >
                <div className="w-14 h-14 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-2xl mx-auto flex items-center justify-center text-white mb-2 shadow-lg">
                  <Server className="w-7 h-7" />
                </div>
                <div className="text-sm font-bold text-white">RB1100AHx4 (سيرفر التوزيع ويوزمانجر)</div>
                <div className="text-xs text-cyan-300 font-mono mt-0.5">192.168.201.2 • OS 6.49.19</div>
                <div className="mt-2 inline-flex items-center space-x-1.5 space-x-reverse bg-emerald-950/80 text-emerald-400 px-3 py-1 rounded-full text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>342 مشترك متصل</span>
                </div>
              </div>
            )}

          </div>

          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-800">
            <span>انقر على أي راوتر لعرض تقرير الأداء المباشر</span>
            <span className="font-mono text-cyan-400">ALSaMaR-NET GIS Mapping Engine</span>
          </div>

        </div>

        {/* Selected Router Inspector Panel (1 col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          {selectedRouter ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest px-2.5 py-0.5 bg-cyan-950/80 rounded-full border border-cyan-800/50">
                    {selectedRouter.type === 'core_bonding' ? 'دمج خطوط ستارلينك' : selectedRouter.type === 'distribution' ? 'التوزيع الرئيسي' : 'برج إرسال لاسلكي'}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2">{selectedRouter.name}</h3>
                </div>
                <div className={`w-3.5 h-3.5 rounded-full ${selectedRouter.status === 'online' ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : selectedRouter.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'}`}></div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between bg-slate-800/60 p-2.5 rounded-xl">
                  <span className="text-slate-400">عنوان IP الدخول:</span>
                  <span className="text-cyan-300 font-bold">{selectedRouter.ip}</span>
                </div>
                <div className="flex justify-between bg-slate-800/60 p-2.5 rounded-xl">
                  <span className="text-slate-400">موديل الراوتر:</span>
                  <span className="text-white">{selectedRouter.model}</span>
                </div>
                <div className="flex justify-between bg-slate-800/60 p-2.5 rounded-xl">
                  <span className="text-slate-400">إصدار RouterOS:</span>
                  <span className="text-emerald-400">{selectedRouter.firmware}</span>
                </div>
                <div className="flex justify-between bg-slate-800/60 p-2.5 rounded-xl">
                  <span className="text-slate-400">وقت التشغيل (Uptime):</span>
                  <span className="text-white">{selectedRouter.uptime}</span>
                </div>
                <div className="flex justify-between bg-slate-800/60 p-2.5 rounded-xl">
                  <span className="text-slate-400">استهلاك المعالج (CPU):</span>
                  <span className="text-cyan-400 font-bold">{selectedRouter.cpuUsage}%</span>
                </div>
                <div className="flex justify-between bg-slate-800/60 p-2.5 rounded-xl">
                  <span className="text-slate-400">استهلاك الذاكرة (RAM):</span>
                  <span className="text-purple-400 font-bold">{selectedRouter.memoryUsage}%</span>
                </div>
                <div className="flex justify-between bg-slate-800/60 p-2.5 rounded-xl">
                  <span className="text-slate-400">العملاء والمتصلين:</span>
                  <span className="text-emerald-400 font-bold">{selectedRouter.connectedClients} عميل</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => alert(`جاري الاتصال بـ ${selectedRouter.name} (${selectedRouter.ip}) عبر WinBox / API...`)}
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-2.5 rounded-xl text-xs font-medium shadow-md transition-all text-center"
                >
                  فتح لوحة التحكم WinBox / WebFig
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-slate-500">
              <Network className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="text-sm">اختر راوتر من الخريطة لعرض تفاصيله الفنية</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
