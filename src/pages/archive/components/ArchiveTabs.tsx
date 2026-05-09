import type { ArchiveType } from "@/types/archive";
import { cn } from "@/lib/utils";

export type ArchiveTab = ArchiveType | "all";

const tabs: Array<{ label: string; value: ArchiveTab }> = [
  { label: "Tous", value: "all" },
  { label: "Clients", value: "client" },
  { label: "Voitures", value: "car" },
  { label: "Réservations", value: "reservation" },
  { label: "Paiements", value: "payment" },
  { label: "Contrats", value: "contract" },
];

export function ArchiveTabs({ active, onChange }: { active: ArchiveTab; onChange: (tab: ArchiveTab) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          className={cn(
            "h-10 rounded-[11px] border border-border bg-white px-[18px] text-sm font-semibold text-[#324767] shadow-sm transition-smooth hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800",
            active === tab.value && "border-[#2746d6] bg-[#2746d6] text-white shadow-[0_6px_14px_rgba(39,70,214,0.30)] hover:bg-[#2746d6] dark:bg-blue-600 dark:text-white",
          )}
          key={tab.value}
          onClick={() => onChange(tab.value)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
