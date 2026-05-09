import { useId } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { defaultPageSizeOptions, generatePagination } from "@/lib/pagination";

export interface AppPaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function AppPagination({
  currentPage,
  onPageChange,
  onPageSizeChange,
  pageSize,
  pageSizeOptions = defaultPageSizeOptions,
  totalItems,
  totalPages,
}: AppPaginationProps) {
  const pageSizeId = useId();

  if (totalItems <= 0 || totalPages <= 1) return null;

  const safeTotalPages = Math.max(1, totalPages);
  const safeCurrentPage = Math.min(Math.max(1, currentPage), safeTotalPages);
  const pages = generatePagination(safeCurrentPage, safeTotalPages);

  function changePage(nextPage: number) {
    const normalized = Math.min(Math.max(1, nextPage), safeTotalPages);
    if (normalized === safeCurrentPage) return;
    onPageChange(normalized);
    requestAnimationFrame(() => {
      document.querySelector("[data-pagination-scroll-target]")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col gap-3 border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
        Page {safeCurrentPage} sur {safeTotalPages} · {totalItems} élément{totalItems > 1 ? "s" : ""}
      </p>

      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <label className="sr-only" htmlFor={pageSizeId}>
          Lignes par page
        </label>
        <select
          aria-label="Lignes par page"
          className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm outline-none transition duration-200 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          id={pageSizeId}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
          value={pageSize}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>

        <div className="inline-flex items-center gap-2" role="group">
          <PaginationButton
            ariaLabel="Page précédente"
            disabled={safeCurrentPage === 1}
            onClick={() => changePage(safeCurrentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </PaginationButton>

          <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-xl border border-blue-600 bg-blue-600 px-3 text-sm font-semibold text-white shadow-sm sm:hidden">
            {safeCurrentPage}
          </span>

          <div className="hidden items-center gap-2 sm:inline-flex">
            {pages.map((item, index) =>
              item === "ellipsis" ? (
                <span
                  aria-hidden="true"
                  className="flex h-11 min-w-8 items-center justify-center text-sm font-semibold text-slate-400 dark:text-slate-500"
                  key={`ellipsis-${index}`}
                >
                  ...
                </span>
              ) : (
                <PaginationButton
                  active={item === safeCurrentPage}
                  ariaLabel={`Page ${item}`}
                  key={item}
                  onClick={() => changePage(item)}
                >
                  {item}
                </PaginationButton>
              ),
            )}
          </div>

          <PaginationButton
            ariaLabel="Page suivante"
            disabled={safeCurrentPage === safeTotalPages}
            onClick={() => changePage(safeCurrentPage + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </PaginationButton>
        </div>
      </div>
    </nav>
  );
}

function PaginationButton({
  active,
  ariaLabel,
  children,
  disabled,
  onClick,
}: {
  active?: boolean;
  ariaLabel: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      aria-current={active ? "page" : undefined}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex h-11 min-w-11 items-center justify-center rounded-xl border px-3 text-sm font-semibold shadow-sm outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-blue-500/40 active:scale-[0.97]",
        active
          ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-600"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800",
        disabled && "pointer-events-none opacity-40",
      )}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export function AppPaginationSkeleton() {
  return (
    <div className="flex items-center justify-end gap-2 border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
      <div className="h-11 w-32 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
      <div className="h-11 w-11 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
      <div className="h-11 w-11 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
      <div className="h-11 w-11 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
    </div>
  );
}
