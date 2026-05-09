export type PaginationItem = number | "ellipsis";

export const defaultPageSizeOptions = [10, 20, 50, 100];

export function generatePagination(currentPage: number, totalPages: number): PaginationItem[] {
  const safeTotalPages = Math.max(1, Math.floor(totalPages));
  const safeCurrentPage = Math.min(Math.max(1, Math.floor(currentPage)), safeTotalPages);

  if (safeTotalPages <= 7) {
    return Array.from({ length: safeTotalPages }, (_, index) => index + 1);
  }

  if (safeCurrentPage <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis", safeTotalPages];
  }

  if (safeCurrentPage >= safeTotalPages - 3) {
    return [1, "ellipsis", safeTotalPages - 4, safeTotalPages - 3, safeTotalPages - 2, safeTotalPages - 1, safeTotalPages];
  }

  return [1, "ellipsis", safeCurrentPage - 1, safeCurrentPage, safeCurrentPage + 1, "ellipsis", safeTotalPages];
}

export function readStoredPageSize(storageKey: string, fallback = 10, options = defaultPageSizeOptions) {
  if (typeof window === "undefined") return fallback;

  const stored = Number(window.localStorage.getItem(storageKey));
  return options.includes(stored) ? stored : fallback;
}

export function writeStoredPageSize(storageKey: string, pageSize: number) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey, String(pageSize));
}
