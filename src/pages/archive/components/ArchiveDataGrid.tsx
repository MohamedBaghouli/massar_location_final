import { useEffect, useMemo, useState } from "react";
import { Download, Eye, RotateCcw, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ActionIconButton } from "@/components/ui/action-buttons/ActionIconButton";
import { AppPagination } from "@/components/ui/pagination/AppPagination";
import type { ArchiveItem, ArchiveType } from "@/types/archive";
import { cn } from "@/lib/utils";
import { readStoredPageSize, writeStoredPageSize } from "@/lib/pagination";

interface ArchiveDataGridProps {
  items: ArchiveItem[];
  onDelete: (item: ArchiveItem) => void;
  onExport: (item: ArchiveItem) => void;
  onRestore: (item: ArchiveItem) => void;
  onView: (item: ArchiveItem) => void;
}

const typeLabels: Record<ArchiveType, string> = {
  car: "Voiture",
  client: "Client",
  contract: "Contrat",
  payment: "Paiement",
  reservation: "Réservation",
};

const typeClasses: Record<ArchiveType, string> = {
  car: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-900",
  client: "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-950/40 dark:text-blue-200 dark:ring-blue-900",
  contract: "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700",
  payment: "bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-950/40 dark:text-violet-200 dark:ring-violet-900",
  reservation: "bg-orange-50 text-orange-700 ring-orange-200 dark:bg-orange-950/40 dark:text-orange-200 dark:ring-orange-900",
};

const archivePageSizeKey = "massar-pagination-page-size-archive";

export function ArchiveDataGrid({ items, onDelete, onExport, onRestore, onView }: ArchiveDataGridProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(() => readStoredPageSize(archivePageSizeKey));
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, pageSize, safePage]);

  useEffect(() => {
    setPage(1);
  }, [items.length, pageSize]);

  function handlePageSizeChange(nextPageSize: number) {
    setPageSize(nextPageSize);
    writeStoredPageSize(archivePageSizeKey, nextPageSize);
  }

  return (
    <Card className="overflow-hidden rounded-[14px] border-slate-200 bg-white p-0 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="border-b border-border bg-slate-50/80 text-xs uppercase text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
            <tr>
              <th className="px-5 py-4 font-bold">Type</th>
              <th className="px-5 py-4 font-bold">Nom / Référence</th>
              <th className="px-5 py-4 font-bold">Description</th>
              <th className="px-5 py-4 font-bold">Date archivage</th>
              <th className="px-5 py-4 font-bold">Raison</th>
              <th className="px-5 py-4 font-bold">Statut</th>
              <th className="px-5 py-4 text-right font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border dark:divide-slate-800">
            {pageItems.map((item) => (
              <tr className="bg-white transition-smooth hover:bg-blue-50/40 dark:bg-slate-900 dark:hover:bg-blue-950/20" key={`${item.type}-${item.id}`}>
                <td className="px-5 py-4">
                  <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1", typeClasses[item.type])}>
                    {typeLabels[item.type]}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-950 dark:text-slate-100">{item.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground dark:text-slate-400">{item.subtitle}</p>
                </td>
                <td className="max-w-[320px] px-5 py-4 text-slate-600 dark:text-slate-300">
                  <p className="truncate">{item.description || "-"}</p>
                </td>
                <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{formatDate(item.archivedAt)}</td>
                <td className="max-w-[240px] px-5 py-4 text-slate-600 dark:text-slate-300">
                  <p className="truncate">{item.archivedReason || "-"}</p>
                </td>
                <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{item.status || "-"}</td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <ActionIconButton color="blue" icon={Eye} label="Voir détails" onClick={() => onView(item)} />
                    <ActionIconButton color="emerald" icon={RotateCcw} label="Restaurer" onClick={() => onRestore(item)} />
                    <ActionIconButton color="emerald" icon={Download} label="Exporter" onClick={() => onExport(item)} />
                    <ActionIconButton color="red" icon={Trash2} label="Supprimer définitivement" onClick={() => onDelete(item)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AppPagination
        currentPage={safePage}
        onPageChange={setPage}
        onPageSizeChange={handlePageSizeChange}
        pageSize={pageSize}
        totalItems={items.length}
        totalPages={totalPages}
      />
    </Card>
  );
}

function formatDate(value?: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(date);
}
