import React, { useState } from 'react';
import { VoucherCard, SalesRecord } from '../types';
import { Ticket, DollarSign, Plus, Printer, RefreshCw, CheckCircle2, Users, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface VouchersViewProps {
  vouchers: VoucherCard[];
  salesData: SalesRecord[];
  onGenerateVouchers: (data: any) => void;
}

export const VouchersView: React.FC<VouchersViewProps> = ({
  vouchers,
  salesData,
  onGenerateVouchers
}) => {
  const [showGenerator, setShowGenerator] = useState(false);
  const [profileName, setProfileName] = useState('كارت 5 جيجابايت - أسبوعي');
  const [price, setPrice] = useState(5000);
  const [duration, setDuration] = useState('7 أيام');
  const [dataLimit, setDataLimit] = useState('5 GB');
  const [count, setCount] = useState(10);
  const [distributor, setDistributor] = useState('مكتب الهدى للاتصالات');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateVouchers({
      profileName,
      price: Number(price),
      duration,
      dataLimit,
      count: Number(count),
      distributor
    });
    setShowGenerator(false);
  };

  const totalVouchersCount = vouchers.length;
  const activeVouchersCount = vouchers.filter(v => v.status === 'active').length;
  const unusedVouchersCount = vouchers.filter(v => v.status === 'unused').length;
  const totalRevenue = salesData.reduce((acc, s) => acc + s.dailyRevenue, 0);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2 space-x-reverse">
            <Ticket className="w-6 h-6 text-cyan-400" />
            <span>نظام إدارة الكروت والمبيعات (UserMan Integration)</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            إدارة وإنشاء بطاقات يوزمانجر على سيرفر RB1100AHx4 (<span className="font-mono text-cyan-300">192.168.201.2</span>)، وتتبع إيرادات الموزعين والمبيعات اليومية.
          </p>
        </div>
        <button
          onClick={() => setShowGenerator(true)}
          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-5 py-2.5 rounded-xl text-xs font-medium shadow-lg transition-all flex items-center space-x-2 space-x-reverse"
        >
          <Plus className="w-4 h-4" />
          <span>إنشاء دفعة كروت جديدة</span>
        </button>
      </div>

      {/* Generator Modal */}
      {showGenerator && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">توليد بطاقات UserMan جديدة</h3>
              <button onClick={() => setShowGenerator(false)} className="text-slate-400 hover:text-white text-lg">✕</button>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">اسم الباقة أو البروفايل</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">السعر (د.ع)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">عدد الكروت في الدفعة</label>
                  <input
                    type="number"
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">مدة الصلاحية</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="24 ساعة">24 ساعة (يومي)</option>
                    <option value="7 أيام">7 أيام (أسبوعي)</option>
                    <option value="30 يوماً">30 يوماً (شهري)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">سعة التحميل (Data Limit)</label>
                  <input
                    type="text"
                    value={dataLimit}
                    onChange={(e) => setDataLimit(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">الموزع أو نقطة البيع</label>
                <input
                  type="text"
                  value={distributor}
                  onChange={(e) => setDistributor(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="pt-3 flex justify-end space-x-3 space-x-reverse">
                <button
                  type="button"
                  onClick={() => setShowGenerator(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2.5 rounded-xl text-xs font-medium"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2.5 rounded-xl text-xs font-medium shadow-lg"
                >
                  توليد وطباعة الكروت
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs">إجمالي الإيرادات (الأسبوع)</div>
            <div className="text-xl font-bold text-white font-mono mt-1">{totalRevenue.toLocaleString()} د.ع</div>
          </div>
          <DollarSign className="w-8 h-8 text-emerald-400" />
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs">كروت نشطة حالياً</div>
            <div className="text-xl font-bold text-cyan-400 font-mono mt-1">{activeVouchersCount} كارت</div>
          </div>
          <Users className="w-8 h-8 text-cyan-400" />
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs">كروت جاهزة للبيع (Unused)</div>
            <div className="text-xl font-bold text-amber-400 font-mono mt-1">{unusedVouchersCount} كارت</div>
          </div>
          <Ticket className="w-8 h-8 text-amber-400" />
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-xs">معدل البيع اليومي</div>
            <div className="text-xl font-bold text-purple-400 font-mono mt-1">142 كارت/يوم</div>
          </div>
          <TrendingUp className="w-8 h-8 text-purple-400" />
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white">إحصائيات المبيعات اليومية لبطاقات يوزمانجر</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} tickFormatter={(val) => `${val / 1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                formatter={(val: any) => [`${Number(val).toLocaleString()} د.ع`, 'المبيعات']}
              />
              <Bar dataKey="dailyRevenue" fill="#06b6d4" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Vouchers Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">أحدث بطاقات يوزمانجر المسجلة</h3>
          <button
            onClick={() => alert('جاري تصدير قائمة الكروت إلى ملف Excel / PDF...')}
            className="flex items-center space-x-1.5 space-x-reverse bg-slate-800 hover:bg-slate-700 text-slate-300 px-3.5 py-2 rounded-xl text-xs font-medium"
          >
            <Printer className="w-4 h-4" />
            <span>تصدير الكروت</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase">
                <th className="py-3 px-4">رقم الكارت / الرمز</th>
                <th className="py-3 px-4">الباقة (Profile)</th>
                <th className="py-3 px-4">السعر</th>
                <th className="py-3 px-4">المدة / السعة</th>
                <th className="py-3 px-4">الموزع</th>
                <th className="py-3 px-4">الحالة</th>
                <th className="py-3 px-4">تاريخ الإنشاء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
              {vouchers.map((v) => (
                <tr key={v.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-cyan-300">{v.code}</td>
                  <td className="py-3 px-4 text-white font-sans font-medium">{v.profileName}</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">{v.price.toLocaleString()} د.ع</td>
                  <td className="py-3 px-4 text-slate-300">{v.duration} ({v.dataLimit})</td>
                  <td className="py-3 px-4 text-slate-400">{v.distributor}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-sans ${v.status === 'active' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/50' : v.status === 'unused' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50' : 'bg-slate-800 text-slate-400'}`}>
                      {v.status === 'active' ? 'نشط الآن' : v.status === 'unused' ? 'غير مستخدم' : 'منتهي'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{v.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
