export interface RouterDevice {
  id: string;
  name: string;
  ip: string;
  model: string;
  firmware: string;
  status: 'online' | 'warning' | 'offline';
  cpuUsage: number;
  memoryUsage: number;
  uptime: string;
  temperature: number;
  rxBytes: string;
  txBytes: string;
  type: 'core_bonding' | 'distribution' | 'tower' | 'switch' | 'ap';
  location: { x: number; y: number; lat: number; lng: number; siteName: string };
  connectedClients: number;
  signalStrength?: string;
  gateway?: string;
}

export interface SubnetDevice {
  id: string;
  ip: string;
  mac: string;
  deviceName: string;
  vendor: string;
  status: 'active' | 'idle' | 'unknown' | 'blocked';
  signal?: string;
  downloadRate: string;
  uploadRate: string;
  imported: boolean;
  routerId: string;
}

export interface DiagnosticAlert {
  id: string;
  type: 'loop' | 'dhcp' | 'wireless' | 'bandwidth' | 'gateway' | 'temperature' | 'security';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  deviceId: string;
  deviceName: string;
  timestamp: string;
  status: 'active' | 'resolved';
  recommendedAction: string;
}

export interface VoucherCard {
  id: string;
  code: string;
  profileName: string;
  price: number;
  duration: string;
  dataLimit?: string;
  status: 'unused' | 'active' | 'expired';
  distributor: string;
  createdAt: string;
  usedAt?: string;
  soldTo?: string;
}

export interface TelegramLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'danger' | 'success';
  category: 'router' | 'internet' | 'security' | 'subscriber' | 'system';
  message: string;
  sent: boolean;
}

export interface SalesRecord {
  date: string;
  dailyRevenue: number;
  vouchersSold: number;
  cumulativeRevenue: number;
}

export interface Subscriber {
  id: string;
  name: string;
  username: string;
  phone: string;
  ipAddress: string;
  macAddress: string;
  plan: string;
  price: number;
  status: 'active' | 'expired' | 'suspended';
  paymentStatus: 'paid' | 'unpaid' | 'pending';
  expiryDate: string;
  routerId: string;
  notes?: string;
}
