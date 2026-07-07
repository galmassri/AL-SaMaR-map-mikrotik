import React, { useState } from 'react';
import { TelegramLog } from '../types';
import { Send, CheckCircle2, ShieldAlert, Radio, RefreshCw, Settings, Bot } from 'lucide-react';

interface TelegramViewProps {
  telegramLogs: TelegramLog[];
  onSendTelegram: (message: string, category: string) => void;
}

export const TelegramView: React.FC<TelegramViewProps> = ({ telegramLogs, onSendTelegram }) => {
  const [customMsg, setCustomMsg] = useState('');
  const [category, setCategory] = useState('system');
  const [botToken, setBotToken] = useState('781923841:AAH_ALSaMaR_NET_Bot_Token_Example');
  const [chatId, setChatId] = useState('-1001849204910 (ALSaMaR-Alerts Channel)');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    onSendTelegram(customMsg, category);
    setCustomMsg('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2 space-x-reverse">
            <Send className="w-6 h-6 text-sky-400" />
            <span>تكامل تيليجرام والتنبيهات الفورية (Telegram Bot API)</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            استقبل التنبيهات المهمة مباشرة على هاتفك أو قناة التيليجرام الخاصة بشبكة ALSaMaR-NET (انقطاع الراوترات، الأمان، ملخص المبيعات).
          </p>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse bg-sky-950/80 text-sky-400 px-3.5 py-1.5 rounded-xl border border-sky-800/60 text-xs font-mono">
          <Bot className="w-4 h-4" />
          <span>Bot Status: Connected & Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Settings & Custom Sender (1 col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 space-x-reverse">
            <Settings className="w-4 h-4 text-cyan-400" />
            <span>إعدادات بوت تيليجرام والإرسال اليدوي</span>
          </h3>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 mb-1">Telegram Bot Token</label>
              <input
                type="text"
                value={botToken}
                onChange={(e) => setBotToken(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Chat ID / Channel ID</label>
              <input
                type="text"
                value={chatId}
                onChange={(e) => setChatId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>

          <form onSubmit={handleSend} className="space-y-3 pt-3 border-t border-slate-800">
            <h4 className="text-xs font-bold text-white font-sans">إرسال تقرسر أو تنبيه يدوي</h4>
            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="system">النظام العام</option>
                <option value="router">حالة الراوترات</option>
                <option value="security">تنبيهات الأمان</option>
                <option value="subscriber">المشتركين والمبيعات</option>
              </select>
            </div>
            <div>
              <textarea
                rows={3}
                placeholder="اكتب التنبيه أو التقرير هنا..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-500 text-white py-2.5 rounded-xl text-xs font-medium shadow-md transition-all flex items-center justify-center space-x-2 space-x-reverse"
            >
              <Send className="w-4 h-4" />
              <span>إرسال إلى قناة تيليجرام الآن</span>
            </button>
          </form>
        </div>

        {/* Telegram Logs Feed (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">سجل التنبيهات المرسلة عبر تيليجرام</h3>
            <span className="text-xs text-slate-400 font-mono">{telegramLogs.length} إشعار مسجل</span>
          </div>

          <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
            {telegramLogs.map((log) => (
              <div key={log.id} className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 flex items-start justify-between gap-4">
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${log.level === 'success' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50' : log.level === 'danger' ? 'bg-red-950 text-red-400 border border-red-800/50' : 'bg-amber-950 text-amber-400 border border-amber-800/50'}`}>
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 uppercase">{log.category}</span>
                      <span className="text-slate-400 text-xs font-mono">{log.timestamp}</span>
                    </div>
                    <p className="text-white text-xs mt-1.5 font-sans leading-relaxed">{log.message}</p>
                  </div>
                </div>
                <div className="shrink-0 flex items-center space-x-1 space-x-reverse text-emerald-400 text-xs font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تم الإرسال</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
