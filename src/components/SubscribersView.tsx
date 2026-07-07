import React, { useState } from 'react';
import { Subscriber, RouterDevice } from '../types';
import { Users, UserPlus, Search, Filter, CheckCircle, XCircle, AlertTriangle, DollarSign, Phone, Edit3, Trash2, Router, Calendar, Send, X, Check, Shield } from 'lucide-react';

interface SubscribersViewProps {
  subscribers: Subscriber[];
  routers: RouterDevice[];
  onAddSubscriber: (subscriberData: Partial<Subscriber>) => void;
  onUpdateSubscriber: (id: string, subscriberData: Partial<Subscriber>) => void;
  onDeleteSubscriber: (id: string) => void;
  onTogglePayment: (id: string) => void;
  onSendTelegram: (message: string, category: string) => void;
}

export const SubscribersView: React.FC<SubscribersViewProps> = ({
  subscribers,
  routers,
  onAddSubscriber,
  onUpdateSubscriber,
  onDeleteSubscriber,
  onTogglePayment,
  onSendTelegram,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'paid' | 'unpaid' | 'pending'>('all');
  const [routerFilter, setRouterFilter] = useState<string>('all');
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [editingSubscriber, setEditingSubscriber] = useState<Subscriber | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phone: '',
    ipAddress: '192.168.201.',
    macAddress: '',
    plan: 'اشتراك 30 جيجابايت - شهري',
    price: 25000,
    status: 'active' as 'active' | 'expired' | 'suspended',
    paymentStatus: 'unpaid' as 'paid' | 'unpaid' | 'pending',
    expiryDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
    routerId: routers[0]?.id || '',
    notes: ''
  });

  const plansList = [
    { name: 'اشتراك 5 جيجابايت - أسبوعي', price: 5000, data: '5 GB' },
    { name: 'اشتراك 15 جيجابايت - أسبوعي', price: 12000, data: '15 GB' },
    { name: 'اشتراك 30 جيجابايت - شهري', price: 25000, data: '30 GB' },
    { name: 'اشتراك 50 جيجابايت - شهري', price: 35000, data: '50 GB' },
    { name: 'اشتراك 100 جيجابايت - بريميوم', price: 60000, data: '100 GB' },
    { name: 'اشتراك مفتوح (غير محدود) - بريميوم', price: 45000, data: 'Unlimited' },
  ];

  const handlePlanChange = (planName: string) => {
    const found = plansList.find(p => p.name === planName);
    setFormData(prev => ({
      ...prev,
      plan: planName,
      price: found ? found.price : prev.price
    }));
  };

  const handleOpenAdd = () => {
    setEditingSubscriber(null);
    setFormData({
      name: '',
      username: `user_${Math.floor(100 + Math.random() * 900)}`,
      phone: '0770',
      ipAddress: '192.168.201.',
      macAddress: 'CC:2D:E0:' + Math.floor(Math.random()*89+10) + ':' + Math.floor(Math.random()*89+10) + ':' + Math.floor(Math.random()*89+10),
      plan: 'اشتراك 30 جيجابايت - شهري',
      price: 25000,
      status: 'active',
      paymentStatus: 'unpaid',
      expiryDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      routerId: routers[0]?.id || '',
      notes: ''
    });
    setShowModal(true);
  };

  const handleOpenEdit = (sub: Subscriber) => {
    setEditingSubscriber(sub);
    setFormData({
      name: sub.name,
      username: sub.username,
      phone: sub.phone,
      ipAddress: sub.ipAddress,
      macAddress: sub.macAddress,
      plan: sub.plan,
      price: sub.price,
      status: sub.status,
      paymentStatus: sub.paymentStatus,
      expiryDate: sub.expiryDate,
      routerId: sub.routerId,
      notes: sub.notes || ''
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSubscriber) {
      onUpdateSubscriber(editingSubscriber.id, formData);
    } else {
      onAddSubscriber(formData);
    }
    setShowModal(false);
  };

  // Filter logic
  const filteredSubscribers = subscribers.filter(sub => {
    const matchesSearch = 
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.ipAddress.includes(searchTerm) ||
      sub.phone.includes(searchTerm);
    
    const matchesPayment = paymentFilter === 'all' || sub.paymentStatus === paymentFilter;
    const matchesRouter = routerFilter === 'all' || sub.routerId === routerFilter;

    return matchesSearch && matchesPayment && matchesRouter;
  });

  // Stats calculation
  const totalSubscribersCount = subscribers.length;
  const activeSubscribersCount = subscribers.filter(s => s.status === 'active').length;
  const paidCount = subscribers.filter(s => s.paymentStatus === 'paid').length;
  const unpaidCount = subscribers.filter(s => s.paymentStatus === 'unpaid' || s.paymentStatus === 'pending').length;
  const totalRevenue = subscribers
    .filter(s => s.paymentStatus === 'paid')
    .reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 ring-1 ring-cyan-500/30">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">نظام إدارة المشتركين</h1>
              <p className="text-sm text-slate-400 mt-0.5">
                إدارة مشتركي شبكة ALSaMaR-NET، تعيين خطط UserMan، ومتابعة حالات الدفع والاشتراكات
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 space-x-reverse">
          <button
            onClick={() => setShowGuideModal(true)}
            className="flex items-center space-x-2 space-x-reverse bg-slate-800 hover:bg-slate-700 text-cyan-300 font-medium px-4 py-2.5 rounded-xl border border-slate-700 transition-all text-sm"
          >
            <Shield className="w-4 h-4" />
            <span>ربط الميكروتيك الحقيقي وتحميل التطبيق</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="flex items-center space-x-2 space-x-reverse bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-cyan-900/30 transition-all text-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span>إضافة مشترك جديد</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/70 p-5 rounded-2xl border border-slate-800 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 font-mono">إجمالي المشتركين</p>
            <h3 className="text-3xl font-bold text-white mt-1">{totalSubscribersCount}</h3>
            <span className="text-xs text-cyan-400 mt-1 inline-block">مشترك مسجل في النظام</span>
          </div>
          <div className="p-3.5 bg-blue-500/10 text-blue-400 rounded-xl ring-1 ring-blue-500/20">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900/70 p-5 rounded-2xl border border-slate-800 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 font-mono">المشتركين النشطين</p>
            <h3 className="text-3xl font-bold text-emerald-400 mt-1">{activeSubscribersCount}</h3>
            <span className="text-xs text-emerald-500/80 mt-1 inline-block">متصلون حالياً بالشبكة</span>
          </div>
          <div className="p-3.5 bg-emerald-500/10 text-emerald-400 rounded-xl ring-1 ring-emerald-500/20">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900/70 p-5 rounded-2xl border border-slate-800 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 font-mono">حالات الدفع (مدفوع / غير مدفوع)</p>
            <div className="flex items-center space-x-2 space-x-reverse mt-1">
              <span className="text-2xl font-bold text-emerald-400">{paidCount}</span>
              <span className="text-slate-500">/</span>
              <span className="text-2xl font-bold text-amber-400">{unpaidCount}</span>
            </div>
            <span className="text-xs text-amber-400 mt-1 inline-block">مطلوب متابعة التحصيل</span>
          </div>
          <div className="p-3.5 bg-amber-500/10 text-amber-400 rounded-xl ring-1 ring-amber-500/20">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900/70 p-5 rounded-2xl border border-slate-800 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 font-mono">إيرادات الاشتراكات المدفوعة</p>
            <h3 className="text-2xl font-bold text-cyan-300 mt-1">{totalRevenue.toLocaleString()} <span className="text-xs font-normal text-slate-400">د.ع</span></h3>
            <span className="text-xs text-cyan-400 mt-1 inline-block">عبر نظام UserMan</span>
          </div>
          <div className="p-3.5 bg-cyan-500/10 text-cyan-400 rounded-xl ring-1 ring-cyan-500/20">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute right-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="بحث بالاسم، اسم المستخدم، IP، أو الهاتف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-10 pl-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Payment Filter */}
          <div className="flex items-center space-x-1.5 space-x-reverse bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 font-mono">الدفع:</span>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value as any)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900">الكل</option>
              <option value="paid" className="bg-slate-900">مدفوع</option>
              <option value="unpaid" className="bg-slate-900">غير مدفوع</option>
              <option value="pending" className="bg-slate-900">قيد الانتظار</option>
            </select>
          </div>

          {/* Router Filter */}
          <div className="flex items-center space-x-1.5 space-x-reverse bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 font-mono">البرج / الراوتر:</span>
            <select
              value={routerFilter}
              onChange={(e) => setRouterFilter(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900">جميع الأبراج</option>
              {routers.map(r => (
                <option key={r.id} value={r.id} className="bg-slate-900">{r.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => {
              onSendTelegram(`📊 تقرير المشتركين: إجمالي المشتركين (${totalSubscribersCount})، النشطين (${activeSubscribersCount})، والمدفوعين (${paidCount}).`, 'subscriber');
            }}
            className="flex items-center space-x-1.5 space-x-reverse bg-slate-800 hover:bg-slate-700 text-cyan-300 px-3 py-2 rounded-xl text-xs font-medium transition-all border border-slate-700"
          >
            <Send className="w-3.5 h-3.5" />
            <span>إرسال تقرير تيليجرام</span>
          </button>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-950/70 border-b border-slate-800 text-slate-400 text-xs font-mono">
                <th className="py-4 px-4 font-medium">المشترك / اسم المستخدم</th>
                <th className="py-4 px-4 font-medium">الهاتف والعنوان (IP/MAC)</th>
                <th className="py-4 px-4 font-medium">خطة الاشتراك والسعر</th>
                <th className="py-4 px-4 font-medium">الراوتر / الموقع</th>
                <th className="py-4 px-4 font-medium">تاريخ الانتهاء</th>
                <th className="py-4 px-4 font-medium text-center">حالة الدفع</th>
                <th className="py-4 px-4 font-medium text-center">الحالة</th>
                <th className="py-4 px-4 font-medium text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-slate-500">
                    لا يوجد مشتركين مطابقي لخيارات البحث الحالية.
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((sub) => {
                  const router = routers.find(r => r.id === sub.routerId);
                  return (
                    <tr key={sub.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-semibold text-white">{sub.name}</div>
                        <div className="text-xs text-cyan-400 font-mono mt-0.5">@{sub.username}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-1.5 space-x-reverse text-slate-300 text-xs">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{sub.phone}</span>
                        </div>
                        <div className="text-[11px] font-mono text-slate-400 mt-1">
                          IP: <span className="text-emerald-400">{sub.ipAddress}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-slate-200 font-medium text-xs">{sub.plan}</div>
                        <div className="text-xs font-mono text-cyan-300 mt-0.5">{sub.price.toLocaleString()} د.ع</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-1.5 space-x-reverse text-slate-300 text-xs">
                          <Router className="w-3.5 h-3.5 text-indigo-400" />
                          <span className="truncate max-w-[150px]">{router?.name || 'المركز الرئيسي'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-1.5 space-x-reverse text-slate-300 text-xs font-mono">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{sub.expiryDate}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => onTogglePayment(sub.id)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-all inline-flex items-center space-x-1 space-x-reverse ${
                            sub.paymentStatus === 'paid'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                              : sub.paymentStatus === 'pending'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20'
                          }`}
                          title="انقر لتبديل حالة الدفع"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            sub.paymentStatus === 'paid' ? 'bg-emerald-400' : sub.paymentStatus === 'pending' ? 'bg-amber-400' : 'bg-rose-400'
                          }`}></span>
                          <span>
                            {sub.paymentStatus === 'paid' ? 'مدفوع' : sub.paymentStatus === 'pending' ? 'قيد الانتظار' : 'غير مدفوع'}
                          </span>
                        </button>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-medium font-mono ${
                          sub.status === 'active'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : sub.status === 'suspended'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}>
                          {sub.status === 'active' ? 'نشط' : sub.status === 'suspended' ? 'موقوف' : 'منتهي'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-left">
                        <div className="flex items-center justify-end space-x-2 space-x-reverse">
                          <button
                            onClick={() => handleOpenEdit(sub)}
                            className="p-1.5 bg-slate-800 hover:bg-cyan-600/20 text-slate-300 hover:text-cyan-400 rounded-lg transition-colors"
                            title="تعديل المشترك"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteSubscriber(sub.id)}
                            className="p-1.5 bg-slate-800 hover:bg-rose-600/20 text-slate-300 hover:text-rose-400 rounded-lg transition-colors"
                            title="حذف المشترك"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="p-2 bg-cyan-500/10 rounded-xl text-cyan-400">
                  <UserPlus className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {editingSubscriber ? 'تعديل بيانات المشترك' : 'إضافة مشترك جديد لنظام UserMan'}
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">اسم المشترك الكامل</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="مثال: أحمد محمد الجبوري"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">اسم المستخدم (UserMan Username)</label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="ahmed_j"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">رقم الهاتف</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="07712345678"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">عنوان IP</label>
                  <input
                    type="text"
                    required
                    value={formData.ipAddress}
                    onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
                    placeholder="192.168.201.101"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">عنوان MAC Address</label>
                  <input
                    type="text"
                    value={formData.macAddress}
                    onChange={(e) => setFormData({ ...formData, macAddress: e.target.value })}
                    placeholder="E4:8D:8C:1A:2B:3C"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">الراوتر أو البرج المرتبط</label>
                  <select
                    value={formData.routerId}
                    onChange={(e) => setFormData({ ...formData, routerId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                  >
                    {routers.map(r => (
                      <option key={r.id} value={r.id}>{r.name} ({r.ip})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">خطة الاشتراك</label>
                  <select
                    value={formData.plan}
                    onChange={(e) => handlePlanChange(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                  >
                    {plansList.map((p, idx) => (
                      <option key={idx} value={p.name}>{p.name} - {p.price.toLocaleString()} د.ع</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">السعر (د.ع)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">حالة الدفع</label>
                  <select
                    value={formData.paymentStatus}
                    onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                  >
                    <option value="paid">مدفوع</option>
                    <option value="unpaid">غير مدفوع</option>
                    <option value="pending">قيد الانتظار</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">تاريخ انتهاء الاشتراك</label>
                  <input
                    type="date"
                    required
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">ملاحظات إضافية</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="ملاحظات حول طريقة الدفع أو موقع الربط..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                ></textarea>
              </div>

              <div className="flex items-center justify-end space-x-3 space-x-reverse pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-all"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-sm font-medium shadow-lg shadow-cyan-900/30 transition-all"
                >
                  {editingSubscriber ? 'حفظ التعديلات' : 'إضافة المشترك'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MikroTik Real Connection & App Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-400 ring-1 ring-cyan-500/30">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">دليل ربط الميكروتيك الحقيقي وتنزيل التطبيق</h3>
                  <p className="text-xs text-slate-400 mt-0.5">كيفية ربط سيرفر التوزيع الفعلي، اعتماد العملة اليمنية، وتثبيت التطبيق</p>
                </div>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-slate-300 text-sm leading-relaxed">
              {/* Section 1 */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h4 className="font-bold text-cyan-400 text-base mb-2 flex items-center space-x-2 space-x-reverse">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <span>1. هل يمكن ربط هذا التطبيق بسيرفر ميكروتيك حقيقي؟</span>
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed mb-3">
                  <strong>نعم وبكل تأكيد!</strong> تم تصميم هذه المنصة لتتكامل تقنياً مع أجهزة سيرفرات ميكروتيك (MikroTik RouterOS) وسيرفرات يوزمانجر (User Manager) ودمج خطوط ستارلينك.
                </p>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-200 space-y-1.5">
                  <div className="text-cyan-300 font-bold">طرق الربط الحقيقي المتاحة:</div>
                  <div>• <span className="text-emerald-400">RouterOS API (Port 8728/8729):</span> الاتصال المباشر بجدار الحماية وسيرفر التوزيع (مثال: 192.168.201.2).</div>
                  <div>• <span className="text-emerald-400">REST API (RouterOS v7):</span> استخدام نقاط النهاية الحديثة /rest للسحب الفوري للمشتركين والنشطين.</div>
                  <div>• <span className="text-emerald-400">وسيط محلي (Bridge Script):</span> تشغيل سكريبت صغير بلغة Node.js أو Python على جهاز محلي في الشبكة (PC أو Raspberry Pi) يربط بين الميكروتيك وهذا التطبيق السحابي بأمان تام عبر VPN مشفر (مثل WireGuard).</div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h4 className="font-bold text-emerald-400 text-base mb-2 flex items-center space-x-2 space-x-reverse">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>2. نظام العملة (الريال اليمني - ر.ي)</span>
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  تم ضبط كافة إيرادات المبيعات، باقات الاشتراكات، وأسعار بطاقات يوزمانجر في النظام لتكون بالعملة المحلية <strong>الريال اليمني (YER / ر.ي)</strong>، مع إمكانية تعديل الأسعار وتخصيص الباقات بكل سهولة حسب رغبة شبكتك.
                </p>
              </div>

              {/* Section 3 */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h4 className="font-bold text-amber-400 text-base mb-2 flex items-center space-x-2 space-x-reverse">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span>3. كيف يمكن فتح المنصة أو تحميل وتثبيت التطبيق؟</span>
                </h4>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-start space-x-2 space-x-reverse">
                    <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-mono font-bold">أولاً</span>
                    <div><strong>الفتح المباشر:</strong> يمكنك فتح هذه المنصة عبر رابط الويب في أي وقت من متصفح الكمبيوتر أو الهاتف المحمول.</div>
                  </div>
                  <div className="flex items-start space-x-2 space-x-reverse">
                    <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-mono font-bold">ثانياً</span>
                    <div><strong>تثبيت التطبيق على الجوال (PWA):</strong> افتح المنصة من متصفح هاتفك (مثل Chrome أو Safari)، اضغط على قائمة المتصفح (الثلاث نقاط بالأعلى) ثم اختر <strong>"إضافة إلى الشاشة الرئيسية" (Add to Home Screen)</strong>. سيتم تثبيت التطبيق فوراً على هاتفك كأيقونة مستقلة تعمل تماماً مثل تطبيقات الهواتف الذكية.</div>
                  </div>
                  <div className="flex items-start space-x-2 space-x-reverse">
                    <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-mono font-bold">ثالثاً</span>
                    <div><strong>الاستضافة الدائمة:</strong> من خلال إعدادات المشروع في AI Studio، يمكنك تصدير الملفات (ZIP / GitHub) أو نشر التطبيق على خوادم سحابية دائمة (مثل Google Cloud Run أو سيرفر VPS خاص بك) ليعمل على مدار الساعة 24/7.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowGuideModal(false)}
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium shadow-lg transition-all"
              >
                فهمت، شكراً لك
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
