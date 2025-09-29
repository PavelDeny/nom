// components/sections/PricingSection.tsx
"use client";

import { PricingCard } from "@/components/ui/pricing-card";
import { EnterpriseContact } from "@/components/ui/enterprise-contact";
import {
  defaultPricingPlans,
  defaultPricingSection,
  type PricingPlan,
} from "@/lib/data/pricing-data";

export interface PricingSectionProps {
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
  showEnterpriseContact?: boolean;
}

// === Компонент ===
export function PricingSection({
  title = defaultPricingSection.title,
  subtitle = defaultPricingSection.subtitle,
  plans = defaultPricingPlans,
  showEnterpriseContact = defaultPricingSection.showEnterpriseContact,
}: PricingSectionProps) {
  return (
    <section
      id="pricing"
      style={{ backgroundColor: "white", padding: "4rem 0" }}
    >
      <div className="container mx-auto px-4">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#2D5B4C",
              marginBottom: "1rem",
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: "#6B7280",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* === Грид-макет: 3 колонки === */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
            maxWidth: "1200px",
            margin: "0 auto",
            marginBottom: "3rem",
          }}
        >
          {plans.map((plan) => (
            <PricingCard key={plan.title} plan={plan} />
          ))}
        </div>

        {/* === Enterprise Contact === */}
        {showEnterpriseContact && <EnterpriseContact />}
      </div>
    </section>
  );
}
