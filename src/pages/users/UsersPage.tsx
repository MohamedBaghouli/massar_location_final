import { Shield, UserRound } from "lucide-react";
import { PageHeader } from "@/app/layout";
import { useAuth } from "@/hooks/useAuth";

export function UsersPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <PageHeader title="Utilisateurs" />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700 dark:bg-slate-800 dark:text-blue-300">
              <UserRound className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                {user?.fullName || "Dev Admin"}
              </p>
              <p className="truncate text-xs text-slate-500">{user?.username || "admin"}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-slate-800 dark:text-emerald-300">
              <Shield className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Administrateur</p>
              <p className="text-xs text-slate-500">Accès complet à l'application</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
