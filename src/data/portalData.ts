export interface MetricItem {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  description: string;
}

export interface UsageDataPoint {
  month: string;
  computeCost: number;
  storageCost: number;
  networkCost: number;
  cpuUtilization: number;
  memoryUtilization: number;
}

export interface CloudService {
  id: string;
  name: string;
  type: 'Compute' | 'Database' | 'Storage' | 'Kubernetes' | 'AI Inference';
  region: string;
  status: 'running' | 'warning' | 'stopped' | 'provisioning';
  uptime: string;
  costMonthly: number;
  specs: string;
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  resource: string;
  timestamp: string;
  status: 'success' | 'warning' | 'failed';
}

export interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  billingPeriod: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
}

export interface ClientProfile {
  name: string;
  company: string;
  plan: string;
  email: string;
  organizationId: string;
  currentCycleSpend: number;
  budgetLimit: number;
}

export const clientProfile: ClientProfile = {
  name: "Sarah Jenkins",
  company: "Apex Global Technologies",
  plan: "Enterprise Cloud Pro",
  email: "sarah.jenkins@apexglobal.io",
  organizationId: "org-apex-88219",
  currentCycleSpend: 14280.50,
  budgetLimit: 20000.00,
};

export const dashboardMetrics: MetricItem[] = [
  {
    id: "active-instances",
    title: "Active Cloud Workloads",
    value: "28 / 32",
    change: "+4 this month",
    trend: "up",
    description: "87.5% cluster capacity"
  },
  {
    id: "monthly-spend",
    title: "Current Month Spend",
    value: "$14,280.50",
    change: "-6.2% vs last month",
    trend: "down",
    description: "Budget limit: $20,000.00"
  },
  {
    id: "system-uptime",
    title: "Overall SLA Uptime",
    value: "99.98%",
    change: "+0.04% reliability",
    trend: "up",
    description: "Trailing 30-day average"
  },
  {
    id: "open-tickets",
    title: "Open Support Tickets",
    value: "2 Active",
    change: "1 high priority",
    trend: "neutral",
    description: "Avg resolution time: 2.1h"
  }
];

export const usageAnalyticsData: UsageDataPoint[] = [
  { month: "Nov", computeCost: 7800, storageCost: 2200, networkCost: 1400, cpuUtilization: 68, memoryUtilization: 72 },
  { month: "Dec", computeCost: 8400, storageCost: 2350, networkCost: 1600, cpuUtilization: 74, memoryUtilization: 76 },
  { month: "Jan", computeCost: 7900, storageCost: 2400, networkCost: 1550, cpuUtilization: 71, memoryUtilization: 70 },
  { month: "Feb", computeCost: 9100, storageCost: 2550, networkCost: 1800, cpuUtilization: 82, memoryUtilization: 84 },
  { month: "Mar", computeCost: 8600, storageCost: 2600, networkCost: 1700, cpuUtilization: 78, memoryUtilization: 81 },
  { month: "Apr", computeCost: 8200, storageCost: 2700, networkCost: 1650, cpuUtilization: 75, memoryUtilization: 79 },
];

export const cloudServicesData: CloudService[] = [
  {
    id: "srv-01",
    name: "prod-k8s-cluster-primary",
    type: "Kubernetes",
    region: "us-east-1 (N. Virginia)",
    status: "running",
    uptime: "99.99%",
    costMonthly: 4620.00,
    specs: "16 Nodes / 64 vCPU / 256 GB"
  },
  {
    id: "srv-02",
    name: "aurora-db-main-cluster",
    type: "Database",
    region: "us-east-1 (N. Virginia)",
    status: "running",
    uptime: "100.00%",
    costMonthly: 2150.00,
    specs: "db.r6g.4xlarge / Multi-AZ / 2TB NVMe"
  },
  {
    id: "srv-03",
    name: "analytics-ray-worker-pool",
    type: "AI Inference",
    region: "us-west-2 (Oregon)",
    status: "warning",
    uptime: "98.42%",
    costMonthly: 3890.00,
    specs: "8x NVIDIA L40S / 128 vCPU"
  },
  {
    id: "srv-04",
    name: "global-cdn-origin-edge",
    type: "Storage",
    region: "eu-central-1 (Frankfurt)",
    status: "running",
    uptime: "99.98%",
    costMonthly: 850.50,
    specs: "S3 Standard + CloudFront Edge / 45TB"
  },
  {
    id: "srv-05",
    name: "staging-microservices-env",
    type: "Compute",
    region: "us-east-2 (Ohio)",
    status: "stopped",
    uptime: "96.50%",
    costMonthly: 420.00,
    specs: "4 Nodes / 16 vCPU / 32 GB"
  },
  {
    id: "srv-06",
    name: "ml-training-batch-pipeline",
    type: "AI Inference",
    region: "us-west-2 (Oregon)",
    status: "provisioning",
    uptime: "99.20%",
    costMonthly: 2350.00,
    specs: "4x NVIDIA H100 GPU Cluster"
  }
];

export const recentActivities: ActivityItem[] = [
  {
    id: "act-1",
    user: "alex.kumar@apexglobal.io",
    action: "Scaled node pool to 16 replicas",
    resource: "prod-k8s-cluster-primary",
    timestamp: "12 mins ago",
    status: "success"
  },
  {
    id: "act-2",
    user: "security-bot@apexglobal.io",
    action: "SSL certificate renewal auto-completed",
    resource: "global-cdn-origin-edge",
    timestamp: "45 mins ago",
    status: "success"
  },
  {
    id: "act-3",
    user: "sarah.jenkins@apexglobal.io",
    action: "High memory utilization alert triggered (>85%)",
    resource: "analytics-ray-worker-pool",
    timestamp: "2 hours ago",
    status: "warning"
  },
  {
    id: "act-4",
    user: "ci-cd-pipeline@apexglobal.io",
    action: "Deployment release v2.14.0 promoted",
    resource: "prod-k8s-cluster-primary",
    timestamp: "5 hours ago",
    status: "success"
  },
  {
    id: "act-5",
    user: "david.ross@apexglobal.io",
    action: "Automated snapshot backup created",
    resource: "aurora-db-main-cluster",
    timestamp: "10 hours ago",
    status: "success"
  }
];

export const invoiceList: InvoiceItem[] = [
  {
    id: "inv-1094",
    invoiceNumber: "INV-2026-0391",
    billingPeriod: "Mar 01 - Mar 31, 2026",
    amount: 13840.25,
    status: "paid",
    dueDate: "Apr 15, 2026"
  },
  {
    id: "inv-1093",
    invoiceNumber: "INV-2026-0284",
    billingPeriod: "Feb 01 - Feb 28, 2026",
    amount: 14750.00,
    status: "paid",
    dueDate: "Mar 15, 2026"
  },
  {
    id: "inv-1092",
    invoiceNumber: "INV-2026-0177",
    billingPeriod: "Jan 01 - Jan 31, 2026",
    amount: 12980.50,
    status: "paid",
    dueDate: "Feb 15, 2026"
  },
  {
    id: "inv-1095",
    invoiceNumber: "INV-2026-0410",
    billingPeriod: "Apr 01 - Apr 30, 2026 (Projected)",
    amount: 14280.50,
    status: "pending",
    dueDate: "May 15, 2026"
  }
];
