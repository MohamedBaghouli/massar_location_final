import { useMemo } from "react";
import { CarFront, RotateCcw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchableSelect } from "@/components/ui/SearchableSelect";
import type { Car } from "@/types/car";
import { getStatusLabel } from "@/components/StatusBadge";
import { formatCarName, formatRegistrationNumber } from "@/utils/car";
import {
  reservationPeriodOptions,
  reservationStatuses,
  type ReservationFiltersState,
  type ReservationFilterStatus,
  type ReservationPeriodFilter,
} from "@/pages/reservations/components/reservationViewUtils";

interface ReservationFiltersProps {
  cars: Car[];
  filters: ReservationFiltersState;
  onChange: (filters: ReservationFiltersState) => void;
  showDateInput?: boolean;
  selectedDate?: string;
  onSelectedDateChange?: (date: string) => void;
}

export function ReservationFilters({
  cars,
  filters,
  onChange,
  onSelectedDateChange,
  selectedDate,
  showDateInput = false,
}: ReservationFiltersProps) {
  const update = <Key extends keyof ReservationFiltersState>(key: Key, value: ReservationFiltersState[Key]) => {
    onChange({ ...filters, [key]: value });
  };
  const statusOptions = useMemo(
    () => reservationStatuses.map((status) => ({ value: status, label: status === "ALL" ? "Tous les statuts" : getStatusLabel(status) })),
    [],
  );
  const carOptions = useMemo(
    () => [
      { value: 0, label: "Toutes les voitures" },
      ...cars.map((car) => ({
        keywords: `${car.brand} ${car.model} ${car.registrationNumber} ${formatRegistrationNumber(car.registrationNumber)}`,
        label: `${formatCarName(car.brand, car.model)} (${formatRegistrationNumber(car.registrationNumber)})`,
        value: car.id,
      })),
    ],
    [cars],
  );

  return (
    <div className="grid gap-3 rounded-xl border border-border bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:grid-cols-[minmax(280px,1fr)_180px_220px_180px_auto]">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="h-11 rounded-lg pl-10 dark:border-slate-800 dark:bg-slate-950"
          onChange={(event) => update("query", event.target.value)}
          placeholder="Rechercher client, voiture, immatriculation..."
          value={filters.query}
        />
      </div>

      <SearchableSelect
        ariaLabel="Filtrer par statut"
        className="h-11 rounded-lg"
        onValueChange={(nextValue) => update("status", nextValue as ReservationFilterStatus)}
        options={statusOptions}
        value={filters.status}
      />

      <div className="relative">
        <CarFront className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <SearchableSelect
          ariaLabel="Filtrer par voiture"
          className="h-11 rounded-lg pl-10"
          onValueChange={(nextValue) => update("carId", Number(nextValue))}
          options={carOptions}
          searchPlaceholder="Rechercher une voiture..."
          value={filters.carId}
        />
      </div>

      {showDateInput ? (
        <Input
          className="h-11 rounded-lg dark:border-slate-800 dark:bg-slate-950"
          onChange={(event) => onSelectedDateChange?.(event.target.value)}
          type="date"
          value={selectedDate}
        />
      ) : (
        <SearchableSelect
          ariaLabel="Filtrer par période"
          className="h-11 rounded-lg"
          onValueChange={(nextValue) => update("period", nextValue as ReservationPeriodFilter)}
          options={reservationPeriodOptions}
          value={filters.period}
        />
      )}

      <Button
        className="h-11 rounded-lg"
        onClick={() => onChange({ carId: 0, period: "ALL", query: "", status: "ALL" })}
        type="button"
        variant="outline"
      >
        <RotateCcw className="h-4 w-4" />
        Réinitialiser
      </Button>
    </div>
  );
}
