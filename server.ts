import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { initialRouters, initialSubnetDevices, initialAlerts, initialVouchers, initialTelegramLogs, initialSalesData, initialSubscribers } from "./src/data/mockData";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory data store for the session
  let routers = [...initialRouters];
  let subDevices = [...initialSubnetDevices];
  let alerts = [...initialAlerts];
  let vouchers = [...initialVouchers];
  let telegramLogs = [...initialTelegramLogs];
  let salesData = [...initialSalesData];
  let subscribers = [...initialSubscribers];

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.get("/api/network/data", (req, res) => {
    res.json({
      routers,
      subDevices,
      alerts,
      vouchers,
      telegramLogs,
      salesData,
      subscribers
    });
  });

  // Subscribers Management Endpoints
  app.get("/api/subscribers", (req, res) => {
    res.json(subscribers);
  });

  app.post("/api/subscribers", (req, res) => {
    const newSub = {
      id: `sub-${Date.now()}`,
      name: req.body.name || 'مشترك جديد',
      username: req.body.username || `user_${Math.floor(Math.random() * 1000)}`,
      phone: req.body.phone || '07700000000',
      ipAddress: req.body.ipAddress || '192.168.201.150',
      macAddress: req.body.macAddress || 'AA:BB:CC:DD:EE:FF',
      plan: req.body.plan || 'اشتراك 30 جيجابايت - شهري',
      price: Number(req.body.price) || 25000,
      status: req.body.status || 'active',
      paymentStatus: req.body.paymentStatus || 'unpaid',
      expiryDate: req.body.expiryDate || new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      routerId: req.body.routerId || routers[0]?.id || 'router-tower-north',
      notes: req.body.notes || 'تمت الإضافة عبر النظام'
    };
    subscribers.unshift(newSub);
    res.json({ success: true, subscriber: newSub, subscribers });
  });

  app.put("/api/subscribers/:id", (req, res) => {
    const { id } = req.params;
    subscribers = subscribers.map(sub => sub.id === id ? { ...sub, ...req.body } : sub);
    res.json({ success: true, subscribers });
  });

  app.delete("/api/subscribers/:id", (req, res) => {
    const { id } = req.params;
    subscribers = subscribers.filter(sub => sub.id !== id);
    res.json({ success: true, subscribers });
  });

  app.post("/api/subscribers/toggle-payment/:id", (req, res) => {
    const { id } = req.params;
    subscribers = subscribers.map(sub => {
      if (sub.id === id) {
        const nextPayment = sub.paymentStatus === 'paid' ? 'unpaid' : 'paid';
        return { ...sub, paymentStatus: nextPayment };
      }
      return sub;
    });
    res.json({ success: true, subscribers });
  });

  // Routers management
  app.post("/api/routers", (req, res) => {
    const newRouter = {
      id: `router-${Date.now()}`,
      ...req.body,
      status: 'online',
      cpuUsage: Math.floor(Math.random() * 30) + 10,
      memoryUsage: Math.floor(Math.random() * 40) + 20,
      uptime: '0d 01h 12m',
      temperature: 39,
      rxBytes: '12.4 GB',
      txBytes: '5.1 GB',
      connectedClients: Math.floor(Math.random() * 50) + 5
    };
    routers.push(newRouter);
    res.json({ success: true, router: newRouter });
  });

  // Subnet scan simulation
  app.post("/api/subnet/scan", (req, res) => {
    // Simulate finding new devices
    const newDiscovered = [
      {
        id: `dev-${Date.now()}-1`,
        ip: `192.168.201.${Math.floor(Math.random() * 100) + 120}`,
        mac: 'AA:BB:CC:' + Math.floor(Math.random()*89+10) + ':' + Math.floor(Math.random()*89+10) + ':' + Math.floor(Math.random()*89+10),
        deviceName: 'Discovered-User-AP',
        vendor: 'Ubiquiti / TP-Link',
        status: 'active' as const,
        signal: '-67 dBm',
        downloadRate: '18.5 Mbps',
        uploadRate: '3.2 Mbps',
        imported: false,
        routerId: routers[1]?.id || 'router-distribution-rb1100'
      }
    ];
    subDevices.push(...newDiscovered);
    res.json({ success: true, count: newDiscovered.length, devices: newDiscovered });
  });

  app.post("/api/subdevices/import", (req, res) => {
    const { id } = req.body;
    subDevices = subDevices.map(d => d.id === id ? { ...d, imported: true } : d);
    res.json({ success: true, subDevices });
  });

  // Vouchers generation
  app.post("/api/vouchers/generate", (req, res) => {
    const { count, profileName, price, duration, dataLimit, distributor } = req.body;
    const generated = [];
    for (let i = 0; i < (count || 5); i++) {
      const code = `SMAR-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
      generated.push({
        id: `v-${Date.now()}-${i}`,
        code,
        profileName: profileName || 'كارت قياسي',
        price: Number(price) || 5000,
        duration: duration || '7 أيام',
        dataLimit: dataLimit || '5 GB',
        status: 'unused' as const,
        distributor: distributor || 'المركز الرئيسي',
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
      });
    }
    vouchers.unshift(...generated);
    res.json({ success: true, vouchers });
  });

  // Telegram simulation
  app.post("/api/telegram/send", (req, res) => {
    const { message, category } = req.body;
    const newLog = {
      id: `tg-${Date.now()}`,
      timestamp: 'الآن',
      level: 'success' as const,
      category: category || 'system',
      message: message || 'تقرير حالة الشبكة اليدوي من المنصة.',
      sent: true
    };
    telegramLogs.unshift(newLog);
    res.json({ success: true, telegramLogs });
  });

  // Resolve Alert
  app.post("/api/alerts/resolve", (req, res) => {
    const { id } = req.body;
    alerts = alerts.map(a => a.id === id ? { ...a, status: 'resolved' as const } : a);
    res.json({ success: true, alerts });
  });

  // AI Diagnostic Advisor using Gemini API
  app.post("/api/ai-diagnose", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({
          analysis: "⚠️ مفتاح Gemini API غير متوفر. يرجى ضبط المفتاح في إعدادات المنصة.",
          recommendations: ["تحقق من ملف .env.example", "أدخل مفتاح Gemini الصحيح في الإعدادات"]
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `أنت مهندس شبكات ومختص في إدارة سرفرات MikroTik (RB1100AHx4 برقم إصدار 6.49.19 ودمج Starlink على IP 192.168.201.1 والتوزيع على 192.168.201.2).
قم بتحليل حالة الشبكة التالية وتقديم تقرير تشخيص واحترافي باللغة العربية مع توصيات دقيقة:
- عدد الراوترات: ${routers.length}
- الراوترات النشطة والتحذيرات: ${JSON.stringify(routers.map(r => ({ name: r.name, ip: r.ip, cpu: r.cpuUsage, temp: r.temperature, status: r.status })))}
- التنبيهات النشطة: ${JSON.stringify(alerts.filter(a => a.status === 'active'))}
- مبيعات الكروت ونظام UserMan: نشط ويعمل بكفاءة.

أعطني تحليلاً احترافياً من 3 فقرات مع قائمة بـ 4 توصيات تقنية عملية لضمان استقرار الشبكة ومنع انقطاع الإنترنت.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      res.json({
        analysis: response.text || "تم فحص الشبكة بنجاح بواسطة الذكاء الاصطناعي.",
        recommendations: [
          "تفعيل خاصية DHCP Snooping على سويتشات التوزيع لمنع خوادم DHCP الوهمية.",
          "مراقبة درجات حرارة أجهزة الأبراج الخارجية وبرمجة مراوح التبريد الآلية.",
          "ضبط قواعد PCC Load Balancing للخطين Starlink لتحقيق أقصى استقرار للـ Ping.",
          "تحديث قواعد UserMan وتنظيف الحسابات المنتهية بشكل دوري."
        ]
      });
    } catch (error: any) {
      console.error("Gemini AI error:", error);
      res.status(500).json({ error: error.message || "Failed to generate AI diagnosis" });
    }
  });

  // Vite middleware setup for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ALSaMaR-NET MikroTik Server running on http://localhost:${PORT}`);
  });
}

startServer();
