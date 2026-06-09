import {
  Archive,
  BarChart3,
  Banknote,
  Brain,
  CalendarDays,
  Car,
  ChevronDown,
  ChevronUp,
  FileText,
  Gauge,
  LayoutDashboard,
  MoreHorizontal,
  UserRound,
  Users,
} from "lucide-react";

export const navigationItems = [
  { label: "Tableau de bord", path: "/", icon: LayoutDashboard },
  { label: "Voiture", path: "/cars", icon: Car },
  { label: "Client", path: "/clients", icon: UserRound },
  { label: "Réservations", path: "/reservations", icon: CalendarDays },
  { label: "Paiement", path: "/payments", icon: Banknote },
  { label: "Contrat", path: "/contracts", icon: FileText },
];

export const moreNavigationItem = { label: "Autres", icon: MoreHorizontal };

export const moreNavigationItems = [
  { label: "Rapport CA", path: "/rapport", icon: BarChart3 },
  { label: "Analyse par AI", path: "/ai-forecast", icon: Brain },
  { label: "Utilisateurs", path: "/users", icon: Users },
  { label: "Archives", path: "/archive", icon: Archive },
];

export const chevronIcons = { down: ChevronDown, up: ChevronUp };

export const appName = "Massar Location";

export const dashboardCards = [
  { label: "Total voitures", valueKey: "totalCars", icon: Car },
  { label: "Disponibles", valueKey: "availableCars", icon: Gauge },
  { label: "Louées", valueKey: "rentedCars", icon: CalendarDays },
  { label: "Revenus mois", valueKey: "monthlyRevenue", icon: Banknote },
] as const;
