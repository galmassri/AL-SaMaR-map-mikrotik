import React, { useState, useEffect } from 'react';
import { Server, Shield, CheckCircle2, AlertTriangle, RefreshCw, Lock, Globe, Terminal, Save, Key, Wifi } from 'lucide-react';

interface MikroTikConfig {
  ip: string;
  port: string;
  username: string;
  password: string;
  useSsl: boolean;
  isConnected: boolean;
  lastSyncTime: string;
}

export const MikroTikSettingsView: React.FC = () => {
  const [config, setConfig] = useState<MikroTikConfig>({
    ip: '192.168.201.2',
    port: '8728',
    username: 'alsamar_admin',
    password: '',
    useSsl: false,
    isConnected: true,
    lastSyncTime: 'غير متصل بعد'
  });

  const [loading, setLoading] = useState(false);
  const [testing, setTesting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/mikrotik/config');
      const data = await res.json();
      if (data) {
        setConfig(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/mikrotik/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage({ type: 'success', text: 'تم حفظ إعدادات الاتصال بميكروتيك بنجاح وتحديث بيانات الاعتماد.' });
      }
    } catch (e) {
      setStatusMessage({ type: 'error', text: 'حدث خطأ أثناء حفظ الإعدادات.' });
    } finally {
      setLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/mikrotik/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage({ type: 'success', text: `${data.message} (زمن الاستجابة: ${data.latency})` });
        setConfig(prev => ({ ...prev, isConnected: true }));
      } else {
        setStatusMessage({ type: 'error', text: data.message || 'فشل الاتصال بسيرفر الميكروتيك.' });
        setConfig(prev => ({ ...prev, isConnected: false }));
      }
    } catch (e) {
      setStatusMessage({ type: 'error', text: 'تعذر الاتصال بالخادم. تأكد من صحة عنوان IP ومنفذ API.' });
    } finally {
      setTesting(false);
    }
  };

  const handleSyncNow = async () => {
    setSyncing(true);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/mikrotik/sync', {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage({ type: 'success', text: data.message });
        setConfig(prev => ({ ...prev, lastSyncTime: new Date().toLocaleTimeString('ar-IQ') }));
      }
    } catch (e) {
      setStatusMessage({ type: 'error', text: 'حدث خطأ أثناء مزامنة البيانات.' });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 ring-1 ring-cyan-500/30">
            <Server className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">إعدادات ربط سيرفر الميكروتيك (API)</h1>
            <p className="text-sm text-slate-400 mt-0.5">
              ربط مباشر وحقيقي بسيرفر التوزيع (IP: 192.168.201.2) عبر بروتوكول RouterOS API
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 space-x-reverse">
          <div className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-medium flex items-center space-x-2 space-x-reverse ${
            config.isConnected ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
          }`}>
            <span className={`w-2 h-2 rounded-full ${config.isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`}></span>
            <span>{config.isConnected ? 'متصل بنجاح (API Active)' : 'غير متصل'}</span>
          </div>
        </div>
      </div>

      {statusMessage && (
        <div className={`p-4 rounded-xl border text-sm flex items-center space-x-3 space-x-reverse ${
          statusMessage.type === 'success'
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
        }`}>
          {statusMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Main Form & Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Form (2 columns) */}
        <div className="lg:col-span-2 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <form onSubmit={handleSave} className="space-y-5">
            <div className="flex items-center space-x-2 space-x-reverse text-cyan-400 font-bold border-b border-slate-800 pb-3">
              <Terminal className="w-5 h-5" />
              <span>بيانات الاتصال بسيرفر RouterOS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">عنوان IP لسيرفر الميكروتيك</label>
                <input
                  type="text"
                  required
                  value={config.ip}
                  onChange={(e) => setConfig({ ...config, ip: e.target.value })}
                  placeholder="192.168.201.2"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">مثال: سيرفر التوزيع الرئيسي 192.168.201.2</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">منفذ الـ API (RouterOS Port)</label>
                <input
                  type="text"
                  required
                  value={config.port}
                  onChange={(e) => setConfig({ ...config, port: e.target.value })}
                  placeholder="8728"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">الافتراضي: 8728 (أو 8729 لـ SSL)</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">اسم المستخدم (API Username)</label>
                <input
                  type="text"
                  required
                  value={config.username}
                  onChange={(e) => setConfig({ ...config, username: e.target.value })}
                  placeholder="alsamar_admin"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">كلمة المرور (Password)</label>
                <div className="relative">
                  <Key className="absolute right-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    required
                    value={config.password}
                    onChange={(e) => setConfig({ ...config, password: e.target.value })}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-10 pl-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 space-x-reverse pt-2">
              <input
                type="checkbox"
                id="useSsl"
                checked={config.useSsl}
                onChange={(e) => setConfig({ ...config, useSsl: e.target.checked })}
                className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
              />
              <label htmlFor="useSsl" className="text-xs text-slate-300 cursor-pointer select-none">
                تفعيل الاتصال المشفر الآمن (SSL / API-SSL Port 8729)
              </label>
            </div>

            <div className="flex items-center justify-end space-x-3 space-x-reverse pt-4 border-t border-slate-800">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 space-x-reverse bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium px-6 py-2.5 rounded-xl shadow-lg shadow-cyan-900/30 transition-all text-sm"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? 'جاري الحفظ...' : 'حفظ بيانات الاعتماد'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Status & Actions Card (1 column) */}
        <div className="space-y-6">
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center space-x-2 space-x-reverse">
              <Wifi className="w-4 h-4 text-cyan-400" />
              <span>فحص ومزامنة البيانات الفورية</span>
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed">
              قم باختبار الاتصال المباشر بسيرفر ميكروتيك لضمان استجابة الـ API، أو مزامنة المشتركين وحالة الاتصال الحالية (Active Connections) فوراً.
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2 font-mono">
              <div className="flex justify-between text-slate-400">
                <span>آخر مزامنة ناجحة:</span>
                <span className="text-cyan-300">{config.lastSyncTime}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>إصدار الراوتر:</span>
                <span className="text-emerald-400">RouterOS v6.49.19</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testing}
                className="w-full flex items-center justify-center space-x-2 space-x-reverse bg-slate-800 hover:bg-slate-700 text-cyan-300 font-medium py-3 rounded-xl border border-slate-700 transition-all text-xs"
              >
                {testing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                <span>{testing ? 'جاري اختبار الاتصال...' : 'اختبار الاتصال المباشر (Test Ping)'}</span>
              </button>

              <button
                type="button"
                onClick={handleSyncNow}
                disabled={syncing}
                className="w-full flex items-center justify-center space-x-2 space-x-reverse bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl shadow-lg shadow-emerald-900/30 transition-all text-xs"
              >
                {syncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                <span>{syncing ? 'جاري سحب البيانات...' : 'مزامنة المشتركين من ميكروتيك الآن'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
