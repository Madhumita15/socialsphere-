import { LucideIcon } from "lucide-react";

export interface StatsCardInterface {
  label: string;
  icon: LucideIcon;
  totalStats: number | string | undefined;
  loading: boolean
}

 export interface ReviewPostDialogInterface {
  onClose: (open: boolean) => void;
  report_id: string | null;
}