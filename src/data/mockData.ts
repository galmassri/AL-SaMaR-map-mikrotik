import { RouterDevice, SubnetDevice, DiagnosticAlert, VoucherCard, TelegramLog, SalesRecord, Subscriber } from '../types';

export const initialRouters: RouterDevice[] = [
  {
    id: 'router-starlink-bonding',
    name: 'Starlink Dual-WAN Bonding',
    ip: '192.168.201.1',
    model: 'MikroTik CCR1036-8G-2S+',
    firmware: '6.49.19',
    status: 'online',
    cpuUsage: 14,
    memoryUsage: 32,
    uptime: '45d 12h 30m',
    temperature: 38,
    rxBytes: '425.8 GB',
    txBytes: '89.2 GB',
    type: 'core_bonding',
    location: { x: 50, y: 30, lat: 33.3152, lng: 44.3661, siteName: 'المركز الرئيسي - دمج الخطوط' },
    connectedClients: 2,
    signalStrength: '98% (Starlink 1 & 2)',
    gateway: 'WAN1 / WAN2 (Starlink)'
  },
  {
    id: 'router-distribution-rb1100',
    name: 'ALSaMaR-Distribution RB1100',
    ip: '192.168.201.2',
    model: 'MikroTik RB1100AHx4',
    firmware: '6.49.19',
    status: 'online',
    cpuUsage: 28,
    memoryUsage: 45,
    uptime: '18d 04h 15m',
    temperature: 41,
    rxBytes: '1.24 TB',
    txBytes: '3.65 TB',
    type: 'distribution',
    location: { x: 50, y: 55, lat: 33.3200, lng: 44.3750, siteName: 'برج التوزيع الرئيسي (يوزمانجر)' },
    connectedClients: 342,
    signalStrength: 'Gigabit Backbone',
    gateway: '192.168.201.1'
  },
  {
    id: 'router-tower-north',
    name: 'برج الشمال - SXTsq',
    ip: '192.168.201.15',
    model: 'MikroTik NetBox 5 / SXT',
    firmware: '6.49.17',
    status: 'online',
    cpuUsage: 19,
    memoryUsage: 54,
    uptime: '7d 14h 22m',
    temperature: 46,
    rxBytes: '180.4 GB',
    txBytes: '412.1 GB',
    type: 'tower',
    location: { x: 25, y: 35, lat: 33.3400, lng: 44.3200, siteName: 'حي الأزهري - برج الشمال' },
    connectedClients: 85,
    signalStrength: '-54 dBm (Excellent)'
  },
  {
    id: 'router-tower-east',
    name: 'برج الشرق - BaseBox',
    ip: '192.168.201.22',
    model: 'MikroTik BaseBox 5',
    firmware: '6.49.19',
    status: 'warning',
    cpuUsage: 76,
    memoryUsage: 82,
    uptime: '2d 09h 10m',
    temperature: 58,
    rxBytes: '310.2 GB',
    txBytes: '620.4 GB',
    type: 'tower',
    location: { x: 75, y: 40, lat: 33.3300, lng: 44.4200, siteName: 'شارع فلسطين - برج الشرق' },
    connectedClients: 124,
    signalStrength: '-72 dBm (Moderate)'
  },
  {
    id: 'router-switch-south',
    name: 'سويتش الحي الجنوبي',
    ip: '192.168.201.50',
    model: 'MikroTik CSS326-24G-2S+',
    firmware: 'SwOS 2.13',
    status: 'online',
    cpuUsage: 8,
    memoryUsage: 22,
    uptime: '30d 00h 00m',
    temperature: 35,
    rxBytes: '510.5 GB',
    txBytes: '490.1 GB',
    type: 'switch',
    location: { x: 60, y: 80, lat: 33.2900, lng: 44.3900, siteName: 'منطقة المسبح - سويتش توزيع' },
    connectedClients: 64,
    signalStrength: 'Fiber Link'
  }
];

export const initialSubnetDevices: SubnetDevice[] = [
  {
    id: 'dev-1',
    ip: '192.168.201.101',
    mac: 'E4:8D:8C:1A:2B:3C',
    deviceName: 'Ubiquiti LiteBeam 5AC',
    vendor: 'Ubiquiti Networks',
    status: 'active',
    signal: '-58 dBm',
    downloadRate: '15.4 Mbps',
    uploadRate: '4.2 Mbps',
    imported: true,
    routerId: 'router-tower-north'
  },
  {
    id: 'dev-2',
    ip: '192.168.201.105',
    mac: '68:72:51:99:88:77',
    deviceName: 'MikroTik wAP ac',
    vendor: 'RouterBOARD',
    status: 'active',
    signal: '-65 dBm',
    downloadRate: '28.1 Mbps',
    uploadRate: '8.5 Mbps',
    imported: true,
    routerId: 'router-distribution-rb1100'
  },
  {
    id: 'dev-3',
    ip: '192.168.201.142',
    mac: 'B4:FB:E4:33:22:11',
    deviceName: 'Unknown-Android-Phone',
    vendor: 'Samsung Electronics',
    status: 'idle',
    signal: '-78 dBm',
    downloadRate: '0.8 Mbps',
    uploadRate: '0.1 Mbps',
    imported: false,
    routerId: 'router-tower-east'
  },
  {
    id: 'dev-4',
    ip: '192.168.201.188',
    mac: '00:15:5D:01:2A:04',
    deviceName: 'TP-Link Archer C6',
    vendor: 'TP-Link Technologies',
    status: 'active',
    signal: '-62 dBm',
    downloadRate: '12.0 Mbps',
    uploadRate: '3.1 Mbps',
    imported: true,
    routerId: 'router-tower-north'
  },
  {
    id: 'dev-5',
    ip: '192.168.201.210',
    mac: 'CC:2D:E0:44:55:66',
    deviceName: 'Unauthorized-DHCP-Node',
    vendor: 'Espressif Inc (ESP32)',
    status: 'active',
    signal: '-45 dBm',
    downloadRate: '45.0 Mbps',
    uploadRate: '45.0 Mbps',
    imported: false,
    routerId: 'router-tower-east'
  }
];

