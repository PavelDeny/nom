// components/ui/pricing-card.tsx
"use client";

import { PricingIcon } from "./pricing-icon";
import { PricingFeatures } from "./pricing-features";
import { PricingButton } from "./pricing-button";
import { type PricingPlan } from "@/lib/data/pricing-data";

export interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {
  const buttonHref = `/booking?plan=${plan.title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "white",
        borderRadius: "1rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: plan.highlighted ? "1px solid #f97316" : "1px solid #E5E7EB",
      }}
    >
      {/* === Бейдж "Most Popular" === */}
      {plan.highlighted && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            backgroundColor: "#f97316",
            color: "white",
            padding: "0.75rem 1rem",
            textAlign: "center",
            fontSize: "0.75rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            zIndex: 1,
          }}
        >
          Most Popular
        </div>
      )}

      {/* === Header Section === */}
      <div
        style={{
          textAlign: "center",
          padding: plan.highlighted
            ? "3rem 1.5rem 1.5rem"
            : "2rem 1.5rem 1.5rem",
        }}
      >
        {/* === Иконка === */}
        <PricingIcon icon={plan.icon} variant={plan.buttonVariant} />

        {/* === Заголовок и подзаголовок === */}
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
            color: "#374151",
          }}
        >
          {plan.title}
        </h3>
        <p
          style={{
            color: "#6B7280",
            marginBottom: "1rem",
            fontSize: "0.875rem",
          }}
        >
          {plan.subtitle}
        </p>

        {/* === Цена === */}
        <div
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: plan.buttonVariant === "elite" ? "#16A34A" : "#2D5B4C",
          }}
        >
          ${plan.price.toLocaleString()}
          <span
            style={{ fontSize: "1rem", color: "#6B7280", fontWeight: "normal" }}
          >
            / {plan.billingCycle}
          </span>
        </div>
      </div>

      {/* === Content Section === */}
      <div
        style={{
          padding: "0 1.5rem 1.5rem",
          flex: "1",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* === Features List === */}
        <PricingFeatures
          features={plan.features}
          variant={plan.buttonVariant}
        />

        {/* === Button Section === */}
        <div>
          <PricingButton
            label={plan.buttonLabel}
            variant={plan.buttonVariant}
            href={buttonHref}
          />
        </div>
      </div>
    </div>
  );
}
