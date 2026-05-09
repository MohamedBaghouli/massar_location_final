import type { CurrentArchiveType } from "@/types/archive";

export const archiveTypeLabels: Record<CurrentArchiveType, string> = {
  contract: "Contrat",
  payment: "Paiement",
  reservation: "Réservation",
};

export function getArchiveTypeLabel(type: CurrentArchiveType) {
  return archiveTypeLabels[type];
}