export const initialAlerts: DiagnosticAlert[] = [
  {
    id: 'alert-1',
    type: 'temperature',
    severity: 'warning',
    title: 'ارتفاع حرارة المعالج في برج الشرق',
    description: 'درجة حرارة المعالج وصلت إلى 58°C بسبب الحمل الزائد وارتفاع حرارة الجو في الموقع.',
    deviceId: 'router-tower-east',
    deviceName: 'برج الشرق - BaseBox',
    timestamp: 'قبل 12 دقيقة',
    status: 'active',
    recommendedAction: 'تحقق من تبريد الصندوق وضبط مروحة التبريد أو تخفيف الأحمال المؤقتة.'
  },
  {
    id: 'alert-2',
    type: 'dhcp',
    severity: 'critical',
    title: 'اكتشاف خادم DHCP غير مصرح به (Rogue DHCP)',
    description: 'تم رصد جهاز يوزع عناوين IP في الشبكة المحلية على المَنفذ ether3 في برج الشرق.',
    deviceId: 'router-tower-east',
    deviceName: 'برج الشرق - BaseBox',
    timestamp: 'قبل 45 دقيقة',
    status: 'active',
    recommendedAction: 'عزل المنفذ المصاب فوراً وتفعيل خاصية DHCP Snooping على السويتش أو الراوتر.'
  },
  {
    id: 'alert-3',
    type: 'bandwidth',
    severity: 'warning',
    title: 'استهلاك مرتفع جداً للواجهة ether1 (Starlink Link)',
    description: 'استهلاك البيانات اقترب من الحد الأقصى لسعة خط Starlink الأول.',
    deviceId: 'router-starlink-bonding',
    deviceName: 'Starlink Dual-WAN Bonding',
    timestamp: 'قبل ساعتين',
    status: 'resolved',
    recommendedAction: 'تم تفعيل موازنة الأحمال (PCC Load Balancing) تلقائياً لتحويل جزء من الترافيك للخط الثاني.'
  }
];

export const initialVouchers: VoucherCard[] = [
  {
    id: 'v-101',
    code: 'SMAR-9821-4410',
    profileName: 'كارت 5 جيجابايت - أسبوعي',
    price: 5000,
    duration: '7 أيام',
    dataLimit: '5 GB',
    status: 'active',
    distributor: 'مكتب الهدى للاتصالات',
    createdAt: '2026-07-06 10:00',
    usedAt: '2026-07-06 14:20',
    soldTo: 'مشترك رقم #1024'
  },
  {
    id: 'v-102',
    code: 'SMAR-3312-9904',
    profileName: 'كارت مفتوح - يومي',
    price: 1500,
    duration: '24 ساعة',
    dataLimit: 'مفتوح',
    status: 'unused',
    distributor: 'موزع الكرادة',
    createdAt: '2026-07-07 08:30'
  },
  {
    id: 'v-103',
    code: 'SMAR-7741-2289',
    profileName: 'كارت 30 جيجابايت - شهري',
    price: 18000,
    duration: '30 يوماً',
    dataLimit: '30 GB',
    status: 'unused',
    distributor: 'مكتب الأجيال',
    createdAt: '2026-07-07 09:15'
  },
  {
    id: 'v-104',
    code: 'SMAR-5520-1102',
    profileName: 'كارت 10 جيجابايت - أسبوعي',
    price: 8000,
    duration: '7 أيام',
    dataLimit: '10 GB',
    status: 'active',
    distributor: 'مكتب الهدى للاتصالات',
    createdAt: '2026-07-05 16:00',
    usedAt: '2026-07-05 18:10',
    soldTo: 'مشترك رقم #891'
  },
  {
    id: 'v-105',
    code: 'SMAR-1190-6644',
    profileName: 'كارت مفتوح - يومي',
    price: 1500,
    duration: '24 ساعة',
    dataLimit: 'مفتوح',
    status: 'expired',
    distributor: 'موزع الجادرية',
    createdAt: '2026-07-04 12:00',
    usedAt: '2026-07-04 13:00'
  }
];

