// lib/data/features.ts

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  iconColor: string;
}

export const defaultFeatures: Feature[] = [
  {
    id: "workstations",
    icon: "Laptop",
    title: "Premium Workstations",
    description:
      "Ergonomic desks, Herman Miller chairs, and adjustable monitor arms for optimal comfort",
    color: "teal",
    iconColor: "text-teal-600",
  },
  {
    id: "internet",
    icon: "Wifi",
    title: "Starlink Internet",
    description:
      "Ultra-fast satellite internet with 99.9% uptime and backup connections everywhere",
    color: "orange",
    iconColor: "text-orange-600",
  },
  {
    id: "equipment",
    icon: "Monitor",
    title: "Equipment Rental",
    description:
      "Rent 4K monitors, noise-canceling headsets, mechanical keyboards, and premium mice",
    color: "teal",
    iconColor: "text-teal-600",
  },
  {
    id: "solar",
    icon: "Leaf",
    title: "100% Solar Powered",
    description:
      "Completely sustainable operations with Tesla Powerwall backup systems",
    color: "orange",
    iconColor: "text-orange-600",
  },
  {
    id: "community",
    icon: "Users",
    title: "Global Community",
    description:
      "Connect with 10,000+ verified digital nomads through our exclusive network",
    color: "teal",
    iconColor: "text-teal-600",
  },
  {
    id: "support",
    icon: "Shield",
    title: "24/7 Support",
    description:
      "Round-the-clock technical support and concierge services in every location",
    color: "orange",
    iconColor: "text-orange-600",
  },
];
