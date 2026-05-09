import { Bot, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ArchiveSearchProps {
  message: string;
  query: string;
  onQueryChange: (query: string) => void;
}

export function ArchiveSearch({ message, onQueryChange, query }: ArchiveSearchProps) {
  return (
    <div className="grid gap-[22px] rounded-[14px] border border-slate-200 bg-white px-6 py-[22px] shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:grid-cols-[1fr_320px]">
      <div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-[18px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" />
          <Input
            className="h-[50px] rounded-xl border-slate-200 bg-[#f8fafd] pl-[50px] text-[14.5px] shadow-none transition-smooth focus:bg-white dark:border-slate-800 dark:bg-slate-950"
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Rechercher client, voiture, réservation, contrat, paiement..."
            value={query}
          />
        </div>
        <p className="mt-2.5 pl-1 text-[13px] text-muted-foreground dark:text-slate-400">
          Recherche par nom client, CIN, téléphone, immatriculation, contrat, réservation ou montant paiement.
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-xl bg-gradient-to-br from-[#eaf0ff] to-[#e3ebff] px-[18px] py-4 dark:from-blue-950/50 dark:to-slate-900">
        <RovoAvatar />
        <div className="min-w-0">
          <p className="text-sm font-bold text-[#0f1f3d] dark:text-blue-100">Rovo</p>
          <p className="mt-0.5 text-[13px] leading-[1.45] text-[#324767] dark:text-blue-200">{message}</p>
        </div>
      </div>
    </div>
  );
}

function RovoAvatar() {
  return (
    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#fde26b] to-[#f5b842] text-[#0f1f3d] shadow-[0_3px_8px_rgba(245,184,66,0.35)]">
      <Bot className="h-[22px] w-[22px]" />
    </div>
  );
}