export const initialTelegramLogs: TelegramLog[] = [
  {
    id: 'tg-1',
    timestamp: 'اليوم، 14:20',
    level: 'success',
    category: 'system',
    message: '🚀 تم تشغيل نظام ALSaMaR-NET بنجاح والاتصال بـ RB1100AHx4 (192.168.201.2).',
    sent: true
  },
  {
    id: 'tg-2',
    timestamp: 'اليوم، 13:45',
    level: 'danger',
    category: 'security',
    message: '⚠️ تنبيه أمني: اكتشاف خادم DHCP غير مصرح به في برج الشرق (192.168.201.22).',
    sent: true
  },
  {
    id: 'tg-3',
    timestamp: 'اليوم، 11:10',
    level: 'warning',
    category: 'router',
    message: '🌡️ ارتفاع حرارة المعالج في برج الشرق إلى 58°C.',
    sent: true
  },
  {
    id: 'tg-4',
    timestamp: 'أمس، 22:00',
    level: 'info',
    category: 'subscriber',
    message: '📊 ملخص مبيعات الكروت اليومية: تم بيع 142 كارت بإجمالي 1,240,000 د.ع.',
    sent: true
  }
];

export const initialSalesData: SalesRecord[] = [
  { date: '01 يوليو', dailyRevenue: 950000, vouchersSold: 110, cumulativeRevenue: 950000 },
  { date: '02 يوليو', dailyRevenue: 1100000, vouchersSold: 125, cumulativeRevenue: 2050000 },
  { date: '03 يوليو', dailyRevenue: 1350000, vouchersSold: 152, cumulativeRevenue: 3400000 },
  { date: '04 يوليو', dailyRevenue: 1200000, vouchersSold: 138, cumulativeRevenue: 4600000 },
  { date: '05 يوليو', dailyRevenue: 1450000, vouchersSold: 165, cumulativeRevenue: 6050000 },
  { date: '06 يوليو', dailyRevenue: 1600000, vouchersSold: 184, cumulativeRevenue: 7650000 },
  { date: '07 يوليو', dailyRevenue: 1240000, vouchersSold: 142, cumulativeRevenue: 8890000 },
];

export const initialSubscribers: Subscriber[] = [
  {
    id: 'sub-1',
    name: 'أحمد محمد الجبوري',
    username: 'ahmed_j',
    phone: '07712345678',
    ipAddress: '192.168.201.101',
    macAddress: 'E4:8D:8C:1A:2B:3C',
    plan: 'اشتراك 30 جيجابايت - شهري',
    price: 25000,
    status: 'active',
    paymentStatus: 'paid',
    expiryDate: '2026-08-01',
    routerId: 'router-tower-north',
    notes: 'تم الدفع نقداً - برج الشمال'
  },
  {
    id: 'sub-2',
    name: 'عمر خالد الدليمي',
    username: 'omar_k',
    phone: '07809876543',
    ipAddress: '192.168.201.105',
    macAddress: '68:72:51:99:88:77',
    plan: 'اشتراك مفتوح (غير محدود) - بريميوم',
    price: 45000,
    status: 'active',
    paymentStatus: 'unpaid',
    expiryDate: '2026-07-10',
    routerId: 'router-distribution-rb1100',
    notes: 'تذكير بالدفع قبل انتهاء الموعد'
  },
  {
    id: 'sub-3',
    name: 'فاطمة حسن الكرخي',
    username: 'fatima_h',
    phone: '07701122334',
    ipAddress: '192.168.201.112',
    macAddress: '00:15:5D:01:2A:04',
    plan: 'اشتراك 15 جيجابايت - أسبوعي',
    price: 12000,
    status: 'active',
    paymentStatus: 'paid',
    expiryDate: '2026-07-15',
    routerId: 'router-tower-east',
    notes: 'مكتب الهدى للاتصالات'
  },
  {
    id: 'sub-4',
    name: 'محمد عبد الرضا الساعدي',
    username: 'mohammed_r',
    phone: '07503344556',
    ipAddress: '192.168.201.130',
    macAddress: 'CC:2D:E0:44:55:66',
    plan: 'اشتراك 50 جيجابايت - شهري',
    price: 35000,
    status: 'suspended',
    paymentStatus: 'pending',
    expiryDate: '2026-07-03',
    routerId: 'router-switch-south',
    notes: 'تم إيقاف الخدمة لانتهاء الاشتراك وعدم الدفع'
  },
  {
    id: 'sub-5',
    name: 'زينب كاظم البصري',
    username: 'zainab_k',
    phone: '07725566778',
    ipAddress: '192.168.201.145',
    macAddress: 'B4:FB:E4:33:22:11',
    plan: 'اشتراك 30 جيجابايت - شهري',
    price: 25000,
    status: 'active',
    paymentStatus: 'paid',
    expiryDate: '2026-08-05',
    routerId: 'router-tower-north',
    notes: 'دفع عبر زين كاش'
  }
];
