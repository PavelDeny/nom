// lib/data/pricing-data.ts

export interface PricingPlan {
  title: string;
  subtitle: string;
  price: number;
  billingCycle: "day" | "month";
  features: string[];
  buttonLabel: string;
  buttonVariant: "explorer" | "pro" | "elite";
  highlighted?: boolean;
  icon: "briefcase" | "crown" | "award";
}

export const defaultPricingPlans: PricingPlan[] = [
  {
    title: "Explorer",
    subtitle: "Perfect for trying out the nomad lifestyle",
    price: 35,
    billingCycle: "day",
    icon: "briefcase",
    buttonVariant: "explorer",
    buttonLabel: "Book Day Pass",
    features: [
      "Access to basic workstation",
      "High-speed internet",
      "Coffee & tea included",
      "Community access",
      "Basic equipment rental",
    ],
  },
  {
    title: "Nomad Pro",
    subtitle: "For serious digital nomads",
    price: 899,
    billingCycle: "month",
    icon: "crown",
    buttonVariant: "pro",
    buttonLabel: "Start Pro Membership",
    highlighted: true,
    features: [
      "Premium ergonomic workstation",
      "Priority booking & locations",
      "Free equipment rental ($200/month value)",
      "24/7 concierge support",
      "Exclusive networking events",
      "Airport transfers included",
      "Laundry & cleaning services",
      "Personal productivity coaching",
    ],
  },
  {
    title: "Elite Nomad",
    subtitle: "Ultimate luxury nomad experience",
    price: 1999,
    billingCycle: "month",
    icon: "award",
    buttonVariant: "elite",
    buttonLabel: "Apply for Elite",
    features: [
      "Private office suite",
      "Unlimited equipment rental",
      "Personal assistant services",
      "VIP airport lounge access",
      "Luxury accommodation partnerships",
      "Private chef services",
      "Helicopter transfers (select locations)",
      "Custom itinerary planning",
      "1-on-1 business mentoring",
    ],
  },
];

export const defaultPricingSection = {
  title: "Choose Your Nomad Plan",
  subtitle:
    "From day passes to premium memberships, find the perfect plan for your nomadic lifestyle",
  showEnterpriseContact: true,
};
