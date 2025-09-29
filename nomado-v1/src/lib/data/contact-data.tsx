// lib/data/contact-data.tsx

// === Типы ===
export interface ContactInfo {
  icon: string;
  title: string;
  content: string;
  description: string;
}

export interface ServiceHighlight {
  icon: string;
  title: string;
  description: string;
  iconColor?: string;
}

// === Данные контактов ===
export const defaultContactInfo: ContactInfo[] = [
  {
    icon: "Mail",
    title: "Email",
    content: "hello@nomado-breeze.com",
    description: "General inquiries and support",
  },
  {
    icon: "Phone",
    title: "WhatsApp",
    content: "+1 (555) NOMADO-1",
    description: "24/7 support for members",
  },
  {
    icon: "MapPin",
    title: "Current Location",
    content: "Bali, Indonesia",
    description: "Our mobile HQ moves with the seasons",
  },
];

// === Данные сервисных карточек ===
export const defaultServiceHighlights: ServiceHighlight[] = [
  {
    icon: "Clock",
    title: "Response Time",
    description: "< 2 hours during business hours",
    iconColor: "#2D5B4C",
  },
  {
    icon: "Globe",
    title: "Global Support",
    description: "Available in 15+ languages",
    iconColor: "#F9A825",
  },
];
