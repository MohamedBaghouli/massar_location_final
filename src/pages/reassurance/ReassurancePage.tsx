import { useEffect, useState } from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/app/layout";
import { getCars } from "@/services/car.service";
import type { Car } from "@/types/car";
import { formatDate } from "@/utils/date";

export function ReassurancePage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCars()
      .then(setCars)
      .finally(() => setLoading(false));
  }, []);

  const insuranceCars = cars
    .filter((car) => car.insuranceExpiryDate)
    .sort((first, second) => String(first.insuranceExpiryDate).localeCompare(String(second.insuranceExpiryDate)));

  const expiringSoon = insuranceCars.filter((car) => isWithinDays(car.insuranceExpiryDate, 30)).length;

  return (
    <div className="space-y-6">
      <PageHeader title="Réassurance" />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard icon={ShieldCheck} label="Voitures suivies" value={insuranceCars.length} />
        <StatCard icon={AlertTriangle} label="Assurances à surveiller" value={expiringSoon} tone="warning" />
        <StatCard icon={ShieldCheck} label="Total parc" value={cars.length} />
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Échéances assurance</h3>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {loading ? (
            <p className="px-4 py-5 text-sm text-slate-500">Chargement...</p>
          ) : insuranceCars.length === 0 ? (
            <p className="px-4 py-5 text-sm text-slate-500">Aucune assurance enregistrée.</p>
          ) : (
            insuranceCars.slice(0, 20).map((car) => (
              <div className="flex items-center justify-between gap-4 px-4 py-3" key={car.id}>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {car.brand} {car.model}
                  </p>
                  <p className="text-xs text-slate-500">{car.registrationNumber}</p>
                </div>
                <span className="shrink-0 text-sm font-medium text-slate-700 dark:text-slate-200">
                  {formatDate(car.insuranceExpiryDate)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  tone = "default",
  value,
}: {
  icon: typeof ShieldCheck;
  label: string;
  tone?: "default" | "warning";
  value: number;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <span className={tone === "warning" ? "text-amber-600" : "text-blue-700"}>
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className="text-2xl font-semibold text-slate-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}

function isWithinDays(value: string | null | undefined, days: number) {
  if (!value) return false;
  const expiry = new Date(value).getTime();
  const now = Date.now();
  return expiry >= now && expiry <= now + days * 24 * 60 * 60 * 1000;
}
