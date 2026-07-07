import React, { useState } from 'react';
import { SubnetDevice } from '../types';
import { Search, Plus, CheckCircle2, ShieldAlert, RefreshCw, Radio, HardDrive } from 'lucide-react';

interface DiscoveryViewProps {
  subDevices: SubnetDevice[];
  onImportDevice: (id: string) => void;
  onScanSubnet: () => void;
}

export const DiscoveryView: React.FC<DiscoveryViewProps> = ({
  subDevices,
  onImportDevice,
  onScanSubnet
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleScanClick = () => {
    setIsScanning(true);
    setTimeout(() => {
      onScanSubnet();
      setIsScanning(false);
    }, 1500);
  };

  const filteredDevices = subDevices.filter(d =>
    d.ip.includes(searchTerm) ||
    d.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.mac.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2 space-x-reverse">
            <Search className="w-6 h-6 text-cyan-400" />
            <span>إدارة واكتشاف الأجهزة ونطاق الشبكة (IP Subnet Scanner)</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            فحص نطاق الشبكة المحلية <span className="font-mono text-cyan-300">192.168.201.0/24</span>، اكتشاف الأجهزة غير المسجلة، ومعرفة الماك أدرس والمصنع.
          </p>
        </div>
        <button
          onClick={handleScanClick}
          disabled={isScanning}
          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-5 py-2.5 rounded-xl text-xs font-medium shadow-lg transition-all flex items-center space-x-2 space-x-reverse disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'جاري الفحص الشامل...' : 'فحص النطاق الآن'}</span>
        </button>
      </div>

      {/* Subnet Statistics & Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs">إجمالي الأجهزة المكتشفة</div>
            <div className="text-xl font-bold text-white font-mono mt-1">{subDevices.length} أجهزة</div>
          </div>
          <HardDrive className="w-8 h-8 text-cyan-400" />
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs">أجهزة تم استيرادها للنظام</div>
            <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
              {subDevices.filter(d => d.imported).length} جهاز
            </div>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs">أجهزة غير مسجلة (تحتاج مراجعة)</div>
            <div className="text-xl font-bold text-amber-400 font-mono mt-1">
              {subDevices.filter(d => !d.imported).length} جهاز
            </div>
          </div>
          <ShieldAlert className="w-8 h-8 text-amber-400" />
        </div>
      </div>

      {/* Devices Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="text-base font-bold text-white">قائمة الأجهزة في نطاق 192.168.201.x</h3>
          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder="بحث سريع بالعنوان أو الماك..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase">
                <th className="py-3 px-4">عنوان IP</th>
                <th className="py-3 px-4">عنوان MAC</th>
                <th className="py-3 px-4">اسم الجهاز / الموديل</th>
                <th className="py-3 px-4">الشركة المصنعة</th>
                <th className="py-3 px-4">الإشارة / السرعة</th>
                <th className="py-3 px-4">الحالة</th>
                <th className="py-3 px-4 text-center">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
              {filteredDevices.map((dev) => (
                <tr key={dev.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-cyan-300">{dev.ip}</td>
                  <td className="py-3 px-4 text-slate-300">{dev.mac}</td>
                  <td className="py-3 px-4 text-white font-sans font-medium">{dev.deviceName}</td>
                  <td className="py-3 px-4 text-slate-400">{dev.vendor}</td>
                  <td className="py-3 px-4 text-slate-300">
                    <div>{dev.signal || 'N/A'}</div>
                    <div className="text-[10px] text-emerald-400">↓ {dev.downloadRate} | ↑ {dev.uploadRate}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-sans ${dev.status === 'active' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50' : 'bg-slate-800 text-slate-400'}`}>
                      {dev.status === 'active' ? 'نشط' : 'خامل'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {dev.imported ? (
                      <span className="text-emerald-400 text-xs font-sans inline-flex items-center space-x-1 space-x-reverse">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>مُسجل بالنظام</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => onImportDevice(dev.id)}
                        className="bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1.5 rounded-lg text-xs font-sans shadow transition-all"
                      >
                        استيراد للنظام
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
