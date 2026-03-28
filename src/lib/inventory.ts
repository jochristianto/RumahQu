import { differenceInCalendarDays, parseISO, startOfDay } from "date-fns";
import type { InventoryItem } from "@/lib/contracts";

function parseExpiryDate(value: string) {
  return startOfDay(parseISO(value));
}

export type { InventoryItem };

export type ExpiryStatus = "expired" | "expiring-soon" | "safe";

export const getExpiryStatus = (expirationDate: string): ExpiryStatus => {
  const diffDays = differenceInCalendarDays(parseExpiryDate(expirationDate), startOfDay(new Date()));

  if (diffDays < 0) return "expired";
  if (diffDays <= 7) return "expiring-soon";
  return "safe";
};

export const getDaysUntilExpiry = (expirationDate: string): number => {
  return differenceInCalendarDays(parseExpiryDate(expirationDate), startOfDay(new Date()));
};

export const CATEGORIES = [
  "Makanan",
  "Minuman",
  "Obat-obatan",
  "Bumbu Dapur",
  "Produk Kebersihan",
  "Kosmetik",
  "Lainnya",
];

export const UNITS = ["pcs", "kg", "gram", "liter", "ml", "botol", "bungkus", "kaleng", "kotak"];
