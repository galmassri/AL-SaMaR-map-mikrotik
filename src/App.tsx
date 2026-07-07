import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar, TabType } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { MapView } from './components/MapView';
import { DiscoveryView } from './components/DiscoveryView';
import { DiagnosticsView } from './components/DiagnosticsView';
import { VouchersView } from './components/VouchersView';
import { TelegramView } from './components/TelegramView';
import { LiveMonitoringView } from './components/LiveMonitoringView';
import { SubscribersView } from './components/SubscribersView';
import { RouterDevice, SubnetDevice, DiagnosticAlert, VoucherCard, TelegramLog, SalesRecord, Subscriber } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [routers, setRouters] = useState<RouterDevice[]>([]);
  const [subDevices, setSubDevices] = useState<SubnetDevice[]>([]);
  const [alerts, setAlerts] = useState<DiagnosticAlert[]>([]);
  const [vouchers, setVouchers] = useState<VoucherCard[]>([]);
  const [telegramLogs, setTelegramLogs] = useState<TelegramLog[]>([]);
  const [salesData, setSalesData] = useState<SalesRecord[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  // New Router Modal State
  const [showNewRouterModal, setShowNewRouterModal] = useState(false);
  const [newRouterName, setNewRouterName] = useState('');
  const [newRouterIp, setNewRouterIp] = useState('192.168.201.');
  const [newRouterModel, setNewRouterModel] = useState('MikroTik hEX S');
  const [newRouterType, setNewRouterType] = useState<'tower' | 'switch' | 'ap'>('tower');

  // Telegram Modal State
  const [showTelegramModal, setShowTelegramModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/network/data');
      const data = await res.json();
      setRouters(data.routers);
      setSubDevices(data.subDevices);
      setAlerts(data.alerts);
      setVouchers(data.vouchers);
      setTelegramLogs(data.telegramLogs);
      setSalesData(data.salesData);
      setSubscribers(data.subscribers || []);
    } catch (e) {
      console.error("Failed to fetch network data", e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubscriber = async (subscriberData: Partial<Subscriber>) => {
    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscriberData)
      });
      const data = await res.json();
      if (data.success) {
        setSubscribers(data.subscribers);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateSubscriber = async (id: string, subscriberData: Partial<Subscriber>) => {
    try {
      const res = await fetch(`/api/subscribers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscriberData)
      });
      const data = await res.json();
      if (data.success) {
        setSubscribers(data.subscribers);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    try {
      const res = await fetch(`/api/subscribers/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setSubscribers(data.subscribers);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleTogglePayment = async (id: string) => {
    try {
      const res = await fetch(`/api/subscribers/toggle-payment/${id}`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        setSubscribers(data.subscribers);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddRouter = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/routers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newRouterName,
          ip: newRouterIp,
          model: newRouterModel,
          type: newRouterType,
          firmware: '6.49.19',
          location: { x: 40, y: 50, lat: 33.32, lng: 44.36, siteName: newRouterName }
        })
      });
      const data = await res.json();
      if (data.success) {
        setRouters(prev => [...prev, data.router]);
        setShowNewRouterModal(false);
        setNewRouterName('');
        setNewRouterIp('192.168.201.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleScanSubnet = async () => {
    try {
      const res = await fetch('/api/subnet/scan', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setSubDevices(prev => [...prev, ...data.devices]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleImportDevice = async (id: string) => {
    try {
      const res = await fetch('/api/subdevices/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        setSubDevices(data.subDevices);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleGenerateVouchers = async (formData: any) => {
    try {
      const res = await fetch('/api/vouchers/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setVouchers(data.vouchers);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendTelegram = async (message: string, category: string) => {
    try {
      const res = await fetch('/api/telegram/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, category })
      });
      const data = await res.json();
      if (data.success) {
        setTelegramLogs(data.telegramLogs);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleResolveAlert = async (id: string) => {
    try {
      const res = await fetch('/api/alerts/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        setAlerts(data.alerts);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-sm font-mono text-cyan-400">جاري تحميل منصة ALSaMaR-NET MikroTik Map...</div>
        </div>
      </div>
    );
  }

  const activeAlertsCount = alerts.filter(a => a.status === 'active').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none" dir="rtl">
      
      {/* Top Navbar */}
      <Navbar
        onOpenNewRouter={() => setShowNewRouterModal(true)}
        onOpenTelegramModal={() => setActiveTab('telegram')}
        onRunAIScan={() => setActiveTab('diagnostics')}
        lastSync="الآن"
      />

      {/* Main Layout Body */}
      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeAlertsCount={activeAlertsCount}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'overview' && (
              <DashboardView
                routers={routers}
                alerts={alerts}
                vouchers={vouchers}
                salesData={salesData}
                onNavigate={setActiveTab}
                onOpenNewRouter={() => setShowNewRouterModal(true)}
              />
            )}
            {activeTab === 'map' && (
              <MapView
                routers={routers}
                onOpenNewRouter={() => setShowNewRouterModal(true)}
              />
            )}
            {activeTab === 'discovery' && (
              <DiscoveryView
                subDevices={subDevices}
                onImportDevice={handleImportDevice}
                onScanSubnet={handleScanSubnet}
              />
            )}
            {activeTab === 'diagnostics' && (
              <DiagnosticsView
                alerts={alerts}
                onResolveAlert={handleResolveAlert}
              />
            )}
            {activeTab === 'vouchers' && (
              <VouchersView
                vouchers={vouchers}
                salesData={salesData}
                onGenerateVouchers={handleGenerateVouchers}
              />
            )}
            {activeTab === 'telegram' && (
              <TelegramView
                telegramLogs={telegramLogs}
                onSendTelegram={handleSendTelegram}
              />
            )}
            {activeTab === 'monitoring' && (
              <LiveMonitoringView />
            )}
            {activeTab === 'subscribers' && (
              <SubscribersView
                subscribers={subscribers}
                routers={routers}
                onAddSubscriber={handleAddSubscriber}
                onUpdateSubscriber={handleUpdateSubscriber}
                onDeleteSubscriber={handleDeleteSubscriber}
                onTogglePayment={handleTogglePayment}
                onSendTelegram={handleSendTelegram}
              />
            )}
          </div>
        </main>

      </div>

      {/* Add New Router Modal */}
      {showNewRouterModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">إضافة راوتر أو جهاز جديد للشبكة</h3>
              <button onClick={() => setShowNewRouterModal(false)} className="text-slate-400 hover:text-white text-lg">✕</button>
            </div>

            <form onSubmit={handleAddRouter} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">اسم الموقع أو الجهاز</label>
                <input
                  type="text"
                  placeholder="مثال: برج حي العامل"
                  value={newRouterName}
                  onChange={(e) => setNewRouterName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">عنوان IP (نطاق 192.168.201.x)</label>
                <input
                  type="text"
                  value={newRouterIp}
                  onChange={(e) => setNewRouterIp(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">موديل MikroTik</label>
                <select
                  value={newRouterModel}
                  onChange={(e) => setNewRouterModel(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="MikroTik RB1100AHx4">RB1100AHx4 (توزيع)</option>
                  <option value="MikroTik CCR1036">CCR1036 (دمج/كور)</option>
                  <option value="MikroTik NetBox 5">NetBox 5 (برج لاسلكي)</option>
                  <option value="MikroTik hEX S">hEX S</option>
                  <option value="MikroTik CSS326 Switch">CSS326 Switch</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">نوع الجهاز</label>
                <select
                  value={newRouterType}
                  onChange={(e: any) => setNewRouterType(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="tower">برج إرسال لاسلكي</option>
                  <option value="switch">سويتش شبكة</option>
                  <option value="ap">نقطة وصول AP</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end space-x-3 space-x-reverse">
                <button
                  type="button"
                  onClick={() => setShowNewRouterModal(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2.5 rounded-xl text-xs font-medium"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2.5 rounded-xl text-xs font-medium shadow-lg"
                >
                  حفظ وإضافة للنظام
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
