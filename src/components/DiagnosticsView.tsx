import React, { useState } from 'react';
import { DiagnosticAlert } from '../types';
import { Stethoscope, ShieldAlert, Cpu, CheckCircle2, AlertTriangle, RefreshCw, Sparkles, Terminal } from 'lucide-react';

interface DiagnosticsViewProps {
  alerts: DiagnosticAlert[];
  onResolveAlert: (id: string) => void;
}

export const DiagnosticsView: React.FC<DiagnosticsViewProps> = ({ alerts, onResolveAlert }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [aiReport, setAiReport] = useState<{ analysis: string; recommendations: string[] } | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const runComprehensiveScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 2000);
  };

  const fetchAiDiagnosis = async () => {
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/ai-diagnose', { method: 'POST' });
      const data = await res.json();
      setAiReport(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2 space-x-reverse">
            <Stethoscope className="w-6 h-6 text-cyan-400" />
            <span>التشخيص الذكي والفحص المتقدم لشبكة MikroTik</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            فحص شامل بضغطة واحدة لاكتشاف حلقات الشبكة (Loops)، خوادم DHCP غير المصرح بها، مشاكل الوايرلس، وارتفاع الحرارة.
          </p>
        </div>
        <div className="flex items-center space-x-3 space-x-reverse">
          <button
            onClick={fetchAiDiagnosis}
            disabled={isAiLoading}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-4 py-2.5 rounded-xl text-xs font-medium shadow-lg transition-all flex items-center space-x-2 space-x-reverse"
          >
            <Sparkles className={`w-4 h-4 ${isAiLoading ? 'animate-spin' : ''}`} />
            <span>{isAiLoading ? 'جاري التحليل بالذكاء الاصطناعي...' : 'تحليل الذكاء الاصطناعي (Gemini)'}</span>
          </button>
          <button
            onClick={runComprehensiveScan}
            disabled={isScanning}
            className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2.5 rounded-xl text-xs font-medium shadow-lg transition-all flex items-center space-x-2 space-x-reverse"
          >
            <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'جاري الفحص المتقدم...' : 'فحص شامل جديد'}</span>
          </button>
        </div>
      </div>

      {/* AI Report Card if available */}
      {aiReport && (
        <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-800/60 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-indigo-900/60 rounded-xl flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">تقرير التشخيص الذكي من مساعد Gemini AI</h3>
              <p className="text-xs text-indigo-300 font-mono">بناءً على حالة سيرفر RB1100AHx4 (192.168.201.2) ودمج Starlink</p>
            </div>
          </div>
          <div className="text-sm text-slate-300 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 leading-relaxed font-sans">
            {aiReport.analysis}
          </div>
          <div>
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 font-mono">التوصيات والإجراءات الفورية المقترحة:</h4>
            <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
              {aiReport.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-center space-x-2 space-x-reverse bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Diagnostic Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-white">حلقات الشبكة (Loop Detection)</h4>
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/50"></span>
          </div>
          <p className="text-xs text-slate-400">فحص STP/RSTP على جميع بوابات وسويتشات الشبكة لضمان عدم وجود عواصف بيانات (Broadcast Storms).</p>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-400 font-mono">
            ✓ حالة الاستقرار: ممتازة (0 Loops)
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-white">خوادم DHCP غير المصرح بها</h4>
            <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></span>
          </div>
          <p className="text-xs text-slate-400">مراقبة حزم DHCP Offer الدخيلة على منافذ التوزيع لإنذار الإدارة عن أي جهاز يوزع IP وهمي.</p>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-amber-400 font-mono">
            ⚠️ تم اكتشاف خادم واحد في برج الشرق
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-white">فحص حرارة وطاقة الأجهزة</h4>
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/50"></span>
          </div>
          <p className="text-xs text-slate-400">مراقبة مستشعرات الحرارة والفولتية لكل من RB1100AHx4 وصناديق الأبراج الخارجية.</p>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-400 font-mono">
            ✓ المتوسط العام: 41°C (طبيعي)
          </div>
        </div>

      </div>

      {/* Active Alerts List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white">سجل التنبيهات والأخطاء التشخيصية</h3>

        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${alert.status === 'active' ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-900/60 border-slate-800 opacity-60'}`}>
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${alert.severity === 'critical' ? 'bg-red-950 text-red-400 border border-red-800/50' : 'bg-amber-950 text-amber-400 border border-amber-800/50'}`}>
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <h4 className="text-white text-sm font-bold">{alert.title}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">{alert.deviceName}</span>
                  </div>
                  <p className="text-slate-300 text-xs mt-1">{alert.description}</p>
                  <div className="text-cyan-400 text-xs mt-2 font-mono bg-cyan-950/40 p-2 rounded-lg border border-cyan-900/40">
                    💡 الإجراء المقترح: {alert.recommendedAction}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse shrink-0">
                <span className="text-xs text-slate-400 font-mono">{alert.timestamp}</span>
                {alert.status === 'active' ? (
                  <button
                    onClick={() => onResolveAlert(alert.id)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-medium shadow transition-all"
                  >
                    تحديد كمحلول
                  </button>
                ) : (
                  <span className="text-emerald-400 text-xs font-medium">تم الحل ✓</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
