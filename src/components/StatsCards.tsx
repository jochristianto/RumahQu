import { Package, AlertTriangle, Clock, CheckCircle, History } from "lucide-react";
import {
  InventoryItem,
  formatInventoryLastUpdate,
  getExpiryStatus,
  getLastInventoryUpdate,
} from "@/lib/inventory";

interface Props {
  items: InventoryItem[];
}

export function StatsCards({ items }: Props) {
  const expired = items.filter((i) => getExpiryStatus(i.expirationDate) === "expired").length;
  const expiring = items.filter((i) => getExpiryStatus(i.expirationDate) === "expiring-soon").length;
  const safe = items.filter((i) => getExpiryStatus(i.expirationDate) === "safe").length;
  const lastUpdatedAt = getLastInventoryUpdate(items);

  const stats = [
    { label: "Total Barang", value: items.length, icon: Package, color: "text-primary bg-primary/10" },
    { label: "Kadaluarsa", value: expired, icon: AlertTriangle, color: "text-expired bg-destructive/10" },
    { label: "Segera Exp", value: expiring, icon: Clock, color: "text-expiring-soon bg-warning/10" },
    { label: "Aman", value: safe, icon: CheckCircle, color: "text-safe bg-success/10" },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border bg-card p-4 flex items-center gap-3">
            <div className={`rounded-full p-2.5 ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-extrabold">{s.value}</p>
              <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border bg-card p-4 flex items-center gap-3">
        <div className="rounded-full p-2.5 text-primary bg-primary/10">
          <History className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-bold">Last update</p>
          <p className="text-xs text-muted-foreground">
            {formatInventoryLastUpdate(lastUpdatedAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
