import { Archive, Banknote, CalendarDays, CarFront, FileText, UserRound } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { ArchiveStats as ArchiveStatsType } from "@/types/archive";
import { cn } from "@/lib/utils";

const cards = [
  { key: "total", label: "Total archivés", icon: Archive, tone: "blue" },
  { key: "clients", label: "Clients archivés", icon: UserRound, tone: "slate" },
  { key: "cars", label: "Voitures archivées", icon: CarFront, tone: "emerald" },
  { key: "reservations", label: "Réservations archivées", icon: CalendarDays, tone: "orange" },
  { key: "payments", label: "Paiements archivés", icon: Banknote, tone: "violet" },
  { key: "contracts", label: "Contrats archivés", icon: FileText, tone: "slate" },
] as const;

const tones = {
  blue: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-200",
  emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200",
  orange: "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-200",
  slate: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  violet: "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-200",
};

export function ArchiveStats({ stats }: { stats: ArchiveStatsType }) {
  return (
    <div className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card
            className="min-h-[74px] rounded-[14px] border-slate-200 bg-white px-[18px] py-4 shadow-sm transition-smooth hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            key={card.key}
          >
            <div className="flex items-center gap-3.5">
              <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px]", tones[card.tone])}>
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[12.5px] font-medium text-muted-foreground dark:text-slate-400">{card.label}</p>
                <p className="mt-0.5 text-[22px] font-extrabold leading-none text-[#0f1f3d] dark:text-slate-100">{stats[card.key]}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
