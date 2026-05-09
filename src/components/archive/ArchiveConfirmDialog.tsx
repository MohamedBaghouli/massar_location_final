import { useEffect, useState } from "react";
import { Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getArchiveTypeLabel } from "@/lib/archiveLabels";
import type { CurrentArchiveType } from "@/types/archive";

interface ArchiveConfirmDialogProps {
  open: boolean;
  itemType: CurrentArchiveType;
  itemTitle: string;
  onCancel: () => void;
  onConfirm: (reason?: string) => void;
  loading?: boolean;
}

export function ArchiveConfirmDialog({
  itemTitle,
  itemType,
  loading,
  onCancel,
  onConfirm,
  open,
}: ArchiveConfirmDialogProps) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (!open) setReason("");
  }, [open]);

  return (
    <Dialog onOpenChange={(nextOpen) => !nextOpen && !loading && onCancel()} open={open}>
      <DialogContent className="w-[min(92vw,520px)] dark:border-slate-800 dark:bg-slate-900">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-200">
              <Archive className="h-5 w-5" />
            </span>
            <div>
              <DialogTitle className="dark:text-slate-100">Archiver cet élément ?</DialogTitle>
              <p className="mt-1 text-sm text-muted-foreground dark:text-slate-400">{getArchiveTypeLabel(itemType)} - {itemTitle}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Cet élément sera déplacé vers l'archive. Vous pourrez le restaurer plus tard.
          </p>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Raison de l'archivage</span>
            <textarea
              className="min-h-24 w-full resize-y rounded-md border border-border bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-orange-950/50"
              disabled={loading}
              onChange={(event) => setReason(event.target.value)}
              placeholder="Raison optionnelle"
              value={reason}
            />
          </label>
        </div>

        <div className="flex justify-end gap-2">
          <Button disabled={loading} onClick={onCancel} type="button" variant="outline">
            Annuler
          </Button>
          <Button
            className="bg-orange-600 text-white hover:bg-orange-700 dark:bg-orange-600 dark:text-white dark:hover:bg-orange-500"
            disabled={loading}
            onClick={() => onConfirm(reason.trim() || undefined)}
            type="button"
          >
            <Archive className="h-4 w-4" />
            {loading ? "Archivage..." : "Archiver"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
