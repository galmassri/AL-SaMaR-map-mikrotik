import React, { useState } from 'react';
import { Smartphone, Shield, Download, Server, Cpu, CheckCircle2, Terminal, Globe, HelpCircle, ArrowRight, Wifi } from 'lucide-react';

export const MikroTikGuideView: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<'android' | 'ios' | 'pc'>('android');
  const [apiPort, setApiPort] = useState('8728');
  const [routerIp, setRouterIp] = useState('192.168.201.2');
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
            <span>خاص بهاتف جلاكسي نوت 20 وسيرفر 192.168.201.2</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            دليل تشغيل ومتابعة ميكروتيك الحقيقي على <span className="text-cyan-400">جلاكسي نوت 20</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-2 leading-relaxed">
            كيفية تحويل هذا التطبيق على هاتفك النوت 20 إلى نافذة حية تعرض مستخدمي شبكتك الفعلية على سيرفر (192.168.201.2) بالريال اليمني وبدون أرقام وهمية.
          </p>
        </div>
      </div>

      {/* Note 20 Specific Connection Explanation Card */}
      <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl ring-1 ring-cyan-500/30">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">كيف ترى بيانات ميكروتيك الحقيقية من هاتفك جلاكسي نوت 20؟</h2>
            <p className="text-xs text-slate-400 mt-0.5">لماذا تظهر البيانات تجريبياً في البداية وكيف نجعلها مطابقة 100% لسيرفرك 192.168.201.2</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="w-7 h-7 bg-amber-500/20 text-amber-400 rounded-lg flex items-center justify-center font-bold font-mono">1</span>
            <h3 className="font-bold text-white text-sm">لماذا ظهرت أرقام وهمية؟</h3>
            <p className="text-slate-400 leading-relaxed">
              عند فتح التطبيق أول مرة، يتم عرض بيانات افتراضية لمعاينة واجهات النظام والمبيعات بالريال اليمني فوراً قبل ربط السيرفر الفعلي.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="w-7 h-7 bg-cyan-500/20 text-cyan-400 rounded-lg flex items-center justify-center font-bold font-mono">2</span>
            <h3 className="font-bold text-white text-sm">طبيعة عنوان IP 192.168.201.2</h3>
            <p className="text-slate-400 leading-relaxed">
              هذا الأيبس هو عنوان محلي داخل برجك أو شبكتك (Local IP). لكي تراه من الإنترنت أو السحابة، نحتاج إلى ربطه عبر <strong>VPN مشفر (WireGuard / Tailscale)</strong> أو <strong>وسيط (Bridge Script)</strong>.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="w-7 h-7 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center font-bold font-mono">3</span>
            <h3 className="font-bold text-white text-sm">خطواتك الفعلية من النوت 20</h3>
            <p className="text-slate-400 leading-relaxed">
              1. افتح تبويب <strong>"إعدادات ربط ميكروتيك"</strong> بالقائمة.<br/>
              2. أدخل أيبس 192.168.201.2 وكلمة المرور الحقيقية.<br/>
              3. اضغط <strong>مزامنة المشتركين</strong> لسحب المستخدمين النشطين فوراً.
            </p>
          </div>
        </div>
      </div>

      {/* Part 1: How to Install PWA on Note 20 */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl">
        <div className="flex items-center space-x-3 space-x-reverse mb-6">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl ring-1 ring-blue-500/20">
            <Download className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">تثبيت التطبيق على جلاكسي نوت 20 (PWA) للوصول السريع</h2>
            <p className="text-xs text-slate-400 mt-0.5">اجعل المنصة تطبيقاً مستقلاً على شاشة هاتفك النوت 20</p>
          </div>
        </div>

        <div className="bg-slate-950/70 p-6 rounded-2xl border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="w-7 h-7 bg-cyan-500/20 text-cyan-400 rounded-lg flex items-center justify-center font-bold text-xs font-mono">1</span>
              <h3 className="font-bold text-white text-sm">افتح متصفح كروم على نوت 20</h3>
              <p className="text-xs text-slate-400">افتح متصفح Google Chrome على هاتفك وافتح رابط المنصة الخاص بك.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="w-7 h-7 bg-cyan-500/20 text-cyan-400 rounded-lg flex items-center justify-center font-bold text-xs font-mono">2</span>
              <h3 className="font-bold text-white text-sm">قائمة الخيارات (⠇)</h3>
              <p className="text-xs text-slate-400">اضغط على زر القائمة (الثلاث نقاط) في أعلى يمين المتصفح.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="w-7 h-7 bg-cyan-500/20 text-cyan-400 rounded-lg flex items-center justify-center font-bold text-xs font-mono">3</span>
              <h3 className="font-bold text-white text-sm">تثبيت التطبيق (Install)</h3>
              <p className="text-xs text-slate-400">اختر <strong>"تثبيت التطبيق"</strong> أو <strong>"إضافة إلى الشاشة الرئيسية"</strong>. سيظهر شعار المنصة فوراً على شاشة هاتفك.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Connecting Real MikroTik */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl">
        <div className="flex items-center space-x-3 space-x-reverse mb-6">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl ring-1 ring-emerald-500/20">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">إعدادات الاتصال الفعلي بسيرفر 192.168.201.2</h2>
            <p className="text-xs text-slate-400 mt-0.5">أوامر RouterOS API لتفعيل السحب الفوري لمستخدمي الميكروتيك</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="font-bold text-white text-sm flex items-center space-x-2 space-x-reverse">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>أوامر التفعيل في Terminal الراوتر</span>
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">أيبس الراوتر</label>
                  <input
                    type="text"
                    value={routerIp}
                    onChange={(e) => setRouterIp(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">منفذ API</label>
                  <input
                    type="text"
                    value={apiPort}
                    onChange={(e) => setApiPort(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">أوامر RouterOS:</span>
                  <button
                    onClick={handleCopyScript}
                    className="text-xs bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1.5 rounded-lg transition-all"
                  >
                    {copiedScript ? 'تم النسخ!' : 'نسخ الأوامر'}
                  </button>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {rosScriptSample}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="font-bold text-white text-sm flex items-center space-x-2 space-x-reverse">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>ضمان التطابق التام بالريال اليمني</span>
              </h3>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-cyan-300">إيصالات الدفع والبطاقات:</div>
                  <p className="text-slate-400 text-[11px]">جميع أسعار الباقات، مبيعات يوزمانجر، وعمليات تسديد المشتركين تم ربطها بالريال اليمني (ر.ي) لتعكس تماماً إيرادات شبكتك الفعلية.</p>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-emerald-400">مراقبة المشتركين النشطين (Active):</div>
                  <p className="text-slate-400 text-[11px]">بمجرد ربط الـ API وحفظ بيانات الدخول من تبويب "إعدادات ربط ميكروتيك"، سيقوم التطبيق بعرض المشتركين الحقيقيين وحركة الاستهلاك لحظياً.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

