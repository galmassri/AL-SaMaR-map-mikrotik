import React, { useState } from 'react';
import { Smartphone, Shield, Download, Server, Cpu, CheckCircle2, Terminal, Globe, HelpCircle, ArrowRight } from 'lucide-react';

export const MikroTikGuideView: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<'android' | 'ios' | 'pc'>('android');
  const [apiPort, setApiPort] = useState('8728');
  const [routerIp, setRouterIp] = useState('192.168.1.1');
  const [apiUser, setApiUser] = useState('alsamar_api');
  const [copiedScript, setCopiedScript] = useState(false);

  const rosScriptSample = `/ip service set api port=${apiPort} disabled=no
/user group add name=alsamar-group policy=read,write,test,api,!ftp,!ssh,!telnet,!reboot
/user add name=${apiUser} password=SecurePass2026! group=alsamar-group comment="ALSaMaR-NET Cloud Integration"`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(rosScriptSample);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-xs font-mono font-medium border border-cyan-500/20 mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>الدليل الشامل للربط والتثبيت الآمن</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            دليل تثبيت تطبيق <span className="text-cyan-400">ALSaMaR-NET</span> على الهواتف والربط الفعلي بميكروتيك
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-2 leading-relaxed">
            تعرف خطوة بخطوة على كيفية تثبيت النظام كتطبيق جوال (PWA) يعمل بدون توقف، وكيفية ربط سيرفر التوزيع الحقيقي (RouterOS / UserMan) بالمنصة، واعتماد عملة الريال اليمني.
          </p>
        </div>
      </div>

      {/* Part 1: How to Install PWA on Phone */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl">
        <div className="flex items-center space-x-3 space-x-reverse mb-6">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl ring-1 ring-blue-500/20">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">أولاً: كيفية تثبيت التطبيق (PWA) على هاتف المحمول</h2>
            <p className="text-xs text-slate-400 mt-0.5">يعمل التطبيق كبرنامج مستقل على شاشة هاتفك الرئيسية تماماً مثل تطبيقات المتجر</p>
          </div>
        </div>

        {/* Platform Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActivePlatform('android')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center space-x-2 space-x-reverse ${
              activePlatform === 'android'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <span>📱 هواتف أندرويد (Android / Chrome)</span>
          </button>
          <button
            onClick={() => setActivePlatform('ios')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center space-x-2 space-x-reverse ${
              activePlatform === 'ios'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <span>🍏 هواتف آيفون (iPhone / Safari)</span>
          </button>
          <button
            onClick={() => setActivePlatform('pc')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center space-x-2 space-x-reverse ${
              activePlatform === 'pc'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <span>💻 أجهزة الكمبيوتر (PC / Mac)</span>
          </button>
        </div>

        {/* Steps Content */}
        <div className="bg-slate-950/70 p-6 rounded-2xl border border-slate-800">
          {activePlatform === 'android' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-cyan-300">خطوات التثبيت على أجهزة أندرويد (متصفح كروم):</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="w-7 h-7 bg-cyan-500/20 text-cyan-400 rounded-lg flex items-center justify-center font-bold text-xs font-mono">1</span>
                  <h4 className="font-bold text-white text-sm">فتح رابط المنصة</h4>
                  <p className="text-xs text-slate-400">افتح متصفح Google Chrome على هاتفك وقم بزيارة رابط المنصة الخاص بشبكتك.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="w-7 h-7 bg-cyan-500/20 text-cyan-400 rounded-lg flex items-center justify-center font-bold text-xs font-mono">2</span>
                  <h4 className="font-bold text-white text-sm">قائمة الخيارات</h4>
                  <p className="text-xs text-slate-400">اضغط على زر القائمة (النقاط الثلاث الرأسية ⠇) في أعلى يمين أو يسار المتصفح.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="w-7 h-7 bg-cyan-500/20 text-cyan-400 rounded-lg flex items-center justify-center font-bold text-xs font-mono">3</span>
                  <h4 className="font-bold text-white text-sm">إضافة للشاشة الرئيسية</h4>
                  <p className="text-xs text-slate-400">اختر <strong>"تثبيت التطبيق" (Install app)</strong> أو <strong>"الإضافة إلى الشاشة الرئيسية" (Add to Home screen)</strong>.</p>
                </div>
              </div>
            </div>
          )}

          {activePlatform === 'ios' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-cyan-300">خطوات التثبيت على أجهزة آيفون (متصفح سفاري):</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="w-7 h-7 bg-cyan-500/20 text-cyan-400 rounded-lg flex items-center justify-center font-bold text-xs font-mono">1</span>
                  <h4 className="font-bold text-white text-sm">افتح متصفح Safari</h4>
                  <p className="text-xs text-slate-400">قم بفتح رابط المنصة حصرياً عبر متصفح سفاري الافتراضي في الآيفون.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="w-7 h-7 bg-cyan-500/20 text-cyan-400 rounded-lg flex items-center justify-center font-bold text-xs font-mono">2</span>
                  <h4 className="font-bold text-white text-sm">زر المشاركة (Share)</h4>
                  <p className="text-xs text-slate-400">اضغط على زر المشاركة الموجود في أسفل الشاشة (أيقونة المربع الخارج منه سهم).</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="w-7 h-7 bg-cyan-500/20 text-cyan-400 rounded-lg flex items-center justify-center font-bold text-xs font-mono">3</span>
                  <h4 className="font-bold text-white text-sm">إضافة إلى الصفحة الرئيسية</h4>
                  <p className="text-xs text-slate-400">مرر لأسفل القائمة واختار <strong>"إضافة إلى الصفحة الرئيسية" (Add to Home Screen)</strong> ثم اضغط إضافة.</p>
                </div>
              </div>
            </div>
          )}

          {activePlatform === 'pc' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-cyan-300">خطوات التثبيت على الكمبيوتر (Chrome / Edge):</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                انظر إلى شريط العنوان في متصفح الكمبيوتر (في أقصى اليمين أو اليسار), ستلاحظ ظهور أيقونة صغيرة على شكل شاشة بها سهم تنزيل (<Download className="w-3.5 h-3.5 inline mx-1 text-cyan-400" />). انقر عليها واضغط <strong>Install</strong> لفتح النظام كتطبيق سطح مكتب مستقل تماماً عن علامات تبويب المتصفح.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Part 2: Connecting Real MikroTik */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl">
        <div className="flex items-center space-x-3 space-x-reverse mb-6">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl ring-1 ring-emerald-500/20">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">ثانياً: كيف تضيف سيرفر ميكروتيك الحقيقي إلى التطبيق؟</h2>
            <p className="text-xs text-slate-400 mt-0.5">ربط بيانات السيرفر (RouterOS API / UserMan) لجلب المشتركين وحالة الشبكة الفورية</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Config Generator */}
          <div className="space-y-4">
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="font-bold text-white text-sm flex items-center space-x-2 space-x-reverse">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>إعدادات الاتصال بميكروتيك (RouterOS API)</span>
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">أيبس الراوتر الرئيسي (IP)</label>
                  <input
                    type="text"
                    value={routerIp}
                    onChange={(e) => setRouterIp(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">منفذ API (Default: 8728)</label>
                  <input
                    type="text"
                    value={apiPort}
                    onChange={(e) => setApiPort(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">اسم مستخدم API مخصص للصلاحيات</label>
                <input
                  type="text"
                  value={apiUser}
                  onChange={(e) => setApiUser(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">أوامر RouterOS لتفعيل الربط (انسخ والصق في Terminal):</span>
                  <button
                    onClick={handleCopyScript}
                    className="text-xs bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1 space-x-reverse"
                  >
                    <span>{copiedScript ? 'تم النسخ بنجاح!' : 'نسخ الأوامر'}</span>
                  </button>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {rosScriptSample}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Connection Architectures */}
          <div className="space-y-4">
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="font-bold text-white text-sm flex items-center space-x-2 space-x-reverse">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>خيارات الربط السحابي والمحلي</span>
              </h3>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-cyan-300">1. الربط المباشر (Public IP / DDNS):</div>
                  <p className="text-slate-400 text-[11px]">إذا كان لديك عنوان IP حقيقي ثابت على سيرفر ميكروتيك التوزيع, قم بفتح منفذ 8728/8729 في IP &gt; Firewall وتوجيهه مباشرة مع تأمين كلمة المرور.</p>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-cyan-300">2. الربط عبر وسيط محلي (VPN / Bridge Node):</div>
                  <p className="text-slate-400 text-[11px]">الأكثر أماناً: تشغيل سكريبت Node.js خفيف على جهاز كمبيوتر أو راوتر ثانٍ داخل الشبكة المحلية متصل بسيرفر التوزيع, ويقوم بدفع البيانات الآمنة (Subscribers & Traffic) إلى هذه المنصة السحابية تلقائياً.</p>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-emerald-400">3. اعتماد العملة (الريال اليمني - ر.ي):</div>
                  <p className="text-slate-400 text-[11px]">تم اعتماد الريال اليمني كعملة أساسية لكل الاشتراكات، مبيعات بطاقات يوزمانجر، وإيصالات الدفع النقدية وعبر شبكات الصرافة المحلية.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
